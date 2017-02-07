/**
 * 
 */
package cn.edu.zzu.service;

import java.util.Map;

import cn.edu.zzu.result.MsgResult;

/**
 * @author jiwan.xu
 *
 */
public interface IRegisterService extends IBaseService{

	void register(Map<String, Object> map);


}
