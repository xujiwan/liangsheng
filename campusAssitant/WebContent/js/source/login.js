define([ 'jquery', 'common', 'util/validate' ], function($, common, validate) {
	/**
	 * 提交登录
	 */
	var submitLogin = function() {
		var userTel = $('#zzu_user_tel').val();
		var userPass = $('#zzu_user_password').val();
		var captcha = $('#zzu_captcha').val();
		if (!validate.isPhoneNumber(userTel) && !validate.isLetter(userTel)) {
			$('#zzu_user_tel').val('').focus();
			$('#zzu_error').empty().html('手机号码格式不正确');
			return;
		}
		if ('true' != validate.isPas(userPass)) {
			$('#zzu_user_password').val('').focus();
			$('#zzu_error').html(validate.isPas(userPass));
			return;
		}
		if (!validate.isNotNull(captcha)) {
			$('#zzu_captcha').focus();
			$('#zzu_captcha_btn').trigger("click");
			$('#zzu_error').empty().html('图形验证码不能为空');
			return;
		}
		$('#zzu_error').empty();
		$(this).html('登录中……').unbind('click');
		var param = {
			tel: userTel,
			pwd: userPass,
			captcha: captcha
		};
		var success = function(data) {
			if ('1111' == data.code) {
				var map = data.map;
				common.setItemSession('hfCode', map.hfCode);
				common.setItemSession('sessionId', map.sessionId);
				common.setItemSession('recommend', map.recommend);
				common.goUrl('accounts/account_index.html');
			} else {
				$('#zzu_error').html(data.message);
				$('#zzu_user_password').val('').focus();
				$('#zzu_captcha').val('');
				$('#zzu_login_botton').html('立即登录').bind('click', submitLogin);
				$('#zzu_captcha_btn').trigger("click");
			}
		};
		common.ajaxUtil('n/user/authen.json', param, 'POST', success);
	}
	$('#zzu_login_botton').on('click', submitLogin);

	$('#zzu_captcha_btn,#zzu_captcha_img').on('click', function() {
		$("#zzu_captcha_img").attr("src", "/i/n/images/captcha.jpg?" + Math.random());
	}).trigger("click");

	$('body').on('keydown', function(e) {
		if ('13' == e.keyCode) {
			$('#zzu_login_botton').trigger("click");
		}
	});
});
