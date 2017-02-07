/**
 * 项目   platform
 * 所在包       com.hw.one.web.attach.util
 * 文件名   AttachUtil.java
 * @author 杜群星
 * @createtime 2014年6月15日 下午9:57:21
 */
package cn.edu.zzu.base;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;



/**
 * 附件工具类
 * @author 杜群星
 * @createtime 2014年6月15日 下午9:57:21
 */
public class AttachUtil {
  //定义附件存储仓库
  private static final String REPOSITORY = FtpConstants.REPOSITORY;
 //最大字节数(1M)
  private static final long MAX_SIZE = Long.parseLong(FtpConstants.MAX_SIZE);
  //定义允许上传的文件扩展名
  private static final HashMap<String, String> extMap = new HashMap<String, String>();

  static{
    extMap.put("image",FtpConstants.EXT_IMAGE);
    extMap.put("flash", FtpConstants.EXT_FLASH);
    extMap.put("media", FtpConstants.EXT_MEDIA);
    extMap.put("file", FtpConstants.EXT_FILE);
  }
  
  public static String upload(String fileName,InputStream is,HttpServletRequest request) throws IOException {
    String relativePath = getRelativePath(fileName);
    String saveUrl = REPOSITORY+relativePath;
    String outFilePath = getPathPrefix(request)+saveUrl;
    if(checkExist(outFilePath)){
      File outFile = new File(outFilePath);
      copy(is, outFile);
    }
    return saveUrl;
  }
  /**
   * 判断文件是否是允许的类型
   * @method isPermit
   * @param  AttachUtil
   * @return boolean
   * @auhtor 杜群星
   * @createtime 2014年6月21日 下午4:35:49
   */
  public static boolean isPermit(String fileExt,String dirName){
    return Arrays.asList(extMap.get(dirName).split(",")).contains(fileExt);
  }
  /**
   * 判断上传文件大小是否超过允许的最大字节数
   * @method isExceedSize
   * @param  size
   * @return boolean
   * @auhtor 杜群星
   * @createtime 2014年6月21日 下午4:41:52
   */
  public static boolean isExceedSize(long size){
    return size > MAX_SIZE;
  }
  /**
   * 判断文件是否存在，不存在则创建
   * @method checkExist
   * @param  AttachUtil
   * @return void
   * @throws IOException 
   * @auhtor 杜群星
   */
  private static boolean checkExist(String filepath) throws IOException {
    File file = new File(filepath);
    if (!file.exists()) {// 判断文件是否存在
      File file2 = new File(file.getParent());
      file2.mkdirs(); // 创建文件夹
      if (!file.isDirectory()) {
        file.createNewFile();// 创建文件
      }
    }
    return true;
  }
  /**
   * 获取项目路径
   * @method getPathPrefix
   * @param  AttachUtil
   * @return String
   * @auhtor 杜群星
   */
  private static String getPathPrefix(HttpServletRequest request){
    return request.getSession().getServletContext().getRealPath("/");
  }
  /**
   * 获取存储的相对路径
   * @method getRelativePath
   * @param  fileName
   * @return String
   * @auhtor 杜群星
   */
  private static String getRelativePath(String fileName){
    String relativePath = "";
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    String curDate = sdf.format(new Date());
    relativePath = "/" + curDate + "/" + fileName;
    return relativePath;
  }
  /**
   * 拷贝文件
   * @method copy
   * @param  in
   * @param  out
   * @return void
   * @auhtor 杜群星
   */
  @SuppressWarnings("unused")
private static void  copy(File in,File out) throws IOException{
    InputStream is = null;
    OutputStream os = null;
    is = new FileInputStream(in);
    os = new FileOutputStream(out);
    byte[] b = new byte[4096];
    int len = -1;
    try {
      while((len = is.read(b)) != -1){
        os.write(b,0,len);
      }
      os.flush();
    } finally{
      try {
        is.close();
        os.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
  /**
   * 将字节流读取到目标文件中
   * @method copy
   * @param  is
   * @param out
   * @return void
   * @auhtor 杜群星
   */
  private static void  copy(InputStream is,File out) throws IOException{
    OutputStream os = null;
    os = new FileOutputStream(out);
    byte[] b = new byte[4096];
    int len = -1;
    try {
      while((len = is.read(b)) != -1){
        os.write(b,0,len);
      }
      os.flush();
    } finally{
      try {
        is.close();
        os.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
  
  public static void main(String[] args) throws IOException {
    String s = getRelativePath("aaa.txt");
    System.out.println(s);  
    File file  = new File("D:\\servers\\tomcat\\oa-tomcat-6.0.24\\webapps\\platform\\jnsyRepository\\20140625\\ct.jpg");
    System.out.println(file.getAbsolutePath());
  }
}
