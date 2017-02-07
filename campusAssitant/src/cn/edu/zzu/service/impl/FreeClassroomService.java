/**
 * 
 */
package cn.edu.zzu.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.IFreeClassroomDao;
import cn.edu.zzu.service.IFreeClassroomService;

/**
 * @author jiwan.xu
 *
 */
@Service
public class FreeClassroomService implements IFreeClassroomService{
	
	@Resource
	private IFreeClassroomDao freeClassroomDao;
	@Override
	public List<Map<String, Object>> freeClassroom(Map<String, Object> newMap) {
		List <Map<String,Object>> getFreeClassroomList = freeClassroomDao.getFreeClassroom(newMap);
		return getFreeClassroomList;
}

}
