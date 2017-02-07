/**
 * File Created at 2016年1月20日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.util;



/**
 * 数字转换工具类
 * @author qunxing.du
 *
 */
public class NumberUtils {

	public static double toDouble(Object obj){
		if(obj != null && obj instanceof Double){
			return ((Double)obj).doubleValue();
		}
		return 0d;
	}
	public static int toInt(Object obj){
		if(obj != null && obj instanceof  Integer){
			return ((Integer)obj).intValue();
		}
		return 0;
	}
	public static float toFloat(Object obj){
		if(obj != null && obj instanceof Float){
			return ((Float)obj).floatValue();
		}
		return 0f;
	}
	public static long toLong(Object obj){
		if(obj != null && obj instanceof Long){
			return ((Long)obj).longValue();
		}
		return 0l;
	}
	
	public static void main(String[] args) {
		Object o = "1";
		System.out.println(toInt(o));
		System.out.println(toFloat(o));
		System.out.println(toDouble(o));
		System.out.println(toLong(o));
	}
}
