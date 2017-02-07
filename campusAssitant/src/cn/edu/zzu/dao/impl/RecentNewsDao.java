package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.IRecentNewsDao;

/**
 * 最新动态dao实现类
 * @author jiwan.xu
 *
 */
public class RecentNewsDao extends BaseDao implements IRecentNewsDao{

	@Override
	public List<Map<String, Object>> getRecentNews(Map<String, Object> map) {
		return getSqlSession().getMapper(IRecentNewsDao.class).getRecentNews(map);
	}

	@Override
	public Map<String, Object> getRecentNewsPrevDetail(Map<String, Object> map) {
		return getSqlSession().getMapper(IRecentNewsDao.class).getRecentNewsPrevDetail(map);
	}
	
	@Override
	public Map<String, Object> getRecentNewsNextDetail(Map<String, Object> map) {
		return getSqlSession().getMapper(IRecentNewsDao.class).getRecentNewsNextDetail(map);
	}

	@Override
	public Map<String, Object> getRecentNewsIssue(Map<String, Object> map) {
		return getSqlSession().getMapper(IRecentNewsDao.class).getRecentNewsIssue(map);
	}

}
