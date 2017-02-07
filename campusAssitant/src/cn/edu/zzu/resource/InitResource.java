package cn.edu.zzu.resource;
/**
 * File Created at 2015/12/2 0002
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */


import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.PropertiesLoaderUtils;

/**
 * <pre>
 *  初始化数据抽象类，需要初始化数据的类须继承此类
 * </pre>
 *
 * @author qunxing.du
 */
public  class InitResource{
	
	private Logger log = Logger.getLogger(InitResource.class);
	
	private static final String INIT_METHOD_NAME = "init";
	
    private List<String> constantsList = new ArrayList<>();

    private Properties properties = new Properties();

    @SuppressWarnings("unused")
	private  void init() {
        log.debug("RESOURCE：加载资源数据");
        loadResources();
        initConstants();
    }

    private void loadResources(){
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            Resource[] resources = resolver.getResources("conf/*");
            for(Resource resource : resources){
            	Properties props = PropertiesLoaderUtils.loadProperties(resource);
                this.properties.putAll(props);
                String clzzName = props.getProperty("CLASS_NAME");
                if(clzzName == null || clzzName.isEmpty()){
                	log.error(resource.getFilename()+"没有设置常量类名，属性名：{CLASS_NAME}");
                }
                constantsList.add(clzzName);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initConstants(){
        for (String constants : constantsList){
            Object clzz = null;
            try {
                log.debug("RESOURCE:初始化类{"+constants+"}");
                clzz = (Constants) Class.forName(constants).newInstance();
            }catch (Exception e){
                log.error("RESOURCE:类{"+e.getMessage()+"}未加载");
                continue;
            }
            Field[] fields =  clzz.getClass().getDeclaredFields();
            for(Field f : fields){
                String name = f.getName();
                Object v = properties.get(name);
                log.debug("RESOURCE：{" + name + "：" + v + "}");
                if(v != null){
                    try {
                        f.setAccessible(true);
                        Class type = f.getType();
                        f.set(clzz,type.cast(properties.get(name)));
                    }catch (Exception e){
                        log.error("RESOURCE：类{"+clzz.toString() +"}，字段{"+name+"}访问异常");
                    }
                }
            }
            try {
            	Method[] methods = clzz.getClass().getDeclaredMethods();
            	for (Method method : methods) {
					if(INIT_METHOD_NAME.equals(method.getName())){
						if(!method.isAccessible()){
							method.setAccessible(true);
							log.debug("设置方法{"+method.getName() + "}为可访问");
						}
						log.debug("调用方法{"+method.getName()+"}初始化不可修改静态字段值");
						method.invoke(clzz, new Object[0]);
					}
				}
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
            	e.printStackTrace();
            } catch (IllegalArgumentException e) {
            	e.printStackTrace();
            } catch (InvocationTargetException e) {
            	e.printStackTrace();
            }
        }
    }

    private void destory(){
        properties.clear();
        log.debug("RESOURCE：清除加载的资源数据");
    }
}
