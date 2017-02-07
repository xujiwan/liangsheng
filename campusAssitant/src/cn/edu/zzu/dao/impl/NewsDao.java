/**
 * File Created at 2016年1月21日
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.INewsDao;

/**
 * 拉取新闻，公告dao实现类
 * @author qunxing.du
 */
public class NewsDao extends BaseDao implements INewsDao {

	private INewsDao getInstance(){
		return getSqlSession().getMapper(INewsDao.class);
	}
	@Override
	public List<Map<String, Object>> getNews(Map<String, Object> map) {
		return getInstance().getNews(map);
	}
}
