/**
 * File Created at 2015/12/4 0004
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import cn.edu.zzu.resource.Constants;

/**
 * <pre>
 *  session常量类
 *  可修改字段：SESSION_PREFIX
 * </pre>
 *
 * @author qunxing.du
 */
public class SessionConstants extends Constants {
	public static String SESSION_PREFIX = "ZZU_";// 可修改
	
	private static final String SESSION_USER = "USER";
	
	private static String USER_PREFIX;
	
	public static String USER_TAG;
	public static String USER_ID;
	public static String USER_HF_ID;
	public static String USER_NAME;
	public static String USER_NICKNAME;
	public static String USER_TEL;
	public static String USER_EMAIL;
	public static String USER_WECHAT;
	public static String USER_LOGIN_TIME;
	public static String USER_RECOMMEND_CODE;

	protected void init() {
		USER_PREFIX = SESSION_PREFIX + "USER_";
		USER_TAG = SESSION_PREFIX + SESSION_USER;
		USER_ID = USER_PREFIX + "ID";
		USER_HF_ID = USER_PREFIX + "HF_ID";
		USER_NAME = USER_PREFIX + "USER_NAME";
		USER_NICKNAME = USER_PREFIX + "USER_NICKNAME";
		USER_TEL = USER_PREFIX + "TEL";
		USER_EMAIL = USER_PREFIX + "EMAIL";
		USER_WECHAT = USER_PREFIX + "WECHAT";
		USER_LOGIN_TIME = USER_PREFIX + "LOGIN_TIME";
		USER_RECOMMEND_CODE = USER_PREFIX + "RECOMMEND_CODE";
	}

}
