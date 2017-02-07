/**
 * File Created at 2016/3/22 0022
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import org.apache.log4j.spi.Filter;
import org.apache.log4j.spi.LoggingEvent;

/**
 * <pre>
 *  自定义日志过滤器
 *  Debug模式时，保持中立，否侧接受日志事件
 * </pre>
 *
 * @author qunxing.du
 */
public class DebugFilter extends Filter {
    @Override
    public int decide(LoggingEvent loggingEvent) {
        return BaseConstants.IS_DEBUG ? 0 : 1;
    }
}
