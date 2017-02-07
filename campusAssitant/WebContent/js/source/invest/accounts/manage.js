define([ 'jquery', 'common', 'util/validate','util/jquery.huifu', 'bs', 'accountsPublic','config' ], function($, common, validate,hf) {

	var webChart, tel;
	common.ajaxUtil('userinfo/getUserInfo.json', null, 'GET', function(data) {
		$('.zzu-panel-heading-one').css("background-color", "#ed272e").find("h3").css("color", "white");
		$('.zzu-panel-heading-one').find(".zzu-tag").hide();
		$('.zzu-panel-heading-one').attr('type', 'open');
		var nickName = data.zzu_USER_USER_NICKNAME;
		tel = data.zzu_USER_TEL;
		var mail = data.zzu_USER_EMAIL;
		webChart = data.zzu_USER_WECHAT;
		$('#zzu_old_name').html(nickName);
		$('#zzu_old_phone').html(tel.replace(tel.substr(3, 5), '*****'));
		$('#zzu_user_wechat').val(webChart).attr('disable', 'disable');
		if (validate.isNotNull(mail)) {
			$('#zzu_old_email').html(mail);
		} else {
			$('#zzu_old_email').html('您还没添加邮箱').siblings().addClass('zzu-hidden');
		}
	});

	$(".panel-heading").on('click', function() {
//		$('[type = open]').find(".zzu-tag").show();
		$(".panel-heading").css("background-color", "white");
		$(".panel-heading").find("h3").css("color", "black");
		$(this).css("background-color", "#ed272e");
		$(this).find("h3").css("color", "white");
		if ('open' == $(this).attr('type')) {
			$(this).find(".zzu-tag").show();
			$(this).removeAttr('type');
			return;
		} else {
//			$('[type = open]').siblings().removeClass('in');
//			$('[type = open]').removeAttr('type');
			$(this).find(".zzu-tag").hide();
			$(this).attr('type', 'open');
		}
	});

	var showError = function(id, message) {
		id = '#' + id;
		$(id).html(message);
		setTimeout(function() {
			$(id).empty()
		}, 3000);
	}

	/**
	 * 修改用户名
	 */
	$('#zzu_update_name').on('click', function() {
		var userName = $('#zzu_user_name').val();
		if (validate.isNotNull(userName)) {
			var param = {
				userNick: userName
			};
			var success = function(data) {
				if ('1111' == data.code) {
					$("#zzu_old_name").html(userName);
					$('#zzu_user_name').val('');
					common.setItemSession('nikeName',userName);
					showError('zzu_user_err', '修改成功');
				}
				if ('0000' == data.code) {
					$('#zzu_user_name').focus();
					showError('zzu_user_err', '修改失败');
				}
			};
			common.ajaxUtil('userinfo/modifyUserName.json', param, 'POST', success);
		}
	});

	/**
	 * 修改密码
	 */
	$('#zzu_update_pass').on('click', function() {
		var oldPass = $('#zzu_old_pass').val();
		var newPass = $('#zzu_new_pass').val();
		var newPassTwo = $('#zzu_new_pass_two').val();
		if ('true' == validate.isPas(oldPass)) {
			if (oldPass == newPass) {
				showError('zzu_pass_err', '新密码不能和原密码相同！');
				$('#zzu_new_pass,#zzu_new_pass_two').val('');
				$('#zzu_new_pass').focus();
				return;
			}
			if ('true' == validate.isPas(newPass)) {
				if (newPass === newPassTwo) {
					var success = function(data) {
						$('#zzu_old_pass,#zzu_new_pass,#zzu_new_pass_two').val('');
						if ('1111' == data.code) {
							showError('zzu_pass_err', '修改成功');
						} else {
							showError('zzu_pass_err', data.message);
						}
					}
					common.ajaxUtil('userinfo/updatePassword.json', {
						oldPwd: oldPass,
						newPwd: newPass
					}, 'POST', success);
				} else {
					$('#zzu_new_pass,#zzu_new_pass_two').val('')
					$('#zzu_new_pass').focus();
					showError('zzu_pass_err', '两次输入的新密码不同！');
				}
			} else {
				$('#zzu_new_pass').val('').focus();
				showError('zzu_pass_err', validate.isPas(newPass));
			}
		} else {
			$('#zzu_old_pass').val('').focus();
			showError('zzu_pass_err', validate.isPas(oldPass));
		}
	});

	/**
	 * 修改手机号
	 */
	$("#zzu_update_phone").on('click', function() {
		var oldPhone = $('#zzu_old_phone_input').val();
		var newPhone = $('#zzu_new_phone').val();
		var graphCode = $('#zzu_graph_code').val();
		var phoneCode = $('#zzu_phone_code').val();
		if (!validate.isPhoneNumber(oldPhone)) {
			$('#zzu_old_phone_input').val('').focus();
			showError('zzu_phone_err', '请正确填写您注册时用的手机号码');
			return;
		}
		if (newPhone == oldPhone) {
			$('#zzu_new_phone').val('').focus();
			showError('zzu_phone_err', '新手机号码不能和原手机号相同');
			return;
		}
		if (!validate.isPhoneNumber(newPhone)) {
			$('#zzu_new_phone').val('').focus();
			showError('zzu_phone_err', '新手机号码格式不正确');
			return;
		}
		if (!isDevEnv){
			var telData = common.getItemSession('manageNewPhone');
			if(!validate.isNotNull(telData) && telData != newPhone){
				$('#zzu_error').empty().html('新手机号和接收短信验证码手机号不同');
				$('#zzu_captcha_btn').trigger("click");
				return;
			}
			if (!validate.isNotNull(graphCode)) {
				$('#zzu_graph_code').val('').focus();
				$('#zzu_captcha_btn').trigger("click");
				showError('zzu_phone_err', '图形验证码不能为空！');
				return;
			}
			if (!validate.isNotNull(phoneCode)) {
				$('#zzu_phone_code').val('').focus();
				showError('zzu_phone_err', '手机验证码不能为空！');
				return;
			}
			var sms = common.getItemSession('zzu_get_code_manage');
			if(!validate.isNotNull(sms)){
				$('#zzu_captcha_btn').trigger("click");
				$('#zzu_phone_err').empty().html('手机号验证码已失效，请重新发送');
				return;
			}
		}
		var param = {
			tel: newPhone,
			sms:phoneCode
		}
		var success = function(data) {
			if ('1111' == data.code) {
				common.removeItemSession('manageNewPhone');
				$('#zzu_old_phone_input').val('').siblings().val('');
				$('#zzu_old_phone').html(newPhone.replace(newPhone.substr(3, 5), '*****'));
				showError('zzu_phone_err', '修改成功');
			} else {
				showError('zzu_phone_err', data.message);
				if('1011' == data.code){
					$('#zzu_phone_code').val('').focus();
				}
			}
		}
		common.ajaxUtil('userinfo/modifyMobile.json', param, 'POST', success);
	});
	/**
	 * 图形验证码
	 */
	$('#zzu_captcha_img,#zzu_captcha_img').on('click', function() {
		$("#zzu_captcha_img").attr("src", "/i/n/images/captcha.jpg?" + Math.random());
	});
	$('#zzu_captcha_img').trigger("click");
	/**
	 * 手机验证码
	 */
	$('#zzu_get_code_manage').on('click', function() {
		if (!isDevEnv) {
			var oldPhone = $('#zzu_old_phone_input').val();
			if (!validate.isPhoneNumber(oldPhone)) {
				$('#zzu_old_phone_input').val('').focus();
				showError('zzu_phone_err', '请正确填写您注册时用的手机号码');
				return;
			}
			var newPhone =  $('#zzu_new_phone').val();
			if (!validate.isPhoneNumber(newPhone)) {
				$('#zzu_new_phone').val('').focus();
				showError('zzu_phone_err', '新手机号码格式不正确');
				return;
			}
			if (newPhone == oldPhone) {
				$('#zzu_new_phone').val('').focus();
				showError('zzu_phone_err', '新手机号码不能和原手机号相同');
				return;
			}
			var captcha = $('#zzu_graph_code').val();
			if (!validate.isNotNull(captcha)) {
				$('#zzu_graph_code').val('').focus();
				showError('zzu_phone_err', '图形验证码不能为空！');
				$('#zzu_captcha_img').trigger("click");
				return;
			}
			
			var captchaCheck = function(data) {
				if ('1111' == data.code) {
					common.setItemSession('manageNewPhone',newPhone);
					common.sendValidateSMS(newPhone, 'zzu_get_code_manage', 'zzu_captcha_img');
				} else {
					common.showMessage(data.message);
					$('#zzu_captcha_img').trigger("click");
				}
			}
			common.ajaxUtil('n/captcha/check.json', {
				captcha: captcha,
			}, 'POST', captchaCheck);

		}
	});
	/**
	 * 修改邮箱
	 */
	$("#zzu_update_email").on('click', function() {
		var oldEmail = $("#zzu_old_email").html();
		var newEmail = $("#zzu_new_email").val();
		if (validate.isEmail(newEmail)) {
			showError('zzu_email_err', '验证邮箱可以用来找回密码, 并能享受其他定制服务');
			if (validate.isEmail(oldEmail) && oldEmail === newEmail) {
				showError('zzu_email_err', '新邮箱和已绑定的邮箱相同');
			} else {
				var param = {
					mail: newEmail
				}
				var success = function(data) {
					$('#zzu_old_email').html(newEmail).siblings().removeClass('zzu-hidden');
					;
					if ('1111' == data.code) {
						$('#zzu_old_email').html(newEmail);
						showError('zzu_email_err', '修改成功');
					} else {
						showError('zzu_email_err', data.message);
					}
				}
				common.ajaxUtil('userinfo/modifyMail.json', param, 'POST', success);
			}
		} else {
			showError('zzu_email_err', '邮箱格式不正确');
		}
	});

	/**
	 * 填写微信号
	 */
	$("#zzu_update_wechat").on('click', function() {
		if (validate.isNotNull(webChart)) {
			showError('zzu_wechat_err', '您已经关联过微信号了');
			return;
		}
		var wechat = $("#zzu_user_wechat").val();
		if ('true' == validate.isWeChat(wechat)) {
			var succ = function(data) {
				if ('1111' == data.code) {
					$("#zzu_user_wechat").attr('disable', 'true');
					showError('zzu_wechat_err', '修改成功');
				} else {
					showError('zzu_wechat_err', data.message);
				}
			}
			common.ajaxUtil('userinfo/updateWeChat.json', {
				WebChartId: wechat
			}, 'POST', succ);
		}
	});
	
	/**
	 * 支付账号
	 */
	$('#zzu_hf_acct').on('click',function(){
		var el = document.createElement("a");
		document.body.appendChild(el);
		el.href = SslUrl+'/hf_public.html#zzu_hf_AcctModify'; //url 是你得到的连接
		el.target = '_blank'; //指定在新标签页打开
		el.click();
		document.body.removeChild(el);
	});
});