/**
 * File Created at 2015年3月11日
 * Copyright 2014-2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.auth.SessionUtil;
import cn.edu.zzu.result.MsgConstants;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.result.Result;
import cn.edu.zzu.service.IUserService;
import cn.edu.zzu.util.AES;

import com.google.common.collect.Maps;

/**
 * <p>
 * 核对用户是否登陆
 * </p>
 * 
 * @author jiwan.xu
 * 
 */
@RestController
@RequestMapping("/n/checkUser")
public class CheckUserController extends BaseController {
	@Resource
	private IUserService userService;

	/**
	 * 检查用户是否登陆
	 * 
	 * @return
	 */
	@RequestMapping(value = "isLogin", method = RequestMethod.GET)
	public MsgResult isLogin() {
		if (! SessionUtil.isLogin()) {
			return Result.infoResult(MsgConstants.MSG_CODE_1005, MsgConstants.MSG_CONTENT_1005);
		}
		return Result.okResult();
	}


	/**
	 * 检查密码是否正确
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "isPass", method = RequestMethod.GET)
	public @ResponseBody MsgResult isPass(@RequestParam(value = "tel", required = false) String tel,
			@RequestParam(value = "pwd", required = false) String pwd){

	//public MsgResult isPass(HttpServletRequest request) {
		//String pwd = request.getParameter("pwd");
		//String tel = SessionUtil.getUserTel();
		if (StringUtils.isBlank(tel)) {
			return Result.infoResult(MsgConstants.MSG_CODE_1005, MsgConstants.MSG_CONTENT_1005);
		}
		if (StringUtils.isBlank(pwd)) {
			return Result.infoResult(MsgConstants.MSG_CODE_1002, MsgConstants.MSG_CONTENT_1002);
		}
		Map<String, Object> map = Maps.newHashMap();
		map.put("TEL", tel);
		Map<String, Object> userMap = userService.getUserByMap(map);
		if (userMap == null || userMap.isEmpty()) {
			return Result.infoResult(MsgConstants.MSG_CODE_1004, MsgConstants.MSG_CONTENT_1004);
		}
		String originalPwd = (String) userMap.get("PWD");
		try {
			if (! AES.encrypt(pwd).equals(originalPwd)) {
				return Result.infoResult(MsgConstants.MSG_CODE_1012, MsgConstants.MSG_CONTENT_1012);
			}
		} catch (Exception e) {
			debug(e.getMessage());
			return Result.errorResult(MsgConstants.MSG_CODE_ERROR, MsgConstants.MSG_CONTENT_ERROR);
		}
		return Result.okResult();
	}
	/**
	 * 检查是否注册平台
	 * @url/i/n/checkUser/isRegisterPlatform.json
	 * @method get
     * @param {tel}
	 * @return
	 */
	@RequestMapping(value = "isRegisterPlatform", method = RequestMethod.GET)
	public MsgResult isRegisterPlatform(HttpServletRequest request) {
		String tel = request.getParameter("tel");
		Map<String,Object> checkMap = new HashMap<String,Object>();
		if (tel != null && ! tel.isEmpty()) {
			checkMap.put("TEL",tel);
			boolean isRegisterPlat = userService.checkIsRegister(checkMap);
			if(isRegisterPlat){
				return Result.infoResult(MsgConstants.MSG_CODE_1021, MsgConstants.MSG_CONTENT_1021);
			}else{
				return Result.infoResult(MsgConstants.MSG_CODE_1004, MsgConstants.MSG_CONTENT_1004);
			}
		}
		return null;
	}

}
