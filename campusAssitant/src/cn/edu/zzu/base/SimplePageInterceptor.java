/**
 * File Created at 2016年1月18日
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.MappedStatement.Builder;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.defaults.DefaultSqlSession;
import org.apache.log4j.Logger;

import cn.edu.zzu.util.SQLUtil;

import com.google.gson.annotations.Since;

/**
 * mybatis-simple分页拦截器
 * 
 * @author qunxing.du
 */
@Intercepts({@Signature(type = Executor.class, method = "query", args = {
		MappedStatement.class,
		Object.class,
		RowBounds.class,
		ResultHandler.class})
})
public class SimplePageInterceptor implements Interceptor {

	private static Logger log = Logger.getLogger(SimplePageInterceptor.class);
	private String dialect;

	@Override
	public Object intercept(Invocation invocation) throws Throwable {

		Object[] args = invocation.getArgs();
		MappedStatement mappedStatement = (MappedStatement) args[0];
		Object params = args[1];
		BoundSql boundSql = mappedStatement.getBoundSql(params);
		// 原sql
		String sql = boundSql.getSql();
		// 参数
		Object paramObj = boundSql.getParameterObject();

		if (! (paramObj instanceof DefaultSqlSession.StrictMap) && paramObj instanceof Map) {
			Map<String, Object> paramMap = (Map<String, Object>) paramObj;
			// 查询条数
			if (paramMap.get("selectCount") != null && (Boolean) (paramMap.get("selectCount"))) {
				sql = SQLUtil.getSelectCountSQL(sql);
			}
			// 判断分页
			else if (paramMap.get("page") != null && (Boolean) paramMap.get("page")) {
				// 处理排序
				// sql = SQLUtil.getOrderBySQL(sql,
				// (String)paramMap.get("orderColumm"),(String)paramMap.get("orderType"));
				sql = SQLUtil.getOrderBySQL(sql, (List<Map<String, String>>) paramMap.get("orders"));
				if ("mysql".equals(dialect)) {
					// mysql 分页语句
					sql = SQLUtil.getMysqlPagerSQL(sql, (Integer) paramMap.get("start"), (Integer) paramMap.get("end"));
				} else if ("oracle".equals(dialect)) {
					// Oracle 分页语句
					sql = SQLUtil.getOraclePageSQL(sql, (Integer) paramMap.get("start"), (Integer) paramMap.get("end"));
				} else if ("sqlserver".equals(dialect)) {
					sql = SQLUtil.getSqlserverPageSQL(sql, (Integer) paramMap.get("start"),
							(Integer) paramMap.get("end"));
				}
			}

			BoundSql newBoundSql = createBoundSql(mappedStatement, boundSql, sql);
			Builder builder = createBuilder(mappedStatement, newBoundSql);
			MappedStatement newMappedStatement = builder.build();
			args[0] = newMappedStatement;
		}
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties properties) {
		this.dialect = StringUtils.defaultString((String) properties.get("dialect"), "mysql");
		log.debug("数据库类型：" + this.dialect);
	}

	private BoundSql createBoundSql(MappedStatement mappedStatement, BoundSql boundSql, String sql) {
		return new BoundSql(mappedStatement.getConfiguration(), sql, boundSql.getParameterMappings(),
				boundSql.getParameterObject());
	}

	private Builder createBuilder(MappedStatement mappedStatement, final BoundSql boundSql) {
		Builder builder = new Builder(mappedStatement.getConfiguration(), mappedStatement.getId(), new SqlSource() {
			public BoundSql getBoundSql(Object parameterObject) {
				return boundSql;
			}
		}, mappedStatement.getSqlCommandType()).cache(mappedStatement.getCache())
				.useCache(mappedStatement.isUseCache()).fetchSize(mappedStatement.getFetchSize())
				.flushCacheRequired(mappedStatement.isFlushCacheRequired())
				.keyGenerator(mappedStatement.getKeyGenerator()).parameterMap(mappedStatement.getParameterMap())
				.timeout(mappedStatement.getTimeout()).resource(mappedStatement.getResource())
				.resultMaps(mappedStatement.getResultMaps()).resultSetType(mappedStatement.getResultSetType())
				.statementType(mappedStatement.getStatementType());

		if (mappedStatement.getKeyProperties() != null) {
			for (String keyProperty : mappedStatement.getKeyProperties()) {
				builder.keyProperty(keyProperty);
			}
		}
		return builder;
	}
}
