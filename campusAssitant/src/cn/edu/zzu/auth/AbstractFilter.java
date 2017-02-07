/**
 * File Created at 2016年2月1日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.springframework.web.util.HtmlUtils;

import cn.edu.zzu.result.MsgConstants;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.result.Result;
import cn.edu.zzu.util.ConvertUtils;

/**
 * @author qunxing.du
 *
 */
@SuppressWarnings("unchecked")
public abstract class AbstractFilter implements Filter{
	private static Logger log = Logger.getLogger(AbstractFilter.class);
//	
//	@Autowired
//	private ISessionRedis sessionRedis;
	
	protected String getTargetURL(HttpServletRequest request){
		String reqURI = request.getRequestURI();
		String targetURL = reqURI.substring(reqURI.indexOf("/", 1) + 1);
		return targetURL;
	}
	/**
	 *
	 * 判断是否是不进行session控制的url
	 * 
	 * @param url
	 * @return
	 * @author:杜群星
	 * @create_time:2013-7-2下午4:55:08
	 */
	protected boolean isOpenUrl(String url) {
		boolean flag = false;
		if (AuthenConstants.NO_AUTHEN_PREFIX == null || AuthenConstants.NO_AUTHEN_PREFIX.trim().isEmpty()) {
			return flag;
		}
		String[] prefix = AuthenConstants.NO_AUTHEN_PREFIX.split(",");
		for (String str : prefix) {
			if (url.startsWith(str)) {
				flag = true;
				break;
			}

		}
		return flag;
	}

