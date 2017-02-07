/**
 * File Created at 2016年1月18日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.dao;

import java.util.List;
import java.util.Map;

/**
 * @author qunxing.du
 *
 */
public interface IPageDao extends IBaseDao{
	
	List<Map<String, Object>> retrieveByPage(Map<String, Object> map) throws Exception;
}
