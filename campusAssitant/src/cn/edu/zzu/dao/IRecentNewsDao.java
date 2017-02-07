/**
 * 
 */
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;


/**
 * 最新动态dao接口
 * @author jiwan.xu
 *
 */
public interface IRecentNewsDao extends IBaseDao{


	List<Map<String, Object>> getRecentNews(Map<String, Object> map);
	Map <String,Object> getRecentNewsNextDetail (Map<String,Object>map);
	Map<String, Object> getRecentNewsIssue(Map<String, Object> map);
	Map<String, Object> getRecentNewsPrevDetail(Map<String, Object> map);
}
