package cn.edu.zzu.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.time.FastDateFormat;
import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.IRecentNewsDao;
import cn.edu.zzu.service.IRecentNewsService;

/**
 * 最新动态service实现类
 * @author jiwan.xu
 *
 */
@Service
public class RecentNewsService  extends BaseService implements IRecentNewsService{
	@Resource
	private IRecentNewsDao recentNewsDao;
	FastDateFormat dateFormat = FastDateFormat.getInstance("yyyy-MM-dd");
	@Override
	public List<Map<String, Object>> getRecentNews(Map<String, Object> map) {
		List <Map<String,Object>> getRecentNewsList = recentNewsDao.getRecentNews(map);
		if(CollectionUtils.isNotEmpty(getRecentNewsList)){
			if (getRecentNewsList.get(0).get("COUNT") == null) {
			for (Map<String, Object> m : getRecentNewsList) {
				Date time = (Date)m.get("TIME");
				String date = dateFormat.format(time);
				String year = date.substring(0,4).trim();
				String monthAndDate	= date.substring(5,date.length()).trim();
				m.put("YEAR",year);
				m.put("DATE",monthAndDate);
			}
			}
		}
		return getRecentNewsList;
	}
	public Map<String, Object> getRecentNewsPrevDetail(Map<String, Object> map) {
		Map<String,Object> detailMap = recentNewsDao.getRecentNewsPrevDetail(map);
		if(detailMap!=null){
			Date time = (Date)detailMap.get("TIME");
			detailMap.put("TIME",dateFormat.format(time));
		}
		return detailMap;
	}
	public Map<String, Object> getRecentNewsNextDetail(Map<String, Object> map) {
		Map<String,Object> detailMap = recentNewsDao.getRecentNewsNextDetail(map);
		if(detailMap!=null){
			Date time = (Date)detailMap.get("TIME");
			detailMap.put("TIME",dateFormat.format(time));
		}
		return detailMap;
	}
	@Override
	public Map<String, Object> getRecentNewsIssue(Map<String, Object> map) {
		Map<String,Object> NewsIssueMap = recentNewsDao.getRecentNewsIssue(map);
		if(NewsIssueMap!=null){
				Date time = (Date)NewsIssueMap .get("TIME");
				NewsIssueMap.put("TIME",dateFormat.format(time));
			}
		return NewsIssueMap;
	}
}