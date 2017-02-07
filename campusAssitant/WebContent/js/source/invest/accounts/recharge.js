define([ 'jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic' ], function($, common, validate, hf) {
	$("input[name='zzu_pay_way']").on('click', function() {
		var radioId = $(this).attr('id');
		$('#' + radioId + '_table').addClass('active').siblings().removeClass('active');
		$('#zzu_span_name').html($(this).attr('data-name'));
	});

	$('.zzu-ipt-text').on('keyup change', function() {
		var money = $(this).val();
		if (validate.checkMoney(money)) {
			$(".zzu-error-info").html('');
		} else {
			$(".zzu-error-info").html('充值金额大于0元，请输入正确的充值金额！')
		}
		$('#zzu_input_amount').html($(this).val());
	});

	/**
	 * 提交充值
	 */
	$('#zzu_recharge_ok').on('click', function() {
		var money = $('.zzu-ipt-text').val();
		if(!validate.isNotNull(money)){
			$(".zzu-error-info").html('充值金额不能为空，请输入正确的充值金额！');
			$('.zzu-ipt-text').focus();
			return;
		}
		if (validate.checkMoney(money)) {
			$(".zzu-error-info").html('');
			var param = {
				rechargeAmt: money
			}
			hf.callNetSave(param);
		} else {
			$(".zzu-error-info").html('充值金额大于0元，请输入正确的充值金额！');
			$('.zzu-ipt-text').focus();
		}
	});
});