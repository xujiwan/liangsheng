/**
 * 
 */
package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;

import cn.edu.zzu.dao.IBaseDao;

/**
 * @author jiwan.xu
 *
 */
public interface IFreeClassroomService extends IBaseService{

	List<Map<String, Object>> freeClassroom(Map<String, Object> newMap);

}
