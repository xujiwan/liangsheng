
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;

/**
 * @author jiwan.xu
 *
 */
public interface IFreeClassroomDao extends IBaseDao {

	List<Map<String, Object>> getFreeClassroom(Map<String, Object> newMap);

}
