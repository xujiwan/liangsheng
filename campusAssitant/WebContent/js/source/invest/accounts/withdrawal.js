define([ 'jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic'], function($, common, validate, hf) {
	var assets = common.getItemSession('available_assets');
	if (validate.isNotNull(assets)) {
		$('#zzu_remaining_sum').html(assets);
	}else{
		assets = '0.00';
	}

	$("#zzu_withdrawal_ok").on('click', function() {
		var money = $('.zzu-ipt-text').val();
		if (!validate.checkMoney(money) || money <= 0) {
			$(".zzu-error-info").html('请输入正确的取现金额');
			return;
		}
		var reAssets = parseFloat(common.rmoney(assets));
		var pfMoney = parseFloat(money);
		if(pfMoney > reAssets){
			$(".zzu-error-info").html('余额不足');
			return;
		}
		if (!isDevEnv) {
			var smscode = $('#zzu_sms_code_withdrawal').val();
			if (!validate.isNotNull(smscode)) {
				$(".zzu-error-info").html('短信验证码不能为空');
				return;
			}
			var sms = common.getItemSession('zzu_get_code');
			if(!validate.isNotNull(sms)){
				$('#zzu_captcha_btn').trigger("click");
				$('#zzu_error').empty().html('手机号验证码已失效，请重新发送');
				return;
			}
			common.ajaxUtil('n/sms/verify.json', {
				smscode: smscode
			}, 'POST', function(data) {
				if ('1111' == data.code) {
					withdrawMoney(money);
				}
			});
			return;
		}
		
		withdrawMoney(money);
	});

	var withdrawMoney = function(money) {
		common.ajaxUtil('bankcards/bankCardList.json', null, 'GET', function(data) {
			if(validate.isNotNull(data)){
				var param = {
					TransAmt: money
				}
				hf.callCash(param);
			}else{
				common.showMessage('您暂时还没绑定银行卡，单击确定立即绑卡','confirm',function(){
					hf.callBindCard(null);
				});
			}
		});
	}

	/**
	 * 图形验证码
	 */
	$('#zzu_captcha_img').on('click', function() {
		$("#zzu_captcha_img").attr("src", "/i/n/images/captcha.jpg?" + Math.random());
	});
	$('#zzu_captcha_img').trigger("click");

	$('#zzu_get_code').on('click', function() {
		if (!isDevEnv) {
			var captcha = $('#zzu_captcha').val();
			if (!validate.isNotNull(captcha)) {
				$('#zzu_error').empty().html('图形验证码不能为空！');
				$('#zzu_captcha_btn').trigger("click");
				return;
			} else {
				var captchaCheck = function(data) {
					if ('1111' == data.code) {
						common.sendValidateSMS(null, 'zzu_get_code', 'zzu_captcha_img');
					} else {
						common.showMessage(data.message);
						$('#zzu_captcha_btn').trigger("click");
					}
				}
				common.ajaxUtil('n/captcha/check.json', {
					captcha: captcha
				}, 'POST', captchaCheck);
			}

		}
	});
});