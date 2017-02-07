/**
 * 汇付交互组件
 * 
 * @param $
 */
define(['jquery','common'], function($,common) {
	var HFURL = SslUrl + "/i/hf/process/";
	var HFFORM_TAG = "__hf_Form";
	var _uniqueTag = 0;
	function getUniqueCode() {
		if (_uniqueTag == 99) {
			_uniqueTag = 0;
		} else {
			_uniqueTag++;
		}
		var code = new Date().getTime();
		code += _uniqueTag;
		return code;
	}
	var hf = new Object();
	/**
	 * 获取请求报文，以表单形式提交给汇付
	 * 
	 * @param cmdId
	 *            指令
	 * @param requestParams
	 */
	function xhrProcess(cmdId, requestParams) {
		common.ajaxUtil('n/checkUser/isLoginAndRegisterHf.json', null, 'GET',function(data){
			if('1005' == data.code){
				common.goUrl('login.html');
			}
			if('1111' == data.code || ('1046' == data.code && 'UserRegister' == cmdId)){
				var params = requestParams || {};
				var url = HFURL + cmdId + '.json?resid=' + getUniqueCode();
				$.post(url, params, function(data) {
					if (data) {
						var form = $("<form/>").attr({
							"id": HFFORM_TAG,
							"method": "post",
							"action": HFINTER_URL,
							"target": '_self'
						}).appendTo("body");
						for ( var key in data) {
							$("<input/>").attr({
								"name": key,
								"type": "hidden",
								"value": data[key]
							}).appendTo(form);
						}
						form.submit();
					}
				});
			}
			if('1046' == data.code && 'UserRegister' != cmdId){
				common.showMessage('您暂时还没开通支付账户，单击确定开通支付账户','confirm',function(){
					xhrProcess("UserRegister",null);
				});
			}
		});
	}
	;

	/**
	 * 用户注册
	 * 
	 * @param params
	 */
	hf.callUserRegister = function(params) {
		xhrProcess("UserRegister", params);
	}

	/**
	 * 用户绑卡
	 * 
	 * @param params
	 */
	hf.callBindCard = function(params) {
		xhrProcess("UserBindCard", params);
	}

	/**
	 * 用户充值
	 * 
	 * @param params
	 */
	hf.callNetSave = function(params) {
		xhrProcess("NetSave", params);
	}

	/**
	 * 提现
	 * 
	 * @param params
	 */
	hf.callCash = function(params) {
		xhrProcess("Cash", params);
	}

	/**
	 * 主动投标
	 * 
	 * @param params
	 */
	hf.callInitiativeTender = function(params) {
		xhrProcess("InitiativeTender", params);
	}

	/**
	 * 债权转让
	 * 
	 * @param params
	 */
	hf.callCreditAssign = function(params) {
		xhrProcess("CreditAssign", params);
	}

	/**
	 * 查询账户明细
	 * 
	 * @param params
	 */
	hf.callQueryAcctDetails = function(params) {
		xhrProcess("QueryAcctDetails", params);
	}

	/**
	 * 撤销主动投标
	 * 
	 * @param params
	 */
	hf.callTenderCancel = function(params) {
		xhrProcess("TenderCancle", params);
	}

	/**
	 * 修改账户信息
	 * 
	 * @param {Object}
	 *            params
	 */
	hf.callAcctModify = function(params) {
		xhrProcess("AcctModify", params);
	}

	/**
	 * 自动投标
	 */
	hf.callAutoTenderPlan = function(params) {
		xhrProcess("AutoTenderPlan", params);
	}
	return hf;
});
