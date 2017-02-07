package cn.edu.zzu.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.log4j.Logger;

public final class DateTimeUtil {
	
	private static Logger logger = Logger.getLogger(DateTimeUtil.class);
	
	private static final String DEFAULT_PATTERN = "yyyy-MM-dd";
	private static final String SDF_DATETIME = "yyyy-MM-dd HH:mm:ss";
	private static final String SDF_TIME = "HH:mm:ss";
	private static final String SDF_YM = "yyyy-MM";
	private DateTimeUtil(){}
	
	/**
	 * getCurrentTimestamp获取系统当前Timestamp时间
	 * @return Timestamp
	 */
	public static Timestamp getCurrentTimestamp(){
		return new Timestamp(System.currentTimeMillis());
	}
	
	/**
	 * 获取当前日期（字符串类型）
	
	 * getCurDateStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getCurDateStr(){
		Date date = Calendar.getInstance().getTime();
		SimpleDateFormat sdf = new SimpleDateFormat(SDF_DATETIME);
		return sdf.format(date);
	}
	
	/**
	 * 获取当前日期（日期类型）
	 * getCurDate
	 * @param   
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getCurFormatDate(){
		Date result = null;
		SimpleDateFormat sdf = new SimpleDateFormat(SDF_DATETIME);
		String curDateStr = getCurDateStr();
		try {
			result = sdf.parse(curDateStr);
		} catch (Exception e) {
			logger.error("获取日期失败："+e.getMessage());
		}
		return result;
	}
	
	
	/**
	 * 格式化日期
	 * getFormatDate
	 * @param   date
	 * @param   formatStr 格式字符串
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getFormatDate(String date,String formatStr){
		if(date == null){
			return null;
		}
		
		SimpleDateFormat sdf =	formatStr != null && !formatStr.isEmpty()
					? new SimpleDateFormat(formatStr)
					: new SimpleDateFormat(SDF_DATETIME);
					
		Date result = null;
		try {
			result = sdf.parse(date);
		} catch (ParseException e) {
			logger.error("获取日期失败："+e.getMessage());
		}
		
		return result;
	}
	
	/**
	 * 格式化日期
	 * getFormatDate
	 * @param   
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getFormatDate(Date date,String formatStr){
		if(date == null){
			return null;
		}
		
		Date result = null;
		SimpleDateFormat sdf = formatStr != null && !formatStr.isEmpty()
				? new SimpleDateFormat(formatStr)
				: new SimpleDateFormat(SDF_DATETIME);
		
		String dateStr = getFormatDateStr(date, formatStr);
		
		try {
			result = sdf.parse(dateStr);
		} catch (ParseException e) {
			logger.error("日期转化失败");
			return result;
		}
		
		return result;
	}
	
	/**
	 * 格式化日期
	 * getFormatDateStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getFormatDateStr(Date date,String formatStr){
		if(date == null){
			return "";
		}
		
		SimpleDateFormat sdf = (formatStr != null && !formatStr.isEmpty())
				? new SimpleDateFormat(formatStr)
				: new SimpleDateFormat(SDF_DATETIME);
		
		return sdf.format(date);
	}
	
	/**
	 * 格式化日期 
	 * getFormatDateStr
	 * @param   date
	 * @param   formatStr 格式字符串
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getFormatDateStr(String date,String formatStr){
		if(date == null){
			return "";
		}
		
		SimpleDateFormat sdf = formatStr !=null && !formatStr.isEmpty()
				? new SimpleDateFormat(formatStr)
				: new SimpleDateFormat(SDF_DATETIME);
				
		Date dt = getFormatDate(date, formatStr);
		return sdf.format(dt);
	}
	
	
	/**
	 * 格式化日期
	 * getFormatDateStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getFormatDateStr(Date date){
		return getFormatDateStr(date, SDF_DATETIME);
	}
	
	/**
	 * 格式化日期
	 * getFormatDate
	 * @param   
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getFormatDate(Date date){
		return getFormatDate(date, SDF_DATETIME);
	}
	
	/**
	 * 格式化日期
	 * getFormatDate
	 * @param   
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getFormatDate(String date){
		return getFormatDate(date, SDF_DATETIME);
	}
	
	/**
	 * 格式化日期
	 * getFormatDateStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getFormatDateStr(String date){
		return getFormatDateStr(date,SDF_DATETIME);
	}
	
	/**
	 * 得到当前日期时间
	 * getCurDateTime
	 * @param   
	 * @return    Date
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static Date getCurDateTime(){
		String curDateStr = getCurDateTimeStr();
		
		if(curDateStr == null || curDateStr.isEmpty()){
			return null;
		}
		
		Date result = null;
		SimpleDateFormat sdf = new SimpleDateFormat(SDF_DATETIME);
		
		try {
			result = sdf.parse(curDateStr);
		} catch (Exception e) {
			logger.error("获取日期失败：" + e.getMessage());
		}
		
		return result;
	}
	
	/**
	 * 得到当前的日期时间字符串
	 * getCurDateTimeStr
	 * @param   
	 * @return    String 格式为：yyyy-MM-dd HH:mm:ss
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getCurDateTimeStr(){
		Date date = Calendar.getInstance().getTime();
		SimpleDateFormat sdf = new SimpleDateFormat(SDF_DATETIME);
		return sdf.format(date);
	}
	
	/**
	 * 获取时间字符串
	 * getTimeStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getTimeStr(Date date ,String formatStr){
		if(date == null){
			return "";
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		return sdf.format(date);
	}
	
	/**
	 * 获取时间字符串
	 * getTimeStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getTimeStr(Date date){
		return getTimeStr(date, SDF_TIME);
	}
	
	/**
	 * 获取时间字符串
	 * getTimeStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getTimeStr(String date ,String formatStr){
		if(date == null || date.isEmpty()){
			return "";
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		return sdf.format(date);
	}
	
	/**
	 * 获取时间字符串
	 * getTimeStr
	 * @param   
	 * @return    String
	 * @Exception 异常对象
	 * @since  CodingExample　Ver(编码范例查看) 1.1
	 */
	public static String getTimeStr(String date){
		return getTimeStr(date, SDF_TIME);
	}
	
