/**
 * File Created at 2015/12/4 0004
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import cn.edu.zzu.base.BaseLog;

/**
 * <pre>
 * session工具类
 * 存储用户信息到会话中，并提供获取用户信息的方法
 * </pre>
 *
 * @author jiwan.xu
 */
public class SessionUtil extends BaseLog {

	public static HttpServletRequest getRequest() {
		ServletRequestAttributes sras = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		return sras.getRequest();
	}

	public static HttpSession getSession(boolean allowCreate) {
		return getRequest().getSession(allowCreate);
	}

	public static HttpSession getSession() {
		return getSession(true);
	}

	public static void set(String key, Object o) {
		getSession().setAttribute(key, o);
	}

	public static Object get(String key) {
		return getSession().getAttribute(key);
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> getCurUser() {
		Object o = get(SessionConstants.USER_TAG);
		try {
			if (o != null) {
				return (Map<String, Object>) o;
			}
		} catch (Exception e) {
			serror(e.getMessage());
		}
		return new HashMap<>();
	}
	/**
	 * 存储用户信息到会话中
	 * @param user
	 */
	public static void setCurUser(Map<String, Object> user) {
		/*String userNickName = (String) user.get("NC");*/
		String userTel = (String) user.get("TEL");
		Map<String, Object> sessionMap = new HashMap<String, Object>();
		sessionMap.put(SessionConstants.USER_ID, user.get("ID"));
		sessionMap.put(SessionConstants.USER_TEL, userTel);
		//sessionMap.put(SessionConstants.USER_NICKNAME, (StringUtils.isBlank(userNickName)) ? userTel : userNickName);
		//sessionMap.put(SessionConstants.USER_EMAIL, user.get("MAIL"));
		sessionMap.put(SessionConstants.USER_LOGIN_TIME, user.get("LOGIN_TIME"));
		//sessionMap.put(SessionConstants.USER_RECOMMEND_CODE, user.get("RECOMMEND_CODE"));
		set(SessionConstants.USER_TAG, sessionMap);
	}

	/**
	 * 获取用户id
	 * return {@link String}
	 */
	public static String getUserId() {
		return (String) getCurUser().get(SessionConstants.USER_ID);
	}

	/**
	 * 获取用户注册汇付id
	 * 
	 * @return {@link String}
	 */
	public static String getUserHFId() {
		return (String) getCurUser().get(SessionConstants.USER_HF_ID);
	}

	/**
	 * 获取用户昵称
	 * 
	 * @return {@link String}
	 */
	public static String getUserNick() {
		return (String) getCurUser().get(SessionConstants.USER_NICKNAME);
	}

	/**
	 * 获取用户邮箱
	 * 
	 * @return
	 */
	public static String getUserEmail() {
		return (String) getCurUser().get(SessionConstants.USER_EMAIL);
	}

	/**
	 * 获取手机号
	 * @return
	 */
	public static String getUserTel(){
		return (String)getCurUser().get(SessionConstants.USER_TEL);
	}
	
	/**
	 * 获取登陆时间
	 * @return
	 */
	public static String getUserLoginTime(){
		return (String) getCurUser().get(SessionConstants.USER_LOGIN_TIME);
	}
	
	/**
	 * 获取推荐码
	 * @return
	 */
	public static String getUserRecommendCode(){
		return (String) getCurUser().get(SessionConstants.USER_RECOMMEND_CODE);
	}

	/**
	 * 修改session中用户信息
	 * @param key 用户key
	 * @param value 值
	 */
	public static void updateCurUser(String key,String value){
		Map<String,Object> map = getCurUser();
		map.put(key, value);
		set(SessionConstants.USER_TAG, map);
	}


	/**
	 * 修改手机
	 * @param userTel
	 */
	public static void setUserTel(String userTel){
		updateCurUser(SessionConstants.USER_TEL, userTel);
	}

	/**
	 * 修改昵称
	 * @param userNick
	 */
	public static void setUserNick(String userNick){
		updateCurUser(SessionConstants.USER_NICKNAME, userNick);
	}

	/**
	 * 修改邮箱
	 * @param userEmail
	 */
	public static void setUserEmail(String userEmail){
		updateCurUser(SessionConstants.USER_EMAIL, userEmail);
	}

	/**
	 * 修改登陆时间
	 * @param userLoginTime
	 */
	public static void setUserLoginTime(String userLoginTime){
		updateCurUser(SessionConstants.USER_LOGIN_TIME,userLoginTime);
	}
	/**
	 * 修改用户推荐码
	 * @param userRecommendCode
	 */
	public static void setUserRecommendCode(String userRecommendCode){
		updateCurUser(SessionConstants.USER_RECOMMEND_CODE,userRecommendCode);
	}
	/**
	 * 判断是否登陆
	 * @return
	 */
	public static boolean isLogin(){
		return StringUtils.isNotBlank(getUserId());
	}
}
