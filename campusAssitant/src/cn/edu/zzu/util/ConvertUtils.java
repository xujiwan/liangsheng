/**
 * @title UUIDUtil.java
 * @package com.hw.one.web.core.util
 * @author 杜群星
 * @create_time 2014-06-05
 */
package cn.edu.zzu.util;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.log4j.Logger;

import cn.edu.zzu.base.BaseLog;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * <p>
 * list,map,json,po转换工具类
 * </p>
 *
 * @author 杜群星
 */
public class ConvertUtils extends BaseLog{

    private static Logger log = Logger.getLogger(ConvertUtils.class);

    /**
     * po类转换成map
     *
     * @param o 要转换的实体类对象
     * @return map key为字符串，value为对象属性
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年8月22日上午11:33:30
     */
    public static Map<String, Object> PO2Map(Object o) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        Field[] fields = null;
        String clzName = o.getClass().getSimpleName();
        if (log.isDebugEnabled()) {
            log.debug("***" + clzName + "转map开始****");
        }
        fields = o.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            String proName = field.getName();
            Object proValue = field.get(o);
            map.put(proName, proValue);
            if (log.isDebugEnabled()) {
                log.info("key：" + proName + ",value:" + proValue);
            }
        }
        if (log.isDebugEnabled()) {
            log.debug("***" + clzName + "转map结束****");
        }
        return map;
    }

    /**
     * map转换到po
     *
     * @param map 要转换的map key为字符串，value为对象属性
     * @param o   要转换成的实体类对象
     * @return object 转换后的实体对象
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年8月22日上午11:34:54
     */
    @Deprecated
    public static Object map2PO(Map<String, ? extends Object> map, Object o) throws Exception {
        if (!map.isEmpty()) {
            for (String k : map.keySet()) {
                Object v = "";
                if (!k.isEmpty()) {
                    v = map.get(k);
                }
                Field[] fields = null;
                fields = o.getClass().getDeclaredFields();
                String clzName = o.getClass().getSimpleName();
                if (log.isDebugEnabled()) {
                    log.debug("***map转" + clzName + "开始****");
                }
                for (Field field : fields) {
                    int mod = field.getModifiers();
                    if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                        continue;
                    }
                    if (field.getName().equals(k)) {
                        field.setAccessible(true);
                        field.set(o, v);
                        if (log.isDebugEnabled()) {
                            log.debug("key：" + k + ",value:" + v);
                        }
                    }

                }
                if (log.isDebugEnabled()) {
                    log.debug("***map转" + clzName + "结束****");
                }
            }
        }
        return o;
    }

    /**
     * map转换到po
     *
     * @param map 要转换的map key为字符串，value为对象属性
     * @param clz 实体类
     * @return object 转换后的实体对象
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年8月22日上午11:34:54
     * @
     */
    public static Object map2PO(Map<String, ? extends Object> map, Class<? extends Object> clz) throws Exception {
        Object o = clz.newInstance();
        if (!map.isEmpty()) {
            for (String k : map.keySet()) {
                Object v = "";
                if (!k.isEmpty()) {
                    v = map.get(k);
                }
                Field[] fields = null;
                fields = o.getClass().getDeclaredFields();
                if (log.isDebugEnabled()) {
                    log.debug("***map转" + clz.getClass().getSimpleName() + "开始****");
                }
                for (Field field : fields) {
                    int mod = field.getModifiers();
                    if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                        continue;
                    }
                    if (field.getName().equals(k)) {
                        field.setAccessible(true);
                        field.set(o, v);
                        if (log.isDebugEnabled()) {
                            log.debug("key：" + k + ",value:" + v);
                        }
                    }

                }
                if (log.isDebugEnabled()) {
                    log.debug("***map转" + clz.getClass().getSimpleName() + "结束****");
                }
            }
        }
        return o;
    }

    /**
     * 将map集合转换成json字符串
     *
     * @param map
     * @return String
     * @method map2Json
     * @auhtor 杜群星
     * @createtime 2014年6月21日 下午5:20:25
     */
    public static String map2Json(Map<String, ? extends Object> map) {
        StringBuffer sb = new StringBuffer("{");
        if (!map.isEmpty()) {
            for (Entry<String, ? extends Object> entry : map.entrySet()) {
                String k = entry.getKey();
                Object v = entry.getValue();
                sb.append("\"").append(k).append("\":")
                        .append("\"").append(v).append("\",");
            }
            sb.deleteCharAt(sb.length() - 1);
        }
        sb.append("}");
        return sb.toString();
    }

    /**
     * 将实体po集合转换成map集合
     *
     * @param list 实体集合
     * @return list map集合
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年8月26日下午6:16:49
     */
    public static List<Map<String, Object>> convertList(List<? extends Object> list) throws Exception {
        List<Map<String, Object>> rtnList = new ArrayList<Map<String, Object>>();
        for (Object o : list) {
            Map<String, Object> map = PO2Map(o);
            rtnList.add(map);
        }
        return rtnList;
    }

    /**
     * JSON字符串转MAP
     *
     * @param json
     * @return {@link Map}
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年11月18日下午2:55:46
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> json2Map(String json) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        JSONObject josnObject = JSONObject.parseObject(json);
        Iterator<String> iterator = josnObject.keySet().iterator();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            Object value = josnObject.get(key);
            if (value instanceof JSONArray) {
                map.put(key, json2List(value.toString()));
            } else if (value instanceof JSONObject) {
                map.put(key, json2Map(value.toString()));
            } else {
                map.put(key, toString(value));
                if (log.isDebugEnabled()) {
                    log.debug("分页参数：" + key + ":" + value);
                }
            }
        }
        return map;
    }

    /**
     * json数组转成list
     *
     * @param json
     * @return {@link List}
     * @throws Exception
     * @author 杜群星
     * @create_time 2014年11月21日下午4:11:04
     */
    public static List<Object> json2List(String json)
            throws Exception {
        List<Object> list = new ArrayList<Object>();
        JSONArray jsonArray = JSONArray.parseArray(json);
        for (Object object : jsonArray) {
            if (object instanceof JSONArray) {
                list.add(json2List(object.toString()));
            } else if (object instanceof JSONObject) {
                list.add(json2Map(object.toString()));
            } else {
                list.add(toString(object));
            }
        }

        return list;
    }

    /**
     * 对象转json
     * @param o
     * @return
     * @throws Exception
     */
    public static String PO2Json(Object o) throws Exception{
        return map2Json(PO2Map(o));
    }

    public static String toString(Object object) throws Exception {
        if (object == null || object.equals("null")) {
            return "";
        }
        if (object instanceof String) {
            return (String) object;
        }
        if (object instanceof Number) {
            return ((Number) object).toString();
        }
        if (object instanceof Boolean) {
            return ((Boolean) object).toString();
        }
        if (object instanceof Date) {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format((Date) object);
        }
        throw new Exception("不支持转换的类型：" + object.getClass().getCanonicalName());
    }


