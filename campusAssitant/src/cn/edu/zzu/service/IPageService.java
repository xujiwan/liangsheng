/**
 * File Created at 2016年1月18日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service;

import java.util.List;
import java.util.Map;

/**
 * @author qunxing.du
 *
 */
public interface IPageService extends IBaseService{
	/**
	 * 查询分页
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> retrieveByPage(Map<String, Object> map) throws Exception;
}
