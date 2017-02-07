/**
 * File Created at 2015/11/24 0024
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import org.apache.log4j.Logger;

/**
 * <pre>
 *  日志工具类
 * </pre>
 *
 * @author qunxing.du
 */
public class BaseLog {
    protected Logger log = Logger.getLogger(this.getClass());

    private static BaseLog baseLog = new BaseLog();

    protected void debug(String message){
        log.debug(getMessage(message));
    }

    protected void warn(String message){
        log.warn(getMessage(message));
    }

    protected void info(String message){
        log.info(getMessage(message));
    }

    protected void error(String message){
        log.error(getMessage(message));
    }

    protected static void sdebug(String message){
        baseLog.debug(message);
    }

    protected static void swarn(String message){
        baseLog.warn(message);
    }
    protected static void sinfo(String message){
        baseLog.info(message);
    }

    protected static void serror(String message){
        baseLog.error(message);
    }

    private  String getMessage(String message){
        return  this.getClass().toString() + ":" + message;
    }

    public static void main(String[] args){
        for (int  i= 0 ;i < 10; i++ ) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    for (int a= 0 ;a < 1000; a++){
                        sdebug("test-"+a);
                    }
                }
            }).run();
        }


    }
}
