/**
 * File Created at 2015/12/14 0014
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.auth;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.edu.zzu.result.MsgConstants;

/**
 * <pre>
 *	认证过滤器
 * </pre>
 *
 * @author qunxing.du
 */
public class AuthenFilter extends AbstractFilter {

	/**
	 * Default constructor.
	 */
	public AuthenFilter() {

	}

	/**
	 * @see Filter#destroy()
	 */
	@Override
	public void destroy() {

	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain fileChain)
			throws IOException, ServletException {
		// place your code here

		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		// 是否ajax请求
		/*if (isAjaxRequest(request)) {
			// 检查请求来源
			String referer = request.getHeader("Referer");
			if (!chechReferer(referer)) {
				wrapResult(MsgConstants.MSG_CODE_1006, MsgConstants.MSG_CONTENT_1006, response);
				return;
			}
		}*/
		System.out.println("doFilter...");
		// 检查是否已认证
		String targetURL = getTargetURL(request);
		if (!isOpenUrl(targetURL)) {
			//从redis中取session
			HttpSession session = (HttpSession)getSession(request);
			//是否登陆
			boolean flag = isAuthen(session);
			
			if (!flag) {
				noAuthen(request, response);
				return;
			}
			//检查是否注册汇付
			if(!isOpenHFUrl(targetURL)){
				//是否注册汇付
				flag = isRegisterHF(session);
				
				if (!flag) {
					noRegisterHF(request, response);
					return;
				}
			}

		}

		// pass the request along the filter chain
		fileChain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	@Override
	public void init(FilterConfig fConfig) throws ServletException {
	}


}
