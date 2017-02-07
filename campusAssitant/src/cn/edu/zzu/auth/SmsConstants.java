package cn.edu.zzu.auth;

import cn.edu.zzu.resource.Constants;

/**
 * 短信系统常量
 * @author qunxing.du
 *
 */
public class SmsConstants extends Constants{
	public static String CLOOPEN_SERVER_IP;
	public static String CLOOPEN_SERVER_PORT;
	public static String CLOOPEN_ACCOUNT_SID;
	public static String CLOOPEN_ACCOUNT_TOKEN;
	public static String CLOOPEN_APP_ID;
	public static String CLOOPEN_VALIDATE_TEMPLATEID;
	public static String CLOOPEN_NOTICE_TEMPLATEID;
	public static String CLOOPEN_VALIDATE_TIME;
	public static String CLOOPEN_IS_ENABLE;
	
	public static String EMAY_WSDL;
	
	public static String EMAY_MARKET_SERIAL;
	public static String EMAY_MARKET_KEY;
	public static String EMAY_MARKET_PASSWORD;
	public static String EMAY_MARKET_ISENABLE;
	
	public static String EMAY_NOTIFICATION_SERIAL;
	public static String EMAY_NOTIFICATION_KEY;
	public static String EMAY_NOTIFICATION_PASSWORD;
	public static String EMAY_NOTIFICATION_ISENABLE;
	
	public static int RANDOM_CODE_NUM = 4;
	
	public static final String SMS_SESSION_KEY = "sms_session_key";

	@Override
	protected void init() {
		// TODO Auto-generated method stub
		
	} 
}
