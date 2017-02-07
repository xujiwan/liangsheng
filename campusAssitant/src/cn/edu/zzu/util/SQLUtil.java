package cn.edu.zzu.util;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 分页插件-sql解析器
 * @author qunxing.du
 */
public final class SQLUtil {

	
	/**
	 * getOraclePagerSQL(拼接Oracle的分页语句)
	 * Author: qunxing.du
	 * @param   name
	 * @param  @return    设定文件
	 * @return String    DOM对象
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	*/
	public static String getOraclePageSQL(String sql, int startRowNum, int endRowNum) {
		//解决没有数据时，用rownum <= endRowNum查询缓慢问题
//		return "select * from (select tmp.*, rownum rn  from ("
//					+ sql  
//					+") tmp where rownum <= "+endRowNum+") re where rn >= " + startRowNum;
		return "select * from (select tmp.*, rownum rn  from ("
		+ sql  
		+") tmp) re where rn >= " + startRowNum + "and rn <= " +endRowNum;
	}
	
	/**
	 * getOrderBySQL(获取排序语句)
	 * Author: qunxing.du
	 * @param   name
	 * @param  @return    设定文件
	 * @return String    DOM对象
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	*/
	public static String getOrderBySQL(String sql, String sidx, String sord) {
		if (sidx != null && !sidx.isEmpty()) {
			sord = sord == null ? "" : sord;
			Pattern ptn = Pattern.compile("order\\s+by", Pattern.CASE_INSENSITIVE);
			Matcher m = ptn.matcher(sql);
			if (m.find()) {
				sql = sql.substring(0, m.end()) + " " + sidx + " " + sord + "," + sql.substring(m.end());
			} else {
				sql = sql + " ORDER BY " + sidx + " " + sord;
			}
		}
		return sql;
	}
	
	/**
	 * getSelectCountSQL(查询条数)
	 * Author: quxing.du
	 * @param   name
	 * @param  @return    设定文件
	 * @return String    DOM对象
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	*/
	public static String getSelectCountSQL(String sql) {
		Pattern ptn = Pattern.compile("order\\s+by", Pattern.CASE_INSENSITIVE);
		Matcher m = ptn.matcher(sql);
		if (m.find()) {
			sql = sql.substring(0, m.start());
		}
		return "select count(*) COUNT from (" + sql + ") temp ";
	}

	/**
	 * 这里是函数说明
	 * @param sql
	 * @param startRowNum
	 * @param endRowNum
	 * @return          
	 * @author qunxing.du
	 * @create_time 2014-7-8 上午11:40:12
	 */
		
	public static String getMysqlPagerSQL(String sql, int startRowNum,
			int endRowNum) {
		int count = endRowNum - startRowNum + 1;
		return "select * from ("+sql+") temp limit "+(startRowNum-1)+","+count;
	}

	/**
	 * 这里是函数说明
	 * @param sql
	 * @param startRowNum
	 * @param endRowNum
	 * @return          
	 * @author qunxing.du
	 * @create_time 2014-7-8 下午1:40:28
	 */
		
	public static String getSqlserverPageSQL(String sql, int startRowNum,
			int endRowNum) {
		
		String sql_order = "";
		String sql_front = "";
		String sqlStr = "";
		
		Pattern ptn = Pattern.compile("order\\s+by", Pattern.CASE_INSENSITIVE);
		Matcher m = ptn.matcher(sql);
		if (m.find()){
			sql_front = sql.substring(0, m.start());
			sql_order = sql.substring(m.start()).toLowerCase();
			Pattern ptn_sub = Pattern.compile("\\w{1,}\\.{1}\\w{1,}");
			Matcher m_sub = ptn_sub.matcher(sql_order);
			if(m_sub.find()){
				sql_order = sql_order.replace(sql_order.substring(sql_order.indexOf("by")+2, sql_order.indexOf(".")+1), " ");
			}
			sqlStr =  "select  temp2.* from("+
					"select top "+endRowNum+" ROW_NUMBER() over ("+sql_order+") rowno ,temp1.* from ("+sql_front+") temp1) temp2 where temp2.rowno >= "+startRowNum;
		}else{
			String primaryKey = "";
			Pattern ptn_sub = Pattern.compile("\\s*select",Pattern.CASE_INSENSITIVE);
			Matcher m_sub = ptn_sub.matcher(sql);
			if(m_sub.find()){
				primaryKey = sql.substring(m_sub.end(),sql.indexOf(","));
			}
			sqlStr =  "select  temp2.* from("+
					"select top "+endRowNum+" ROW_NUMBER() over (order by temp1."+primaryKey+") rowno ,temp1.* from ("+sql+") temp1) temp2 where temp2.rowno >= "+startRowNum;
		}
		
		return sqlStr;
		
	}
	/**
	 * 
	 * 拼接多个排序字段
	 * @param sql
	 * @param list
	 * @return {@link String}         
	 * @author 杜群星
	 * @create_time 2014年11月25日上午9:43:38
	 */
	public static String getOrderBySQL(String sql, List<Map<String, String>> list) {
		
		for (Map<String, String> map : list) {
			String orderColumm = map.get("orderColumm");
			String orderType = map.get("orderType");
			sql = getOrderBySQL(sql, orderColumm, orderType);
		}
		return sql;
	}

}
