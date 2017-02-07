/**
 * @title UUIDUtil.java
 * @package com.hw.one.web.core.util
 * @author 杜群星
 * @create_time 2014-06-05
 */
package cn.edu.zzu.util;

import java.util.UUID;
import java.util.concurrent.locks.ReentrantLock;

/**
 * <p>
 * UUID工具类
 * </p>
 */
public class UUIDUtil {
    private static long tmpID = 0; //生成唯一标识所用参数
    private static ReentrantLock lock = new ReentrantLock();
	
	/**
	 * 获取32位uuid
	 * @return  str        
	 * @author 杜群星
	 * @create_time 2013-6-8 下午3:28:25
	 */
	public static String getUUID(){
		String str = UUID.randomUUID().toString();
		str = str.replaceAll("-", "");
		return str;
	}
	
    /*
     * 获取唯一标识
     */
    public static  String getUniqueNumber() {
        lock.lock();
        try {
            long uniqueNumber = System.currentTimeMillis();// 毫秒
            if (uniqueNumber > tmpID) {
                tmpID = uniqueNumber;
            } else { //时间间隔极短，在微秒、甚至纳秒级，会发生currentTime相等情况
                uniqueNumber = (++tmpID);
            }
            return String.valueOf(uniqueNumber);
        } finally {
            lock.unlock();
        }
    }
}
