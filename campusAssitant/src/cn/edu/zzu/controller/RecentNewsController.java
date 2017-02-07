package cn.edu.zzu.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.PageResult;
import cn.edu.zzu.entity.Page;
import cn.edu.zzu.service.IRecentNewsService;
import cn.edu.zzu.util.ConvertUtils;

import com.google.common.collect.Maps;

/**
 * 最新动态控制器
 * url:/kw/mediaInfo/getRecentNewList.json
 * @author jiwan.xu
 *
 */
@RestController
@RequestMapping("kw/mediaInfo")
public class RecentNewsController extends BaseController{

	@Resource private IRecentNewsService recentNewsService;
	@RequestMapping(value="getRecentNewList",method=RequestMethod.POST)
	public Map<String, Object> getRecentsNews(HttpServletRequest request){
		Map<String, Object> rtnMap = new HashMap<String, Object>();
		try {
			//处理相关参数
			Map<String, Object> pageParams = initParams(request);
			// 获取列表
			Page page = new Page(pageParams);
			Map<String,Object> newMap = new HashMap<String, Object>();
			//查询总数
			newMap.put("selectCount", true);
			//放置所有参数
			newMap.putAll(pageParams);
			//放置转化为map的分页参数
			newMap.putAll(ConvertUtils.PO2Map(page));
			//查询被过滤的数量
			List<Map<String, Object>> totalListFiltered =  recentNewsService.getRecentNews(newMap);
			newMap.remove("selectCount");
			newMap.put("page", true);
			//查询被过滤的数据
			List<Map<String,Object>> pageList = recentNewsService.getRecentNews(newMap);
			//初始化分页返回数据
			PageResult pageResult  = new PageResult(pageParams,pageList,totalListFiltered,null);
			
			rtnMap.put("data", pageResult.getData());
			rtnMap.put("recordsFiltered", pageResult.getRecordsFiltered());
			rtnMap.put("error", pageResult.getError());
		} catch (Exception e) {
			rtnMap.put("error", e.getMessage());
		}
		return rtnMap;
	}
	
	/**
	 * 最新动态控制器
	 * url:/kw/mediaInfo/getRecentNewsDetail.json
	 *
	 */
	@RequestMapping(value="getRecentNewsDetail",method=RequestMethod.GET)
	public Map<String, Object> getRecentNewsDetail(HttpServletRequest request,Map<String,Object>map) throws UnsupportedEncodingException {
		String new_id = request.getParameter("NEW_ID");
		map.put("NEW_ID",new_id);
		Map<String, Object> detail = recentNewsService.getRecentNewsIssue(map);
		byte[] content = null;
		if (detail != null && (content =  (byte[]) detail.get("CONTENT")) != null) {
			Map<String, Object> prev = null;
			Map<String, Object> next = null;
			if(null != detail.get("PREV")){
				map.put("NEW_ID", detail.get("PREV"));
				prev = recentNewsService. getRecentNewsPrevDetail(map);
			}
			if(null != detail.get("NEXT")){
				map.put("NEW_ID", detail.get("NEXT"));
				next = recentNewsService. getRecentNewsNextDetail(map);
			}
			if (prev != null) {
				detail.put("PREV_NEW_ID", prev.get("NEW_ID"));
				detail.put("PREV_ISSUE", prev.get("ISSUE"));
				detail.put("PREV_TIME", prev.get("TIME"));
			}
			if (next != null) {
				detail.put("NEXT_NEW_ID", next.get("NEW_ID"));
				detail.put("NEXT_ISSUE", next.get("ISSUE"));
				detail.put("NEXT_TIME", next.get("TIME"));
			}
			try {
				detail.put("CONTENT", StringEscapeUtils.unescapeHtml4(new String(content, "UTF-8")));
			} catch (UnsupportedEncodingException e) {
			}
			return detail;
		}
		return detail;
	}
}