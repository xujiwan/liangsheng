package cn.edu.zzu.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.BaseLog;
import cn.edu.zzu.result.MsgResult;
import cn.edu.zzu.result.Result;
import cn.edu.zzu.util.ConvertUtils;

@RestController
public class BaseController extends BaseLog{
//    protected HttpServletRequest request;
//    protected HttpServletResponse response;
    
	protected Map<String, Object> initParams(HttpServletRequest request){
		Map<String, Object> params = new HashMap<String, Object>();
		Enumeration<String> enumeration = request.getParameterNames();
		while (enumeration.hasMoreElements()) {
			String name = (String) enumeration.nextElement();
			if("pageData".equals(name)){
				try {
					String value = request.getParameter(name);
					params.putAll(ConvertUtils.json2Map(value));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else{
				String[] values = request.getParameterValues(name);
	            if( values.length == 0){
	            	params.put(name,null);
	            }else if(values.length == 1){
	            	params.put(name,values[0]);
	            }else {
	            	params.put(name,values);
	            }
			}
		}
		log.debug("前端提交参数："+ConvertUtils.map2Json(params));
		return params;
	}
	/**
	 * 异常拦截方法
	 * @param request
	 * @param response
	 * @param ex
	 * @return
	 */
	@ExceptionHandler
	protected MsgResult handlerException(HttpServletRequest request,HttpServletResponse response,Exception ex){
		ex.printStackTrace();
		error(ex.getMessage());
		return Result.exceptionResult();
	}
}
