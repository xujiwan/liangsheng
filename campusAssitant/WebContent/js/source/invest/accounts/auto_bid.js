define(['jquery', 'common','util/validate','accountsPublic'], function($, common,validate) {
	
	$('.zzu-operate').click(function() {

		$('#zzu_text_emphasis').hide();
		$('#zzu_exphasis_textBox').show();
	});
	var success = function(data) {
		if (data) {
			var rules = [];
			$(data.rules).each(function(i,e) {
				if (i == 0) {
					var p = {
						deadline : '少于1个月',
						earnings : (9+i)+'%-'+(9+i+1)+'%',
						repayment : '一次性还本付息',
						money : e.INVEST_AMT_MIN+'-'+e.INVEST_AMT_MAX,
						ranking : e.ranking,
						investment : e.TOTAL_INVEST,
						maximum : e.MOST_INVEST,
						status : e.STATUS,
						ruleId : e.RULE_ID
					};
					rules.push(p);
				} else if (i == 3){
					var p = {
						deadline : '7个月以上',
						earnings : '15%以上',
						repayment : '等额本息',
						money : e.INVEST_AMT_MIN+'-'+e.INVEST_AMT_MAX,
						ranking : e.ranking,
						investment : e.TOTAL_INVEST,
						maximum : e.MOST_INVEST,
						status : e.STATUS,
						ruleId : e.RULE_ID
					};
					rules.push(p);
				} else {
					var p = {
						deadline : (i+(i-1)*3)+'-'+(i+1+(i-1)*3)+'个月',
						earnings : (9+i*2)+'%-'+(9+(i*2)+1)+'%',
						repayment : '等额本息',
						money : e.INVEST_AMT_MIN+'-'+e.INVEST_AMT_MAX,
						ranking : e.ranking,
						investment : e.TOTAL_INVEST,
						maximum : e.MOST_INVEST,
						status : e.STATUS,
						ruleId : e.RULE_ID
					};
					rules.push(p);
				}
			});
		}
		if(data.avail){
			$('#zzu_cash_current').html(data.avail);
		}
		if(data.retentionAmount){
			$('#zzu_text_emphasis').html(data.retentionAmount);
			$('#zzu_exphasis_textBox').val(data.retentionAmount);
		}
		if(data.investAchievement.total_investment){
			$('#zzu_cash_amount').html(data.investAchievement.total_investment);
		}
		if(data.investAchievement.total_profit){
			$('#zzu_cash_earn').html(data.investAchievement.total_profit);
		}
		if(data.investAchievement.invest_num){
			$('#zzu_cash_times').html(data.investAchievement.invest_num);
		}
		common.putTemplete("zzu_bid_plan_tem", rules, "zzu_bid_plan");
		
	};
	common.ajaxUtil('autotender/getrules.json', {}, 'GET', success);
	$('#zzu_exphasis_textBox').hide();
	$('.zzu-operate').click(function() {
		var btnText = $('.zzu-btn-text').attr('data-type');
		var isModify = false;
		if ('update' == btnText) {
			$('#zzu_text_emphasis').hide();
			$('#zzu_exphasis_textBox').show();
			$('.zzu-btn-text').html('保存').attr('data-type','save');
		} else {
			modifyRetentionAmount();
		}
		
	});
	
	/**
	 *修改最低保留余额 
	 */
	function modifyRetentionAmount() {
		var retentionAmount = $('#zzu_exphasis_textBox').val();
		if(!validate.checkMoney(retentionAmount) && retentionAmount < 0){
			$('.zzu-error-info').html('请输入合法金额');
			return;
		}
		$('.zzu-error-info').hide();
		var param = {
			"retentionAmount" : retentionAmount
		};
		var success = function(data) {
			if (data.code == '1111') {
				var amount = common.formatMoney(retentionAmount,2);
				$('#zzu_text_emphasis').show();
				$('#zzu_exphasis_textBox').hide();
				$('#zzu_text_emphasis').html(amount);
				$('.zzu-btn-text').html('修改').attr('data-type','update');
			}
		};
		common.ajaxUtil('autotender/updateremention.json', param, 'POST', success);
	};

	
});