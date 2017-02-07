/**
 * File Created at 2016年1月21日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.INewsDao;
import cn.edu.zzu.service.INewsService;

/**
 * 新闻、公告service实现类
 * @author jiwan.xu
 *
 */
@Service
public class NewsService extends BaseService implements INewsService {

	@Resource
	private INewsDao newsDao;
	public List<Map<String, Object>> getNews(Map<String, Object> map) {
		return newsDao.getNews(map);
	}

}
