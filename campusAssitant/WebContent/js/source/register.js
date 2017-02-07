define(['jquery', 'common', 'util/validate', 'config'], function($, common, validate) {

	String.prototype.getQueryString = function(name) {
		var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"),
			r;
		if (r = this.match(reg))
			return unescape(r[2]);
		return null;
	};
	var sId = location.search.getQueryString("recommend"); //通过表达式获得传递参数
	var regx = /^[0-9a-zA-Z]*$/g;
	if (sId != null && regx.test(sId) && sId.length > 5 && sId.length < 10) {
		$('#zzu_referrer_tel').val(sId);
		$("#zzu_referrer_tel").attr("readOnly", "readonly");
	};

	/**
	 * 图形验证码
	 */
	$('#zzu_captcha_btn,#zzu_captcha_img').on('click', function() {
		$("#zzu_captcha_img").attr("src", "/i/n/images/captcha.jpg?" + Math.random());
	});
	$('#zzu_captcha_btn').trigger("click");
	/**
	 * 手机号是否注册
	 */
	$('#zzu_user_tel').on('blur', function() {
		var userTel = $('#zzu_user_tel').val();
		if (!validate.isNotNull(userTel)) {
			$('#zzu_error').empty().html('手机号码不能为空');
			return;
		}
		if (!validate.isPhoneNumber(userTel)) {
			$('#zzu_error').empty().html('手机号码格式不正确');
			return;
		}
		var telCheck = function(data) {
			if ('1021' == data.code) {
				$('#zzu_error').empty().html(data.message);
				return;
			}
		}
		common.ajaxUtil('n/checkUser/isRegisterPlatform.json', {
			tel: userTel
		}, 'get', telCheck);
	});
	/**
	 * 提交注册
	 */
	$('#zzu_register_bottom').on('click', function() {
		var userTel = $('#zzu_user_tel').val();
		var userPass = $('#zzu_user_password').val();
		var referrerTel = $('#zzu_referrer_tel').val();
		var captcha, iphoneCode, introduction;

		if (!validate.isNotNull(userTel)) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('手机号码不能为空');
			return;
		}
		if (!validate.isPhoneNumber(userTel)) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('手机号码格式不正确');
			return;
		}
		if ('true' != validate.isPas(userPass)) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html(validate.isPas(userPass));
			return;
		}
		if (referrerTel != null && referrerTel.length > 6 && !validate.isPhoneNumber(referrerTel)) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('推荐人手机号格式不正确');
			return;
		}
		if (!isDevEnv) {
			var telData = common.getItemSession('registerUserTel');
			if (!validate.isNotNull(telData) && telData != userTel) {
				$('#zzu_error').empty().html('手机号验证码不正确');
				$('#zzu_captcha_btn').trigger("click");
				return;
			}
			captcha = $('#zzu_captcha').val();
			if (!validate.isNotNull(captcha)) {
				$('#zzu_error').empty().html('图形验证码不能为空');
				$('#zzu_captcha_btn').trigger("click");
				return;
			}
			iphoneCode = $.trim($("#zzu_iphone_code").val());
			if (!validate.isNotNull(iphoneCode)) {
				$('#zzu_captcha_btn').trigger("click");
				$('#zzu_error').empty().html('手机号验证码不能为空');
				return;
			}
			var sms = common.getItemSession('zzu_get_code');
			if (!validate.isNotNull(sms)) {
				$('#zzu_captcha_btn').trigger("click");
				$('#zzu_error').empty().html('手机号验证码已失效，请重新发送');
				return;
			}
		}
		var agree = $('#zzu_agree');
		if (agree && !agree.is(":checked")) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('用户需要同意平台使用协议');
			return;
		}
		$('#zzu_error').empty();
		var checkYh = $('#zzu_check_yh');
		if (checkYh && checkYh.is(":checked")) {
			introduction = '96688';
		}
		var param = {
			mobile: userTel,
			password: userPass,
			introduce: introduction,
			recommendCode: referrerTel,
			smscode: iphoneCode
			
		};
		var registerSuc = function(data) {
			if ('1111' == data.code) {
				common.removeItemSession('registerUserTel');
				common.goUrl('login.html');
			} else {
				$('#zzu_user_password').val('');
				$('#zzu_captcha_btn').trigger("click");
				common.showMessage(data.message);
			}
		}
		common.ajaxUtil('n/user/register.json', param, 'POST', registerSuc);
	});

	$('#zzu_get_code').on('click', function() {
		if (!isDevEnv) {
			var userTel = $('#zzu_user_tel').val();
			if (!validate.isPhoneNumber(userTel)) {
				$('#zzu_captcha_btn').trigger("click");
				$('#zzu_error').empty().html('手机号码格式不正确');
				return;
			}
			var captcha = $('#zzu_captcha').val();
			if (!validate.isNotNull(captcha)) {
				$('#zzu_error').empty().html('图形验证码不能为空');
				$('#zzu_captcha_btn').trigger("click");
				return;
			}
			var captchaCheck = function(data) {
				if ('1111' == data.code) {
					common.setItemSession('registerUserTel', userTel);
					common.sendValidateSMS(userTel, 'zzu_get_code', 'zzu_captcha_btn');
				} else {
					common.showMessage(data.message);
					$('#zzu_captcha_btn').trigger("click");
				}
			}
			common.ajaxUtil('n/captcha/check.json', {
				captcha: captcha
			}, 'POST', captchaCheck);
		}

	});

});