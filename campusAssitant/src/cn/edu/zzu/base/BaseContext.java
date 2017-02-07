/**
 * File Created at 2015/12/3 0003
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * <pre>
 *
 * </pre>
 *
 * @author qunxing.du
 */
public class BaseContext extends BaseLog implements ApplicationContextAware{

    private static ApplicationContext applicationContext;
    @SuppressWarnings("static-access")
	@Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public static Object getService(String serviceName) {
    	sdebug("SERVICE:"+applicationContext);
    	sdebug("SERVICE:"+serviceName);
        return applicationContext.getBean(serviceName);
    }
}
