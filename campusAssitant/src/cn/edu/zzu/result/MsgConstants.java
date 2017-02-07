/**
 * File Created at 2015/12/9 0009
 * Copyright 2015 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.result;

import cn.edu.zzu.resource.Constants;

/**
 * <pre>
 *	消息常量
 * </pre>
 *
 * @author qunxing.du
 */
public class MsgConstants extends Constants{
    //错误类型
    public static final String MSG_TYPE_ERROR = "0";
    //成功类型
    public static final String MSG_TYPE_OK = "1";
    //信息类型
    public static final String MSG_TYPE_INFO = "2";
    //问题类型
    public static final String MSG_TYPE_QUESTION = "3";
    //警告类型
    public static final String MSG_TYPE_WARNING = "4";


    //平台消息码，统一用4位数字表示，以区别汇付等第三方平台的消息码
    public static final String MSG_CODE_ERROR = "0000";
    public static final String MSG_CONTENT_ERROR = "失败";//统一的失败

    public static final String MSG_CODE_SUCCESS = "1111";
    public static final String MSG_CONTENT_SUCCESS = "成功";//统一的成功

    public static final String MSG_CODE_EXCEPTION = "9999";
    public static final String MSG_CONTENT_EXCEPTION = "请联系客服人员";

    //用户登陆消息码 1001-1020

    public static final String MSG_CODE_1001 = "1001";
    public static final String MSG_CONTENT_1001 = "手机号码为空";
    public static final String MSG_CODE_1110 = "1110";
    public static final String MSG_CONTENT_1110 = "学号为空";
    public static final String MSG_CODE_1002 = "1002";
    public static final String MSG_CONTENT_1002 = "密码为空";
    public static final String MSG_CODE_1003 = "1003";
    public static final String MSG_CONTENT_1003 = "密码错误";
    public static final String MSG_CODE_1004 = "1004";
    public static final String MSG_CONTENT_1004 = "用户不存在";

    public static final String MSG_CODE_1005 = "1005";
    public static final String MSG_CONTENT_1005 = "用户未登陆";

    public static final String MSG_CODE_1006 = "1006";
    public static final String MSG_CONTENT_1006 = "请求来源非法";
    public static final String MSG_CODE_1007 = "1007";
    public static final String MSG_CONTENT_1007 = "密码错误次数已超过5次,#time#分钟后重试";
    public static final String MSG_CODE_1008 = "1008";
    public static final String MSG_CONTENT_1008 = "密码错误次数超过5次,5分钟后再试";
    public static final String MSG_CODE_1009 = "1009";
    public static final String MSG_CONTENT_1009 = "密码错误次数#count#,错误次数超过5次将被锁定5分钟";
    public static final String MSG_CODE_1012 = "1012";
    public static final String MSG_CONTENT_1012 = "密码错误";
    public static final String MSG_CODE_1013 = "1013";
    public static final String MSG_CONTENT_1013 = "请求参数非法";
    
    //验证码 1010-1015
    public static final String MSG_CODE_1010 = "1010";
    public static final String MSG_CONTENT_1010 = "图形验证码错误";
    public static final String MSG_CODE_1011 = "1011";
    public static final String MSG_CONTENT_1011 = "短信验证码错误";

    //用户注册消息码 1021-1040
    public static final String MSG_CODE_1021 = "1021";
    public static final String MSG_CONTENT_1021 = "手机号码已注册";

    //用户其他消息码 1041-1080
    public static final String MSG_CODE_1041 = "1041";
    public static final String MSG_CONTENT_1041 = "原始密码错误";
    
    public static final String MSG_CODE_1042 = "1042";
    public static final String MSG_CONTENT_1042 = "邮箱不能为空";
    
    public static final String MSG_CODE_1043 = "1043";
    public static final String MSG_CONTENT_1043 = "手机号不能为空";
    
    public static final String MSG_CODE_1044 = "1044";
    public static final String MSG_CONTENT_1044 = "已绑定微信号";
    
    public static final String MSG_CODE_1045 = "1045";
    public static final String MSG_CONTENT_1045 = "手机号已存在";
    
    public static final String MSG_CODE_1046 = "1046";
    public static final String MSG_CONTENT_1046 = "用户未开通支付账户";
    public static final String MSG_CODE_1047 = "1047";
    public static final String MSG_CONTENT_1047 = "用户名不可为空";
   
