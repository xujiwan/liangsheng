/**
 * 项目   platform
 * 所在包       com.hw.one.web.core.result
 * 文件名   MsgResult.java
 * @author 杜群星
 * @createtime 2014年6月5日 下午11:58:40
 */
package cn.edu.zzu.result;

import java.util.HashMap;
import java.util.Map;



/**
 * 返回消息类
 * @author 杜群星
 * @createtime 2014年6月5日 下午11:58:40
 */
public class MsgResult {
  private String type;
  private String code;
  private String message;
  private Map<String, Object> data = new HashMap<String, Object>();
  public MsgResult(){
  }
  /**
   * 消息提示类构造函数
   * @param type 消息类型 参考常量类{@link BaseConstants}
   * @param code 消息码
   * @param message 消息内容
   */
  public MsgResult(String type,String code,String message){
    this.type = type;
    this.code = code;
    this.message = message;
  }

  /**
   * 消息提示构造函数，带数据
   * @param type
   * @param code
   * @param message
   * @param map
   */
  public MsgResult(String type,String code,String message,Map<String,Object> map){
    this.type = type;
    this.code = code;
    this.message = message;
    this.data = map;
  }
  public static MsgResult okResult(String code,String message,Map<String,Object> map){
    return new MsgResult(MsgConstants.MSG_TYPE_OK,code,message,map);
  }
  public static MsgResult infoResult(String code,String message,Map<String,Object> map){
    return new MsgResult(MsgConstants.MSG_TYPE_INFO,code,message, map);
  }
  public static MsgResult errorResult(String code,String message,Map<String,Object> map){
    return new MsgResult(MsgConstants.MSG_TYPE_ERROR,code,message, map);
  }
  public static MsgResult warnResult(String code,String message,Map<String,Object> map){
    return new MsgResult(MsgConstants.MSG_TYPE_WARNING,code,message,map);
  }
  public static MsgResult questionResult(String code,String message,Map<String,Object> map){
    return new MsgResult(MsgConstants.MSG_TYPE_QUESTION,code,message,map);
  }

  public static MsgResult okResult(){
    return okResult(MsgConstants.MSG_CODE_SUCCESS, MsgConstants.MSG_CONTENT_SUCCESS);
  }
  public static MsgResult errorResult(){
	  return errorResult(MsgConstants.MSG_CODE_ERROR, MsgConstants.MSG_CONTENT_ERROR);
  }
  public static MsgResult exceptionResult(){
	  return questionResult(MsgConstants.MSG_CODE_EXCEPTION, MsgConstants.MSG_CONTENT_EXCEPTION);
  }
  
  public static MsgResult okResult(String code,String message){
	  return okResult(code, message, null);
  }
  public static MsgResult infoResult(String code,String message){
    return infoResult(code, message, null);
  }
  public static MsgResult errorResult(String code,String message){
    return errorResult(code, message, null);
  }
  public static MsgResult warnResult(String code,String message){
    return warnResult(code, message, null);
  }

  public static MsgResult questionResult(String code,String message){
    return questionResult(code, message, null);
  }



  /**
   * @return the code
   */
  public String getCode() {
  
    return code;
  }
  
  /**
   * @param code the code to set
   */
  public void setCode(String code) {
  
    this.code = code;
  }
  /**
   * @return the type
   */
  public String getType() {
  
    return type;
  }
  
  /**
   * @param type the type to set
   */
  public void setType(String type) {
  
    this.type = type;
  }
  /**
   * @return the message
   */
  public String getMessage() {
  
    return message;
  }
  
  /**
   * @param message the message to set
   */
  public void setMessage(String message) {
  
    this.message = message;
  }
  
  /**
   * @return the map
   */
  public Map<String, Object> getMap() {
  
    return data;
  }
  
  /**
   * @param map the map to set
   */
  public void setData(Map<String, Object> map) {
  
    this.data = map;
  }

}
