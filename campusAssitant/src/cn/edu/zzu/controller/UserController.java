/**
 * File Created at 2015/12/8 0008
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.zzu.auth.SessionConstants;
import cn.edu.zzu.auth.SessionUtil;
import cn.edu.zzu.auth.SmsConstants;
import cn.edu.zzu.base.BaseConstants;
import cn.edu.zzu.result.MsgConstants;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.result.Result;
import cn.edu.zzu.service.IUserService;
import cn.edu.zzu.util.AES;
import cn.edu.zzu.util.DateTimeUtil;
import cn.edu.zzu.util.UUIDUtil;

import com.google.code.kaptcha.Constants;
import com.google.common.collect.Maps;

/**
 * <pre>
 * 用户登陆认证,注销
 * </pre>
 *
 * @author jiwan.xu
 */
@Controller
@RequestMapping(path = "/n/user")
public class UserController extends BaseController{
	
	/*@ResponseBody
	@RequestMapping(value = "/test")
	public String a(){
		return "1";
	}*/

    @Resource
    private IUserService userService;
    
    /**
     * <pre>
     * 用户认证
     * </pre>
     * @url /i/n/user/authen.json
     * @method post
     * @param {tel,pwd}
     * @return {type,code,message,data:{sessionId,hfCode,recommend}}
     */
    @RequestMapping(value = "authen", method = RequestMethod.POST)
    public MsgResult authen(Model model,HttpServletRequest request) {
        String captcha = request.getParameter("captcha");
        String tel = request.getParameter("tel");
        String pwd = request.getParameter("pwd");
        debug("是否新创建的session:" + String.valueOf(SessionUtil.getSession().isNew()));
        String validCaptcha = (String)SessionUtil.get("captcha");
        debug("session中图形验证码："+ validCaptcha);
        debug("用户输入的图形验证码:"+captcha);
        //验证码验证
        if(StringUtils.isBlank(captcha) ||  !captcha.equalsIgnoreCase(validCaptcha)){
        	return Result.infoResult(MsgConstants.MSG_CODE_1010,MsgConstants.MSG_CONTENT_1010);
        }
        if (StringUtils.isBlank(tel)) {
            return  Result.infoResult(MsgConstants.MSG_CODE_1001, MsgConstants.MSG_CONTENT_1001);
        }
        if (StringUtils.isBlank(pwd)) {
            return  Result.infoResult(MsgConstants.MSG_CODE_1002, MsgConstants.MSG_CONTENT_1002);
        }

        Map<String, Object> map = Maps.newHashMap();
        map.put("TEL", tel);
        try {
            Map<String, Object> userMap = userService.getUserByMap(map);
            
            if (userMap == null || userMap.isEmpty()) {
                return  Result.infoResult(MsgConstants.MSG_CODE_1004,MsgConstants.MSG_CONTENT_1004);
            }
            
            int pwdErrNum = ((Integer) userMap.get("PWD_ERR_NUM")).intValue();
			Date unLockTime = (Date) userMap.get("UNLOCK_TIME");
			Calendar calendar = Calendar.getInstance();
			Date curTime = calendar.getTime();
			calendar.add(Calendar.MINUTE, 5);
			Date tempTime = calendar.getTime();
			if (pwdErrNum >= 5) {
				if (unLockTime != null && unLockTime.after(curTime)) {
					// 解锁时间未到，直接返回剩余时间提示
					String remainTime = String.valueOf((unLockTime.getTime() - curTime.getTime()) / 60000);
					Map<String, Object> errMap = new HashMap<String, Object>();
					errMap.put("remainTime", remainTime);
					return  Result.infoResult(MsgConstants.MSG_CODE_1007,MsgConstants.MSG_CONTENT_1007.replace("#time#", remainTime),errMap);
				} else {
					// 重置错误次数和解锁时间
					pwdErrNum = 0;
					unLockTime = null;
					Map<String, Object> resetMap = new HashMap<String, Object>();
					resetMap.put("TEL", tel);
					resetMap.put("PWD_ERR_NUM", pwdErrNum);
					resetMap.put("UNLOCK_TIME", unLockTime);
					userService.updateUserPwdErrByMap(resetMap);
				}
			}
            String originalPwd = (String) userMap.get("PWD");
            if (! AES.encrypt(pwd).equals(originalPwd)) {
				if (++pwdErrNum >= 5) {
					// 修改错误次数，加锁定时间
					Map<String, Object> resetMap = new HashMap<String, Object>();
					resetMap.put("TEL", tel);
					resetMap.put("PWD_ERR_NUM", pwdErrNum);
					resetMap.put("UNLOCK_TIME", tempTime);
					userService.updateUserPwdErrByMap(resetMap);
					
					Map<String, Object> errMap = new HashMap<String, Object>();
					errMap.put("remainTime", 5);
					return  Result.infoResult(MsgConstants.MSG_CODE_1008,MsgConstants.MSG_CONTENT_1008,errMap);
				} else {
					// 修改错误次数
					Map<String, Object> resetMap = new HashMap<String, Object>();
					resetMap.put("TEL", tel);
					resetMap.put("PWD_ERR_NUM", pwdErrNum);
					resetMap.put("UNLOCK_TIME", null);
					userService.updateUserPwdErrByMap(resetMap);
					return  Result.infoResult(MsgConstants.MSG_CODE_1009,MsgConstants.MSG_CONTENT_1009.replace("#count#", String.valueOf(pwdErrNum)));
				}
            }
            

			// 重置错误次数和解锁时间
			if(pwdErrNum > 0){
				pwdErrNum = 0;
				unLockTime = null;
				Map<String, Object> resetMap = new HashMap<String, Object>();
				resetMap.put("TEL", tel);
				resetMap.put("PWD_ERR_NUM", pwdErrNum);
				resetMap.put("UNLOCK_TIME", null);
				userService.updateUserPwdErrByMap(resetMap);
			}
			// 修改登录时间
			userMap.put("LOGIN_TIME", DateTimeUtil.getCurDateTimeStr());
			userService.updateUserLoginTimeByMap(userMap);
			
            //存放需要数据到session
            /*SessionUtil.setCurUser(userMap);*/
            HttpSession session = SessionUtil.getSession();
            String sessionId = session.getId();
            //TODO ：存放session到redis
//            sessionRedis.insert(sessionId, session, AuthenConstants.SESSION_TIMEOUT, TimeUnit.SECONDS);
            
            //响应前端
            Map<String,Object> rtnMap = new HashMap<>();
            rtnMap.put("sessionId", sessionId);
            //rtnMap.put("hfCode", userMap.get("USR_CUSTID") != null ? "yes" : "no");
            /*if (userMap.get("RECOMMEND_CODE") != null) {
                rtnMap.put("recommend", userMap.get("RECOMMEND_CODE"));
            }*/
            return  Result.okResult(MsgConstants.MSG_CODE_SUCCESS, MsgConstants.MSG_CONTENT_SUCCESS,rtnMap);
        } catch (Exception e) {
            debug(e.getMessage());
            return  Result.errorResult(MsgConstants.MSG_CODE_ERROR,MsgConstants.MSG_CONTENT_ERROR);
        }
    }

