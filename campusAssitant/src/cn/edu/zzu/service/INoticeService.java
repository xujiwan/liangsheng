/**
 * 
 */
package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;

/**
 * 公告service接口
 * @author jiwan.xu
 *
 */
public interface INoticeService extends IBaseService{

	List<Map<String, Object>> getNotices(Map<String, Object> map);

}
