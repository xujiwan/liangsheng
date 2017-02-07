/**
 * 项目 platform
 * 所在包 com.hw.one.web.core.constant
 * 文件名 Constants.java
 * 
 * @author 杜群星
 * @createtime 2014年6月6日 上午12:07:57
 */
package cn.edu.zzu.base;

import cn.edu.zzu.resource.Constants;

/**
 * <pre>
 * 基础Base常量类
 * </pre>
 * 
 * @author 杜群星
 * @createtime 2014年6月6日 上午12:07:57
 */
public class BaseConstants extends Constants {
	public static String BASE_URL;// ip:port
	public static String CONTEXT_PATH;// 上下文路径
	public static String DEBUG;//是否调式
	public static String ROOT_URI;// 投资的路径
	public static String ERROR_URI;//错误页面
	public static boolean IS_DEBUG;
	protected void init() {
		ROOT_URI = BASE_URL + CONTEXT_PATH;
		IS_DEBUG = "1".equals(DEBUG) ? true :false;
	}
}
