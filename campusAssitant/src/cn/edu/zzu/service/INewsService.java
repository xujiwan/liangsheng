/**
 * File Created at 2016年1月21日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;

/**
 * 新闻、公告service接口
 * @author qunxing.du
 *
 */
public interface INewsService extends IBaseService{
	/**
	 * 根据类型拉取新闻，公告
	 * @param map {TYPE:0：新闻，1：公告}
	 * @return {@link List}
	 */
	List<Map<String, Object>> getNews(Map<String, Object> map);

}
