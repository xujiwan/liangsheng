define([ 'jquery', 'common', 'util/validate' ], function($, common, validate) {
	//提交申请
	$('#zzu_apply_bottom').on('click',function(){
		var userTel = $('#zzu_user_tel').val();
		var userName = $('#zzu_user_name').val();
		var telCode = $('#zzu_iphone_code').val();
		if (!validate.isNotNull(userName)) {
			$('#zzu_error').empty().html('姓名不能为空');
			return;
		}
		if (!validate.isNotNull(userTel)) {
			$('#zzu_error').empty().html('手机号码不能为空');
			return;
		}
		if (!validate.isPhoneNumber(userTel)) {
			$('#zzu_error').empty().html('手机号码格式不正确');
			return;
		}
		if (!isDevEnv){
			if (!validate.isNotNull(telCode)) {
				$('#zzu_error').empty().html('手机号验证码不能为空');
				return;
			}
			var sms = common.getItemSession('zzu_get_code');
			if(!validate.isNotNull(sms)){
				$('#zzu_error').empty().html('手机号验证码已失效，请重新发送');
				return;
			}
		}
		var param = {
				tel: userTel,
				userName: userName,
				phoneCode: telCode
			};
		var borrowSuc = function(data){
			if ('1111' == data.code){
				$('#zzu_error').empty();
				common.showMessage('申请成功,工作人员会尽快与你联系');
			}else{
				$('#zzu_iphone_code').val('');
				$('#zzu_error').empty().html(data.message);
				return;
			}
		};
		common.ajaxUtil('/l/n/factApply/saveApply.json', param, 'POST', borrowSuc);
	});
	
	//发送短信验证码
	$('#zzu_get_code').on('click', function() {
		var userTel = $('#zzu_user_tel').val();
		if (!validate.isNotNull(userTel)) {
			$('#zzu_error').empty().html('手机号码不能为空');
			return;
		}
		common.sendValidateSMS(userTel,'zzu_get_code',null,'loan');
	});
});