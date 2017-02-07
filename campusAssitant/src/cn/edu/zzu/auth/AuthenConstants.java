/**
 * File Created at 2015/12/17 0017
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import cn.edu.zzu.resource.Constants;


/**
 * <pre>
 *  认证常量
 * </pre>
 *
 * @author qunxing.du
 */
public class AuthenConstants extends Constants{
    public static String LOGIN_URL;//登陆地址
    public static String NO_AUTHEN_PREFIX;//不认证url前缀
    public static String REGHF_PREFIX;//注册汇付认证前缀
    public static String EXCLUDE_REGHF_CMD;//注册汇付不需要认证的命令
    //有效来源
    public static String VALID_REFERER;
    
    //不验证参数合法性的请求前缀
    public static String NO_VERIFY_PARAMS_PREFIX;

    public static String SQLINJECTION_KEY;
	@Override
	protected void init() {
		
	}
}
