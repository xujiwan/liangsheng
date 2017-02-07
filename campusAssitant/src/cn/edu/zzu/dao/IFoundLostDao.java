/**
 * 
 */
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;


/**
 * 失物招领
 * @author jiwan.xu
 *
 */
public interface IFoundLostDao extends IBaseDao{

	List<Map<String, Object>> getFoundLosts(Map<String, Object> newMap);

}
