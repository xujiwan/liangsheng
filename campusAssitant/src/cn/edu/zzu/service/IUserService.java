/**
 * File Created at 2015年3月11日
 *
 * Copyright 2014-2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.service;

import java.util.Map;

/**
 * 认证逻辑处理接口
 * @author qunxing.du
 *
 */
public interface IUserService extends IBaseService {

	/**
	 * 根据tel查询用户信息
	 * @param map {TEL}
	 * @return {@link Map}
	 * @throws Exception
	 */
	 Map<String, Object> getUserByMap(Map<String, Object> map);
	 
	 /**
	  * 修改用户的密码错误信息
	  * @param map {PWD_ERR_NUM,UNLOCK_TIME,TEL}
	  */
	 void updateUserPwdErrByMap(Map<String, Object> map);
	 
	 /**
	  * 修改用户的登录时间
	  * @param map {TEL,LOGIN_TIME}
	  */
	 void updateUserLoginTimeByMap(Map<String, Object> map);
	 /**
	  * 拉取推荐人id
	  * @param recommendMap {RECOMMEND_TYPE,RECOMMEND_CODE}
	  * @return
	  */
	String getRecommendId(Map<String, Object> map);
	/**
	 * 添加用户
	 * @param userMap
	 */
	void insertUser(Map<String, Object> map);
	/**
	 * 判断是否注册过
	 * @param checkMap
	 * @return
	 */
	boolean checkIsRegister(Map<String, Object> map);
	/**
	 * 初始化用户信息表
	 * @param userId
	 */
	void insertUserMessage(String userId);
	/**
	 * 初始化用户资产
	 * @param userId
	 */
	void insertUserAssets(String userId);
}
