/**
 * File Created at 2016年1月21日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 防止sql注入和xss攻击过滤器
 * @author qunxing.du
 *
 */
public class AntiXssAndSqlInjectionFilter extends AbstractFilter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
			ServletException {
		HttpServletRequest request = (HttpServletRequest)req;
		HttpServletResponse response = (HttpServletResponse)res;
		chain.doFilter(new XSSRequestWrapper(request), response);
	}

	@Override
	public void destroy() {
		
	}


}
