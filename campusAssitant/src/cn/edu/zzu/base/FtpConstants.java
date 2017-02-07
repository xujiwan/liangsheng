package cn.edu.zzu.base;

import cn.edu.zzu.resource.Constants;



public class FtpConstants extends Constants{
	//地址
	public static String FTP_HOSTNAME;
	//端口
	public static String FTP_PORT;
	//用户名
	public static String FTP_USERNAME;
	//密码
	public static String FTP_PASSWORD;
	
	  //定义附件存储仓库
	public static  String REPOSITORY = "respository";
	 //最大字节数(1M)
	public static  String MAX_SIZE = "1048576";
	//扩展名类型
	public static String EXT_IMAGE = "gif,jpg,jpeg,png,bmp";
	public static String EXT_FLASH = "swf,flv";
	public static String EXT_MEDIA = "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,rm,rmvb";
	public static String EXT_FILE = "doc,docx,xls,xlsx,pptzip,rar";
	@Override
	protected void init() {
		
	}
	
	
}