	/**
	 * 检查请求来源
	 * 
	 * @param referer
	 * @return
	 */
	protected boolean chechReferer(String referer) {
		if (referer != null) {
			String requestReferer = StringUtils.substringBefore(StringUtils.substringBetween(referer, "://", "/"), ":");
			String[] validReferers = AuthenConstants.VALID_REFERER.split(",");
			if(validReferers.length == 0){
				return false;
			}
			for (String validReferer : validReferers) {
				if (validReferer.equalsIgnoreCase(requestReferer)) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 是否ajax请求
	 * @param request
	 * @return
	 */
	protected boolean isAjaxRequest(HttpServletRequest request) {
		String requestType = request.getHeader("X-Requested-With");
		if ("XMLHttpRequest".equalsIgnoreCase(requestType)) {
			return true;
		}
		return false;
	}

	/**
	 * 输出请求结果
	 * @param msgCode
	 * @param msgContent
	 * @return
	 */
	protected void wrapResult(String msgCode, String msgContent,HttpServletResponse response) {
		String result = null;
		try {
			MsgResult msgResult = Result.infoResult(msgCode, msgContent);
			result = ConvertUtils.PO2Json(msgResult);
		} catch (Exception e) {
			e.printStackTrace();
			result = "{\"type\":\"MsgConstants.MSG_TYPE_INFO\",\"code\":\"" + msgCode + "\",\"message\":\"" + msgContent
					+ "\"}";
		}
		Result.outJson(result, response);
	}
	
	/**
	 * 通过sessionId从redis中取session
	 * @param request
	 * @return
	 */
	protected Object getSession(HttpServletRequest request){
		String sessionId = null;
		Cookie[] cookies= request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if("JSESSIONID".equalsIgnoreCase(cookie.getName())){
					sessionId = cookie.getValue();
					break;
				}
			}
		}
		if(sessionId == null){
			String jsessionId = request.getParameter("JSESSIONID");
			sessionId = jsessionId == null ?  request.getParameter("jsessionid") : jsessionId;
		}
		//TODO:redis取session
//		if(sessionId != null){
//			return sessionRedis.get(sessionId);
//		}
		return request.getSession(false);
	}
	
	/**
	 * 是否不需要注册汇付的url
	 * @param url
	 * @return
	 */
	protected boolean isOpenHFUrl(String url){
		boolean flag = true;
		//不开放
		if (AuthenConstants.REGHF_PREFIX == null || AuthenConstants.REGHF_PREFIX.trim().isEmpty()) {
			return false;
		}
		
		String[] prefix = AuthenConstants.REGHF_PREFIX.split(",");
		for (String str : prefix) {
			//以前缀开头且非排除的命令是不开放的
			if (url.startsWith(str)) {
				//若没有排除命令，则都为不开放的
				if(AuthenConstants.EXCLUDE_REGHF_CMD == null || AuthenConstants.EXCLUDE_REGHF_CMD.trim().isEmpty()){
					return false;
				}
				String[] excludeCmd = AuthenConstants.EXCLUDE_REGHF_CMD.split(",");
				//若为包含为开放，否则不开放
				flag = false;
				for (String cmd : excludeCmd) {
					if(url.contains(cmd)){
						flag = true;
						break;
					}
				}
				break;
			}
		}
		return flag;
	}
	/**
	 * 未登录处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	protected void noAuthen(HttpServletRequest request,HttpServletResponse response) throws IOException{
		if (isAjaxRequest(request)) {
			wrapResult(MsgConstants.MSG_CODE_1005, MsgConstants.MSG_CONTENT_1005, response);
		} else {
			response.sendRedirect(AuthenConstants.LOGIN_URL);
		}
	}
	/**
	 * 未注册汇付处理
	 * @param request
	 * @param response
	 */
	protected void noRegisterHF(HttpServletRequest request,HttpServletResponse response){
		if (isAjaxRequest(request)) {
			wrapResult(MsgConstants.MSG_CODE_1046, MsgConstants.MSG_CONTENT_1046, response);
		} else{
			wrapResult(MsgConstants.MSG_CODE_EXCEPTION, MsgConstants.MSG_CONTENT_EXCEPTION, response);
		}
	}
	/**
	 * 是否登陆
	 * @param request
	 * @return
	 */
	protected boolean isAuthen(HttpSession session){
		boolean flag = false;
		if (session != null) {
			Object o = session.getAttribute(SessionConstants.USER_TAG);
			if (o != null) {
				Map<String, Object> curUser = (Map<String, Object>) o;
				String userId = (String) curUser.get(SessionConstants.USER_ID);
				if (userId != null && !userId.isEmpty()) {
					flag = true;
				}
			}
		}
		return flag;
	}
	/**
	 * 是否注册汇付
	 * @param request
	 * @return
	 */
	protected boolean isRegisterHF(HttpSession session){
		boolean flag = false;
		if (session != null) {
			Object o = session.getAttribute(SessionConstants.USER_TAG);
			if (o != null) {
				Map<String, Object> curUser = (Map<String, Object>) o;
				String userHFId = (String) curUser.get(SessionConstants.USER_HF_ID);
				if (userHFId != null && !userHFId.isEmpty()) {
					flag = true;
				}
			}
		}
		return flag;
	}
	/**
	 * 是否不验证参数合法性的请求前缀
	 * @param url
	 * @return
	 */
	protected boolean isOpenIllegaRequest(String url){
		boolean flag = false;
		if (AuthenConstants.NO_VERIFY_PARAMS_PREFIX == null || AuthenConstants.NO_VERIFY_PARAMS_PREFIX.trim().isEmpty()) {
			return flag;
		}
		String[] prefix = AuthenConstants.NO_VERIFY_PARAMS_PREFIX.split(",");
		for (String str : prefix) {
			if (url.startsWith(str)) {
				flag = true;
				break;
			}

		}
		return flag;
	}
	/**
	 * 参数是否违法,包含需转义的字符
	 * @param value
	 * @return
	 */
	protected boolean isIllegalParam(String value){
		String orgin = value;
		String current = StringEscapeUtils.escapeHtml4(value);
		System.out.println(orgin);
		System.out.println(current);
		if(!orgin.equals(current)){
			return true;
		}
		return false;
	}
	/**
	 * 是否包含sqlInjectionKey
	 * @param value
	 * @return
	 */
	protected boolean isSqlInjection(String value){
		boolean flag = false;
		if (AuthenConstants.SQLINJECTION_KEY == null || AuthenConstants.SQLINJECTION_KEY.trim().isEmpty()) {
			return flag;
		}
		String[] sqlInjKey = AuthenConstants.SQLINJECTION_KEY.split("\\|");
		for (String key : sqlInjKey) {
			if (value.indexOf(key) != -1) {
				flag = true;
				break;
			}
		}
		return flag;
	}
	/**
	 * 违法请求响应
	 * @param request
	 * @param response
	 */
	protected void illegalRequest(HttpServletRequest request,HttpServletResponse response){
		if (isAjaxRequest(request)) {
			wrapResult(MsgConstants.MSG_CODE_1013, MsgConstants.MSG_CONTENT_1013, response);
		} else{
			wrapResult(MsgConstants.MSG_CODE_1013, MsgConstants.MSG_CONTENT_1013, response);
		}
	}
	
	public static void main(String[] args) {

//pageData:{"start":0,"length":10,"columns":[{"data":"create_time","name":"create_time","orderable":true},{"data":"LOAD_TITLE","name":"LOAD_TITLE"},{"data":"sub_load_id","name":"sub_load_id"},{"data":"STAGES_ASSESTS","name":"STAGES_ASSESTS"},{"data":"loanTime","name":"loanTime"},{"data":"interest_time","name":"interest_time"},{"data":"PROFIT","name":"PROFIT"},{"data":"balance","name":"balance"},{"data":"STATUS","name":"STATUS"},{"data":"can_transfer","name":"can_transfer"},{"data":"investStatus","name":"investStatus"},{"data":"DISBURSEMENT_PAYMNT_TIME","name":"DISBURSEMENT_PAYMNT_TIME"},{"data":"LOAD_ID","name":"LOAD_ID"},{"data":"INVEST_ID","name":"INVEST_ID"}],"order":[{"column":"2","dir":"desc"}]}
//lastestDate:1
		String s = "\",'&<>";
		AntiXssAndSqlInjectionFilter anti = new AntiXssAndSqlInjectionFilter();
		System.out.println(anti.isIllegalParam(s));
		System.out.println(anti.isSqlInjection(s));
		System.out.println(HtmlUtils.htmlEscape(s));
		
	}
}
