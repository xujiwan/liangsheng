define(['jquery', 'common', 'util/validate'], function($, common, validate) {
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
		$("#zzu_captcha_img").attr("src", "/campusAssitant/i/n/images/captcha.jpg?" + Math.random());
	});
	$('#zzu_captcha_btn').trigger("click");
	
	function refreshVCode() {
		$('#v_code_img').attr('src', 'validate/code?' + getUniqueCode());
	}

	$('#v_code_img').click(function() {
		refreshVCode();
	});
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
		}, 'GET', telCheck);
	});
	/**
	 * 提交注册
	 */
	$('#zzu_register_botton').on('click', function() {
		var userTel = $('#zzu_user_tel').val();
		var userPass = $('#zzu_user_password').val();
		var referrerTel = $('#zzu_referrer_tel').val();
		var captcha = $('#zzu_captcha').val();

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
		if (!validate.isNotNull(referrerTel)) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('学号不能为空');
			return;
		}
		if (referrerTel != null && referrerTel.length != 11) {
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('学号格式不正确');
			return;
		}
		if (!validate.isNotNull(captcha)) {
			$('#zzu_error').empty().html('图形验证码不能为空');
			$('#zzu_captcha_btn').trigger("click");
			return;
		}
		$('#zzu_error').empty();
		var param = {
			mobile: userTel,
			password: userPass,
			student_num: referrerTel,
			captcha: captcha
			
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

/*	$('#zzu_get_code').on('click', function() {
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

	});*/

});