	/**
	 * 
	 * 函 数 名：getCurrentDate
	 * 功能描述：获取当前日期
	 * 创建人：马宁
	 * 创建时间：2012-10-24 下午3:57:13
	 * 修改人：
	 * 修改时间：
	 * 修改原因描述：
	 */
	public static Date getCurrentDate(){
		return Calendar.getInstance().getTime();
	}
	
	/**
	 * 日期增加几个月后的月末
	 * 
	 * @param date
	 * @param monthNum
	 * @return
	 */
	public static Date addMonthToDate(Date date, int monthNum) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MONTH, monthNum);
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime(), DEFAULT_PATTERN);
	}
	/**
	 * 日期增加几个月后的月末
	 * 
	 * @param date
	 * @param monthNum
	 * @return
	 */
	public static Date addMonthToEnd(Date date, int monthNum) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MONTH, monthNum);
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime(), SDF_DATETIME);
	}
	/**
	 * 日期增加几个月后的月初
	 * 
	 * @param date
	 * @param monthNum
	 * @return
	 */
	public static Date addMonthToStart(Date date, int monthNum) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MONTH, monthNum);
		c.set(Calendar.HOUR_OF_DAY, c.getActualMinimum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMinimum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMinimum(Calendar.SECOND));
		return getFormatDate(c.getTime(), SDF_DATETIME);
	}
	/**
	 * 获取当前月开始日期 如：1月，为2016-01-01 00:00:00
	 * @return
	 */
	public static Date getCurrentMonthStart(){
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMinimum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMinimum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMinimum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	/**
	 * 获取当前月末时间，如：1月，为2016-01-31 23:59:59
	 * @return
	 */
	public static Date getCurrentMonthEnd(){
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH,c.getActualMaximum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	/**
	 * 获取当前月开始日期 如：1月，为2016-01-01 00:00:00
	 * @return
	 */
	public static Date getFormatStart(Date date){
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMinimum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMinimum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMinimum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	/**
	 * 获取当前月末时间，如：1月，为2016-01-31 23:59:59
	 * @return
	 */
	public static Date getFormatEnd(Date date){
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	/**
	 * 获取当前月开始日期 如：1月，为2016-01-01 00:00:00
	 * @return
	 */
	public static Date getFormatStart(String date){
		Calendar c = Calendar.getInstance();
		c.setTime(getFormatDate(date,SDF_YM));
		c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMinimum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMinimum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMinimum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	/**
	 * 获取当前月末时间，如：1月，为2016-01-31 23:59:59
	 * @return
	 */
	public static Date getFormatEnd(String date){
		Calendar c = Calendar.getInstance();
		c.setTime(getFormatDate(date,SDF_YM));
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	
	/**
	 * 获取当天最后时间，如：1月，为current 23:59:59
	 * @return
	 */
	public static Date getDayFormatEnd(Date date){
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, c.getActualMaximum(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c.getActualMaximum(Calendar.MINUTE));
		c.set(Calendar.SECOND, c.getActualMaximum(Calendar.SECOND));
		return getFormatDate(c.getTime());
	}
	
	public static void main(String[] args) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, 2010);
		c.set(Calendar.MONTH, 6);
		//Date date = c.getTime();
		
//		System.out.println(getCurrentMonthStart());
//		System.out.println(getCurrentMonthEnd());
//		System.out.println(getFormatStart(date));
//		System.out.println(getFormatEnd(date));
//		Calendar c = Calendar.getInstance();
//		c.add(Calendar.MONTH, 1);
//		System.out.println(c.getActualMaximum(Calendar.DAY_OF_MONTH));
//		System.out.println(c.getActualMinimum(Calendar.DAY_OF_MONTH));
//		System.out.println(c.getActualMaximum(Calendar.DATE));
//		System.out.println(c.getActualMinimum(Calendar.DATE));
//		System.out.println(c.get(Calendar.DATE));
		System.out.println(getFormatDateStr("2015-01-01 23:00:22" , "yyyy-MM-dd"));
		System.out.println(getFormatDateStr("2015-01-01" , "yyyy-MM-dd"));
	}
}
