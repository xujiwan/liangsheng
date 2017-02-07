package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.INoticeDao;

/**
 * 公告dao实现类
 * @author jiwan.xu
 *
 */
public class NoticeDao extends BaseDao implements INoticeDao{

	@Override
	public List<Map<String, Object>> getNotices(Map<String,Object>map) {
		return getSqlSession().getMapper(INoticeDao.class).getNotices(map);
	}

}
