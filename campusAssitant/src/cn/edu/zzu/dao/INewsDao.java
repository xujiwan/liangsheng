/**
 * File Created at 2016年1月21日
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;

/**
 * 新闻、公告dao
 * @author jiwan.xu
 */
public interface INewsDao extends IBaseDao {
	
	/**
	 * 根据类型拉取新闻，公告
	 * @param map {TYPE:0：新闻，1：公告}
	 * @return {@link List}
	 */
	List<Map<String, Object>> getNews(Map<String, Object> map);

}
