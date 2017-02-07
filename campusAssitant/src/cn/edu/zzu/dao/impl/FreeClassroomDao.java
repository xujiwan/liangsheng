
package cn.edu.zzu.dao.impl;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.IFreeClassroomDao;

/**
 * @author jiwan.xu
 *
 */
public class FreeClassroomDao extends BaseDao implements IFreeClassroomDao{

	@Override
	public List<Map<String, Object>> getFreeClassroom(Map<String,Object>map) {
		return  getSqlSession().getMapper(IFreeClassroomDao.class).getFreeClassroom(map);
	}

}
