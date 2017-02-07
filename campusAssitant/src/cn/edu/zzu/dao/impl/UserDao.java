/**
 * File Created at 2015年3月11日
 *
 * Copyright 2014-2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.dao.impl;

import java.util.Map;

import cn.edu.zzu.dao.IUserDao;

/**
 * 认证数据处理实现类
 * @author qunxing.du
 *
 */
public class UserDao extends BaseDao implements IUserDao {
	
	private IUserDao getInstance(){
		return getSqlSession().getMapper(IUserDao.class);
	}
	@Override
	public Map<String, Object> getUserByMap(Map<String, Object> map) {
		return getInstance().getUserByMap(map);
	}

	@Override
	public void updateUserPwdErrByMap(Map<String, Object> map) {
		getInstance().updateUserPwdErrByMap(map);
	}
	
	@Override
	public void updateUserLoginTimeByMap(Map<String, Object> map) {
		getInstance().updateUserLoginTimeByMap(map);
	}
	@Override
	public String getRecommendId(Map<String, Object> map) {
		return getInstance().getRecommendId(map);
	}
	@Override
	public void insertUser(Map<String, Object> map) {
		getInstance().insertUser(map);
	}
	@Override
	public int checkIsRegister(Map<String, Object> map) {
		return getInstance().checkIsRegister(map);
	}
	@Override
	public void insertUserMessage(Map<String, Object> map) {
		getInstance().insertUserMessage(map);
	}
	@Override
	public void insertUserAssets(Map<String, Object> map) {
		getInstance().insertUserAssets(map);
	}
}