    /**
     * <pre>
     * 用户注销
     * </pre>
     * @url /i/n/user/logout.json
     * @method post
     * @param request
     * @return {type,code,message}
     */
    @RequestMapping(value = "logout", method = RequestMethod.POST)
    public MsgResult logout(HttpServletRequest request) {
    	HttpSession session = SessionUtil.getSession();
    	if(session != null) {
    		//TODO:清除redis中session数据
//    		sessionRedis.delete(session.getId());
    		SessionUtil.set(SessionConstants.USER_TAG, null);
    		SessionUtil.getSession().invalidate();
    		return  Result.okResult(MsgConstants.MSG_CODE_SUCCESS, MsgConstants.MSG_CONTENT_SUCCESS);
    	}
    	return  Result.okResult(MsgConstants.MSG_CODE_1005, MsgConstants.MSG_CONTENT_1005);
    }

    /**
     * 用户注册
     * @url /i/n/user/register.json
     * @method post
     * @param request
     * @return {type,code,message}
     */
    @RequestMapping(value = "register",method = RequestMethod.POST)
    public MsgResult register(HttpServletRequest request){
    	String studentNum = request.getParameter("student_num");
    	String mobile = request.getParameter("mobile");
    	String password = request.getParameter("password");
    	String captcha = request.getParameter("captcha");
        String validSmsCode = (String)request.getSession().getAttribute("captcha");
        
        debug("session中短信验证码："+ validSmsCode);
        debug("用户输入的短信验证码:"+captcha);
        if(StringUtils.isBlank(captcha) ||  !captcha.equalsIgnoreCase(validSmsCode)){
        	return Result.infoResult(MsgConstants.MSG_CODE_1010, MsgConstants.MSG_CONTENT_1010);
        }
    	if(StringUtils.isBlank(mobile)){
    		return Result.infoResult(MsgConstants.MSG_CODE_1001, MsgConstants.MSG_CONTENT_1001);
    	}
    	if(StringUtils.isBlank(password)){
    		return Result.infoResult(MsgConstants.MSG_CODE_1002, MsgConstants.MSG_CONTENT_1002);
    	}
    	//加密密码
    	try {
			password = AES.encrypt(password);
		} catch (Exception e) {
			e.printStackTrace();
			return Result.exceptionResult();
		}
    	//判断是否注册过
    	
    	Map<String,Object> checkMap = new HashMap<String, Object>();
    	checkMap.put("TEL", mobile);
    	boolean isResigter = userService.checkIsRegister(checkMap);
    	
    	if(isResigter){
    		return Result.infoResult(MsgConstants.MSG_CODE_1021, MsgConstants.MSG_CONTENT_1021);
    	}
    	//来源
    	/*if(StringUtils.isBlank(introduce)){
    		introduce = "0";
    	}*/
    	
    	Map<String, Object> userMap = new HashMap<String, Object>();
    	String curDate = DateTimeUtil.getCurDateTimeStr();
    	userMap.put("STUDENT_NUM", studentNum);
    	userMap.put("TEL", mobile);
    	userMap.put("PWD", password);
    	userMap.put("TIME", curDate);
    /*	userMap.put("INTRODUCTION", introduce);*/
    	userMap.put("LOGIN_TIME", curDate);
    	userService.insertUser(userMap);
		// 初始和用户相关的数据
    	//userService.insertUserMessage(userId);
    	//userService.insertUserAssets(userId);
    	//存session
    	/*SessionUtil.setCurUser(userMap);*/
    	//发短信
    	//messageProducer.send(new SMS(mobile, SmsTplConstants.Template.TMPLT_REG_PLTF.name()));
    	//活动处理
    	return Result.okResult();
    }
}
