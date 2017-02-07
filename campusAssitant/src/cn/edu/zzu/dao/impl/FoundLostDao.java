/**
 * 
 */
package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.IFoundLostDao;

/**
 * 失物招领
 * @author jiwan.xu
 *
 */
public class FoundLostDao extends BaseDao implements IFoundLostDao{

	@Override
	public List<Map<String, Object>> getFoundLosts(Map<String, Object> newMap) {
		return getSqlSession().getMapper(IFoundLostDao.class).getFoundLosts(newMap);
	}

}
