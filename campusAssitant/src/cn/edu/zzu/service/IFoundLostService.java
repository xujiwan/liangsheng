/**
 * 
 */
package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;

/**
 * 失物招领接口
 * @author jiwan.xu
 *
 */
public interface IFoundLostService extends IBaseService{

	List<Map<String, Object>> getFoundLosts(Map<String, Object> newMap);

}
