/**
 * File Created at 2015/12/2 0002
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import java.util.Properties;

/**
 * <pre>
 *
 * </pre>
 *
 * @author qunxing.du
 */
@Deprecated
public class SystemResource {

    private static Properties resources = new Properties();

    public static String get(String key){
        return (String)resources.get(key);
    }

    public static void put(String key,String value){
        resources.put(key,value);
    }

    public static void putAll(Properties properties){
        resources.putAll(properties);
    }

    public static void clear(){
        resources.clear();
    }
}
