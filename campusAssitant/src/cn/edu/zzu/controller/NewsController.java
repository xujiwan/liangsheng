/**
 * File Created at 2016年1月21日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.PageResult;
import cn.edu.zzu.entity.Page;
import cn.edu.zzu.service.INewsService;
import cn.edu.zzu.util.ConvertUtils;

/**
 * 新闻，公告控制器
 * @author jiwan.xu
 *
 */
@RestController
@RequestMapping(path="/n/news")
public class NewsController extends BaseController {

	@Resource
	private INewsService newsService;
	
	/**
	 * 根据类型和容量查询新闻或公告
	 * @url /i/n/news/getNews.json
	 * @method get
	 * @param {TYPE:类型（0:新闻，1:公示,2失物招领）,SIZE：容量}
	 * @return {@link List}
	 */
	@RequestMapping(value="getNews",method=RequestMethod.GET)
	public List<Map<String, Object>> getNews(HttpServletRequest request){
		Map<String,Object> newMap = new HashMap<String, Object>();
		String type = request.getParameter("TYPE");
		String size = request.getParameter("SIZE");
		newMap.put("TYPE", type);
		newMap.put("SIZE", size);
		List<Map<String, Object>> newList = newsService.getNews(newMap);
		for (Map<String, Object> news : newList) {
			String issue = (String)news.get("ISSUE");
			if(StringUtils.isNotBlank(issue)){
				issue = StringEscapeUtils.unescapeHtml4(issue);
			}
			newMap.put("ISSUE", issue);
		}
		return newList;
	}
	@RequestMapping(value="getPlatform",method=RequestMethod.GET)
	public List<Map<String, Object>> getPlatform(HttpServletRequest request){
		Map<String,Object> newMap = new HashMap<String, Object>();
		String type = request.getParameter("TYPE");
		String size = request.getParameter("SIZE");
		newMap.put("TYPE", type);
		newMap.put("SIZE", size);
		List<Map<String, Object>> newList = newsService.getNews(newMap);
		for (Map<String, Object> news : newList) {
			String issue = (String)news.get("ISSUE");
			if(StringUtils.isNotBlank(issue)){
				issue = StringEscapeUtils.unescapeHtml4(issue);
			}
			newMap.put("ISSUE", issue);
		}
		return newList;
	}
	@RequestMapping(value="getLostfound",method=RequestMethod.GET)
	public List<Map<String, Object>> getLostfound(HttpServletRequest request){
		Map<String,Object> newMap = new HashMap<String, Object>();
		String type = request.getParameter("TYPE");
		String size = request.getParameter("SIZE");
		newMap.put("TYPE", type);
		newMap.put("SIZE", size);
		List<Map<String, Object>> newList = newsService.getNews(newMap);
		for (Map<String, Object> news : newList) {
			String issue = (String)news.get("ISSUE");
			if(StringUtils.isNotBlank(issue)){
				issue = StringEscapeUtils.unescapeHtml4(issue);
			}
			newMap.put("ISSUE", issue);
		}
		return newList;
	}
}