    //投资消息码 1081-2040
    public static final String MSG_CODE_1081 = "1081";
    public static final String MSG_CONTENT_1081 = "取现金额超过账户可用余额";
    public static final String MSG_CODE_1082 = "1082";
    public static final String MSG_CONTENT_1082 = "可以进行取现操作";
    public static final String MSG_CODE_1083 = "1083";
    public static final String MSG_CONTENT_1083 = "获取标的信息失败";
    public static final String MSG_CODE_1084 = "1084";
    public static final String MSG_CONTENT_1084 = "还款完成";
    public static final String MSG_CODE_1085 = "1085";
    public static final String MSG_CONTENT_1085 = "账户余额不足";
    public static final String MSG_CODE_1086 = "1086";
    public static final String MSG_CONTENT_1086 = "还款查询余额失败";
    public static final String MSG_CODE_1087 = "1087";
    public static final String MSG_CONTENT_1087 = "还款金额出错";
    public static final String MSG_CODE_1088 = "1088";
    public static final String MSG_CONTENT_1088 = "还款请求已成功提交";
    public static final String MSG_CODE_1089 = "1089";
    public static final String MSG_CONTENT_1089 = "借款单号错误";
    public static final String MSG_CODE_1090 = "1090";
    public static final String MSG_CONTENT_1090 = "已有正在处理的还款请求，无法进行提前还款";
    public static final String MSG_CODE_1091 = "1091";
    public static final String MSG_CONTENT_1091 = "获取还款信息失败";
    public static final String MSG_CODE_1092 = "1092";
    public static final String MSG_CONTENT_1092 = "该项目已满标";
    public static final String MSG_CODE_1093 = "1093";
    public static final String MSG_CONTENT_1093 = "投资金额大于剩余可投金额";
    public static final String MSG_CODE_1094 = "1094";
    public static final String MSG_CONTENT_1094 = "删除银行卡失败";
    public static final String MSG_CODE_1095 = "1095";
    public static final String MSG_CONTENT_1095 = "未授权开启自动投标";
    public static final String MSG_CODE_1096 = "1096";
    public static final String MSG_CONTENT_1096 = "已授权开启自动投标";
    public static final String MSG_CODE_1097 = "1097";
    public static final String MSG_CONTENT_1097 = "不能给自己发送短信";
    public static final String MSG_CODE_1098 = "1098";
    public static final String MSG_CONTENT_1098 = "短信分享成功";
    public static final String MSG_CODE_1099 = "1099";
    public static final String MSG_CONTENT_1099 = "该手机号已经被注册";
    public static final String MSG_CODE_1100 = "1100";
    public static final String MSG_CONTENT_1100 = "没有可用与投资的体验金";
    public static final String MSG_CODE_1101 = "1101";
    public static final String MSG_CONTENT_1101 = "体验金已经使用过";
    public static final String MSG_CODE_1102 = "1102";
    public static final String MSG_CONTENT_1102 = "体验金已经过期";
    public static final String MSG_CODE_1103 = "1103";
    public static final String MSG_CONTENT_1103 = "该项目已满标";
    public static final String MSG_CODE_1104 = "1104";
    public static final String MSG_CONTENT_1104 = "投资金额大于剩余可投金额";
    public static final String MSG_CODE_1105 = "1105";
    public static final String MSG_CONTENT_1105 = "数据不存在";
    public static final String MSG_CODE_1106 = "1106";
    public static final String MSG_CONTENT_1106 = "转让金额不能为空";
    public static final String MSG_CODE_1107 = "1107";
    public static final String MSG_CONTENT_1107 = "未获取投资标识";
    public static final String MSG_CODE_1108 = "1108";
    public static final String MSG_CONTENT_1108 = "该债权已被转出";
    public static final String MSG_CODE_1109 = "1109";
    public static final String MSG_CONTENT_1109 = "暂无可投的新体验标";
    
    //贷款消息码 2041-2080
    
    //附件上传消息码2080-2100
    public static final String MSG_CODE_2080 = "2080";
    public static final String MSG_CONTENT_2080 = "上传的文件不能超过1M";
    public static final String MSG_CODE_2081 = "2081";
    public static final String MSG_CONTENT_2081 = "上传的文件类型不允许";
    public static final String MSG_CODE_2082 = "2082";
    public static final String MSG_CONTENT_2082 = "上传的文件不能为空";
    //数据格式问题 2101-2010
    public static final String MSG_CODE_2101 = "2101";
    public static final String MSG_CONTENT_2101 = "金额格式错误";
	@Override
	protected void init() {
	}
    
    //其他相关模块以此往下添加,每个模块消息码数量为40个
    
    

}
