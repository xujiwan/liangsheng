/**
 * File Created at 2016年1月18日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.IPageDao;

/**
 * @author qunxing.du
 *
 */
public class PageDao extends BaseDao implements IPageDao {
	
	public List<Map<String, Object>> retrieveByPage(Map<String, Object> map) throws Exception {
		return getSqlSession().getMapper(IPageDao.class).retrieveByPage(map);
	}
}