//    public static void main(String[] args) {
//		PageResult pageResult = new PageResult();
//		pageResult.setError("dd");
//		pageResult.setDraw(1);
//		try {
//			System.out.println(PO2Map(pageResult));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}

//		String str  = "{"+
//	     "  \"name\":       \"Airi Satou\","+
//	       " \"position\":   \"Accountant\","+
//	       " \"office\":     \"Tokyo\","+
//	       " \"age\":        \"33\","+
//	       " \"start_date\": \"2008/11/28\","+
//	        "\"salary\":     \"$162,700\""+
//	   " }";
//		String jsonArr  = "[{"+
//				"  \"name\":       \"Airi Satou\","+
//				" \"position\":   \"Accountant\","+
//				" \"office\":     \"Tokyo\","+
//				" \"age\":        \"33\","+
//				" \"start_date\": \"2008/11/28\","+
//				"\"salary\":     \"$162,700\""+
//				" },"+
//				"{"+
//				"  \"name\":       \"Airi Satou\","+
//				" \"position\":   \"Accountant\","+
//				" \"office\":     \"Tokyo\","+
//				" \"age\":        \"33\","+
//				" \"start_date\": \"2008/11/28\","+
//				"\"salary\":     \"$162,700\""+
//				" }]";
//		
//		
//		try {
//			Map<String, Object> map = json2Map(str);
//			Iterator<String> it = map.keySet().iterator();
//			while (it.hasNext()) {
//				String k = (String) it.next();
//				Object v = map.get(k);
//				System.out.println("key：" + k + ",value:" + v);
//				
//			}
//			
//			List<Object> list = json2List(jsonArr);
//			System.out.println(list.size());
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//    }
}
