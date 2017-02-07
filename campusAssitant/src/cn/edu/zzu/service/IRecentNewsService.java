package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;


/**
 * 最新动态service接口
 *
 */
public interface IRecentNewsService extends IBaseService{

	List<Map<String, Object>> getRecentNews(Map<String, Object> newMap);

	Map<String, Object> getRecentNewsPrevDetail(Map<String, Object> map);
	Map<String, Object> getRecentNewsNextDetail(Map<String, Object> map);
	Map<String, Object> getRecentNewsIssue(Map<String, Object> map);

}
