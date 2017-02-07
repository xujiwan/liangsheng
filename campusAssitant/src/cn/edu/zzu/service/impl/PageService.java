/**
 * File Created at 2016年1月18日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service.impl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.IPageDao;
import cn.edu.zzu.service.IPageService;

/**
 * @author qunxing.du
 *
 */
@Service
public class PageService extends BaseService implements IPageService{
	
	
    public List<Map<String, Object>> retrieveByPage(Map<String,Object> map) throws Exception {
		// 获取dao
		String daoClassName = "I" + getClass().getSimpleName().replace("Service", "") + "Dao";
		debug("获取分页dao："+daoClassName);
		Object dao = null;
		for (Field f : getClass().getDeclaredFields()) {
			if (f.getType().getSimpleName().equals(daoClassName)) {
				f.setAccessible(true);
				dao = f.get(this);
				f.setAccessible(false);
				break;
			}
		}
		if (dao == null) return new ArrayList<Map<String, Object>>();
		
		// 执行查询
		return ((IPageDao) dao).retrieveByPage(map);
		
	}
}
