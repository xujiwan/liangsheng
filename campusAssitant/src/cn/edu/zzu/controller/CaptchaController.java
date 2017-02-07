/**
 * File Created at 2016年1月15日
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.result.MsgConstants;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.result.Result;

import com.google.code.kaptcha.Constants;

/**
 * 图形验证码控制器
 * 
 * @author jiwan.xu
 */
@RestController
@RequestMapping(path = "/n/captcha")
public class CaptchaController extends BaseController {

	@RequestMapping(path = "check", method = RequestMethod.POST)
	public MsgResult checkCaptcha(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String captcha = request.getParameter("captcha");
		String validCaptcha = (String) session.getAttribute("captcha");
		debug("session中图形验证码：" + validCaptcha);
		debug("用户输入的图形验证码:" + captcha);
		// 验证码验证
		if (StringUtils.isBlank(captcha) || ! captcha.equals(validCaptcha)) {
			return Result.infoResult(MsgConstants.MSG_CODE_1010, MsgConstants.MSG_CONTENT_1010);
		}
		return Result.okResult(MsgConstants.MSG_CODE_SUCCESS, MsgConstants.MSG_CONTENT_SUCCESS);
	}

}
