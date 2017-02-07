/**
 * File Created at 2015年3月11日
 *
 * Copyright 2014-2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.IUserDao;
import cn.edu.zzu.entity.User;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.service.IUserService;

/**
 * 认证逻辑处理实现类
 * @author qunxing.du
 *
 */
@Service
public class UserService extends BaseService implements
		IUserService {

	@Autowired
	private IUserDao userDao;

	@Override
	public Map<String, Object> getUserByMap(Map<String, Object> map){
		return userDao.getUserByMap(map);
	}

	@Override
	public void updateUserPwdErrByMap(Map<String, Object> map) {
		userDao.updateUserPwdErrByMap(map);
	}

	@Override
	public void updateUserLoginTimeByMap(Map<String, Object> map) {
		userDao.updateUserLoginTimeByMap(map);
	}

	@Override
	public String getRecommendId(Map<String, Object> map) {
		return userDao.getRecommendId(map);
	}

	@Override
	public void insertUser(Map<String, Object> map) {
		userDao.insertUser(map);
	}

	@Override
	public boolean checkIsRegister(Map<String, Object> map) {
		int i = userDao.checkIsRegister(map);
		return i > 0 ? true : false;
	}

	@Override
	public void insertUserMessage(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ID", userId);
		userDao.insertUserMessage(map);
	}

	@Override
	public void insertUserAssets(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ID", userId);
		userDao.insertUserAssets(map);
	}

	public MsgResult regist(User user) {
		// TODO Auto-generated method stub
		return null;
	}

}
