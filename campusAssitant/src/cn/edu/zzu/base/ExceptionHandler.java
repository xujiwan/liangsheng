/**
 * File Created at 2016年1月29日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

/**
 * 异常处理器
 * @author qunxing.du
 *
 */
@Deprecated
public class ExceptionHandler extends BaseLog implements HandlerExceptionResolver{

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		ex.printStackTrace();
		error(ex.getMessage());
		Map<String,Object> model = new HashMap<String, Object>();
		model.put("ex", ex.getMessage());
        String viewName = BaseConstants.ROOT_URI + BaseConstants.ERROR_URI;
        viewName = viewName + "#" +ex.getMessage();
        return new ModelAndView("redirect:" + viewName);
	}

}
