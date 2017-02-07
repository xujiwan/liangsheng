/**
 * 项目   platform
 * 所在包       com.hw.one.web.core.result
 * 文件名   JsonResult.java
 * @author 杜群星
 * @createtime 2014年6月21日 下午5:16:56
 */
package cn.edu.zzu.result;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import cn.edu.zzu.util.ConvertUtils;



/**
 * 返回结果工具集
 * @author 杜群星
 * @createtime 2014年6月21日 下午5:16:56
 */
public class Result extends MsgResult{
  /**
   * 输出json结果
   * @method outJson
   * @param result 要输出的json字符串
   * @param response response对象
   * @return void
   * @auhtor 杜群星
   * @createtime 2014年6月21日 下午5:50:48
   */
  public static void outJson(String result,HttpServletResponse response){
    PrintWriter pw = null;
    try {
      response.setCharacterEncoding("UTF-8");
      response.setContentType("application/json");
      pw = response.getWriter();
      pw.write(result);
      pw.flush();
    } catch (IOException e) {
      e.printStackTrace();
    }finally{
      if(pw != null){
        pw.close();
      }
    }
  }
  /**
   * 输出字符串
   * @method outText
   * @param  result 要输出的文本
   * @param  response response对象
   * @return void
   * @auhtor 杜群星
   * @createtime 2014年6月21日 下午5:52:03
   */
  public static void outText(String result,HttpServletResponse response){
    PrintWriter pw = null;
    try {
      response.setCharacterEncoding("UTF-8");
      response.setContentType("text/plain");
      pw = response.getWriter();
      pw.write(result);
      pw.flush();
    } catch (IOException e) {
      e.printStackTrace();
    }finally{
      if(pw != null){
        pw.close();
      }
    }
  }

  public static void outJson(MsgResult msgResult,HttpServletResponse response){
	  try {
		outJson(ConvertUtils.PO2Json(msgResult), response);
	} catch (Exception e) {
		e.printStackTrace();
	}
  }
  
}
