/**
 * File Created at 2015/12/1 0001
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.IOException;
import java.util.Properties;

/**
 * <pre>
 *  基础监听器
 * </pre>
 *
 * @author qunxing.du
 */
@Deprecated
public class BaseListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            Resource[] resources = resolver.getResources("conf/*");
            for(Resource resource : resources){
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                SystemResource.putAll(properties);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
            SystemResource.clear();
    }
}
