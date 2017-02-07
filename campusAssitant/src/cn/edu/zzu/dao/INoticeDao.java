/**
 * 
 */
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;

/**
 * 公告dao接口
 * @author jiwan.xu
 *
 */
public interface INoticeDao extends IBaseDao{


	List<Map<String, Object>> getNotices(Map<String,Object>map);

}