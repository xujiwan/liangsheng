define(['jquery', 'common','util/validate','accountsPublic'], function($,common,validate) {
	var anchor = window.location.hash;
	var ruleId = '';
	var radios = document.forms[0].radio;
	var maxcash;
	if (anchor) {
		ruleId = anchor.substring(anchor.indexOf("#") + 1, anchor.lastIndexOf("#"));
		var param = {"ruleId" : ruleId};
		var success = function(data){
			var ruleType = parseInt(data.RULE_TYPE);
			var recommend;
			switch (ruleType) {
				case 1 :
					recommend = {
						bidPlan: [{
							deadline: '少于1个月',
							earnings: '9%-10%',
							repayment: '一次性还本付息',
							invest_rate : 9,
							invest_period_min : 0,
							invest_period_max : 0,
							repayment_way : 1,
							money: data.INVEST_AMT_MIN+'-'+data.INVEST_AMT_MAX,
							ranking : data.ranking,
							investment : data.TOTAL_INVEST,
							maximum : data.MOST_INVEST,
							rule_type : data.RULE_TYPE,
							totalInvest : data.TOTAL_INVEST,
							retenion_amount : data.RETENTION_AMOUNT
						}]
					};
				break;
				case 2 :
					recommend = {
						bidPlan: [{
							deadline: '1-3个月',
							earnings: '11%-12%',
							repayment: '等额本息',
							invest_rate : 11,
							invest_period_min : 1,
							invest_period_max : 3,
							repayment_way : 0,
							money: data.INVEST_AMT_MIN+'-'+data.INVEST_AMT_MAX,
							ranking : data.ranking,
							investment : data.TOTAL_INVEST,
							maximum : data.MOST_INVEST,
							rule_type : data.RULE_TYPE,
							totalInvest : data.TOTAL_INVEST,
							retenion_amount : data.RETENTION_AMOUNT
						}]
					};
				break;
				case 3 :
					recommend = {
						bidPlan: [{
							deadline: '4-6个月',
							earnings: '13%-14%',
							repayment: '等额本息',
							invest_rate : 13,
							invest_period_min : 4,
							invest_period_max : 6,
							repayment_way : 0,
							money: data.INVEST_AMT_MIN+'-'+data.INVEST_AMT_MAX,
							ranking : data.ranking,
							investment : data.TOTAL_INVEST,
							maximum : data.MOST_INVEST,
							rule_type : data.RULE_TYPE,
							totalInvest : data.TOTAL_INVEST,
							retenion_amount : data.RETENTION_AMOUNT
						}]
					};
				break;
				case 4 :
					recommend = {
						bidPlan: [{
							deadline: '7个月以上',
							earnings: '15%以上',
							repayment: '等额本息',
							invest_rate : 15,
							invest_period_min : 7,
							invest_period_max : 36,
							repayment_way : 0,
							money: data.INVEST_AMT_MIN+'-'+data.INVEST_AMT_MAX,
							ranking : data.ranking,
							investment : data.TOTAL_INVEST,
							maximum : data.MOST_INVEST,
							rule_type : data.RULE_TYPE,
							totalInvest : data.TOTAL_INVEST,
							retenion_amount : data.RETENTION_AMOUNT
						}]
					};
				break;
			}
			common.putTemplete("zzu_bid_plan_tem", recommend.bidPlan, "zzu_bid_plan");
			if(validate.isNotNull(data.INVEST_AMT_MIN)){
				var min = parseInt(common.rmoney(data.INVEST_AMT_MIN));
				$('#zzu_cashMin').val(min);
			}
			if(validate.isNotNull(data.INVEST_AMT_MAX)){
				var max = parseInt(common.rmoney(data.INVEST_AMT_MAX));
				$('#zzu_cashMax').val(max);
			}
			if(validate.isNotNull(data.MOST_INVEST)){
				if(data.MOST_INVEST != 0){
					document.getElementById("radio2").checked=true; 
					$(".zzu-input-text").show();
					var maxCash = parseInt(common.rmoney(data.MOST_INVEST));
					maxcash = maxCash;
					$('#most_invest').val(maxCash);
				}	
			}
			
			
		};
		common.ajaxUtil('autotender/getrule.json', param, 'GET', success);
		
		// 保存设置
		$('#zzu_save').click(function() {
			editRule(ruleId);
		});
	}
	/**
	 *编辑规则 
	 */
	/* $('#most_invest').click(function(){
	 	console.log(111);
		$("#radio1").attr("checked",false);
		$("#radio2").attr("checked",true);
	 })
	  $('#radio1').click(function(){
	 	console.log(222);
		$("#radio2").attr("checked",false);
	 })*/
	$('#radio1').click(function(){
		$(".zzu-input-text").hide();
	 })
	$('#radio2').click(function(){
		
		$(".zzu-input-text").show();
		$('#most_invest').val(maxcash);
	 })
	function editRule(ruleId) {
		var radios = document.forms[0].radio;
		var minInvest = $('#zzu_cashMin').val();
		var maxInvest = $('#zzu_cashMax').val();
		if(!validate.isNumber(minInvest)){
			$('.zzu-error-info').html('请正确输入最小金额');
			return;
		}
		if(!validate.isNotNull(minInvest)){
			$('.zzu-error-info').html('请输入最小金额');
			return;
		}
		if(minInvest < 50){
			$('.zzu-error-info').html('自动投标50元起投');
			return;
		}
		if(!validate.isNotNull(maxInvest)){
			$('.zzu-error-info').html('请输入最大金额');
			return;
		}
		if(!validate.isNumber(maxInvest)){
			$('.zzu-error-info').html('请正确输入最大金额');
			return;
		}
		if(parseFloat(minInvest) > parseFloat(maxInvest)){
			$('.zzu-error-info').html('最大金额不能小于最小金额');
			return;
			}
		
		for (var i = 0; i < radios.length; i++) {
			if (radios[0].checked == true){
				var success = function(data) {
				if ("1111" == data.code) {
					common.goUrl("accounts/auto_bid.html");
				}
				};
			}
			if (radios[1].checked == true){
				$('.zzu-error-info').html('');
				var maxmum = $('#most_invest').val();
					if(!validate.isNotNull(maxmum)){
						$('.zzu-error-limit-info').html('最多投资金额不能为空');
						return;
					}
					if(maxmum < 50){
						$('.zzu-error-limit-info').html('最多投资金额不少于50元');
						return;
					}
				var success = function(data) {
				if ("1111" == data.code) {
					common.goUrl("accounts/auto_bid.html");
				}
				};
			}
		}
		var param = {
				"investAmtMin" : minInvest,
				"investAmtMax" : maxInvest,
				"rate" : $('#invest_rate').val(),
				"investPeriodMin" : $('#invest_period_min').val(),
				"investPeriodMax" : $('#invest_period_max').val(),
				"repaymentWay" : $('#repayment_way').val(),
				"priority" : getPriority(),
				"mostInvest" : maxmum,
				"ruleId" : ruleId,
		};
		common.ajaxUtil('autotender/editrule.json', param, 'POST', success);
	}
	$('#radio1').click(function(){
		$('#most_invest').val('');
	})
	/*$('#radio2').click(function(){
		$('.zzu-input-text').show();
	})*/
	/**
	 *获取用户排名 
	 */
	function getPriority() {
		// 投资金额越大权值越重
		var priority = 0;
		var invest_amt = parseInt($('#zzu_cashMax').val() / 500);
		if (invest_amt == 0 || invest_amt == 1) { // 500元内
			priority += 2;
		} else if (invest_amt <= 8) { // 1000至4000元
			priority += invest_amt + 1;
		} else {
			priority = 20;
		}
		// 对投资收益率要求低的权值越重
		var invest_rate = $('#invest_rate').val();
		if (invest_rate > 10) { 
			priority += 5;
		} else if (invest_rate > 5) {
			priority += 15;
		} else {
			priority += 20;
		}
		// 期限越长权值越重
		var invest_period = parseInt($('#invest_period_max').val() / 6);
		switch (invest_period) {
			case 0: // 半年内
				priority += 3;
				break;
			case 1: // 半年
				priority += 6;
				break;
			case 2: // 1年
				priority += 9;
				break;
			case 3: // 1年半
				priority += 12;
				break;
			case 4: // 2年
				priority += 15;
				break;
			default:
				priority += 20;
				break;
		}
		// 还款方式分值
		var rway = "";
		$("input[name='repayment_way']:checkbox").each(function() {
			if ($(this).is(":checked")) {
				rway += $(this).val() + ",";
			}
		});
		if (rway.length > 0) {
			if (rway.length > 2) { // 支持多种
				priority += 20;
			} else {
				priority += 10;
			}
		}
		// 最低保留余额分值
		var retenion_amount = $('#retenion_amount').val();
		if (retenion_amount >= 5000) {
			priority += 10;
		} else if (retenion_amount >= 2000) {
			priority += 15;
		} else {
			priority += 20;
		}
		// 对投资总额取对数
		var totalInvest = parseFloat($('#totalInvest').val());
		if (totalInvest > 0) {
			priority += Math.log(totalInvest);
		} else {
			priority += 20;
		}
		return priority;
	}
	$('#zzu_return').on('click',function(){
		common.goUrl('accounts/auto_bid.html');
	});
	
	/**
	 * 关闭自动投标
	 */
	$('#zzu_close_bid').on('click',function(){
		var okFn = function(){
			var param = {
					"ruleId" : ruleId
			};
			var success = function(data) {
			var code = data.code;
			if (code == '1111') {
				common.goUrl('accounts/auto_bid.html');
			}
			};
			common.ajaxUtil('autotender/stop.json', param, 'POST', success);
		}
		var cancelFn = function(){
			return;
		}
		var message = '确定要关闭自动投标吗？';
		common.showMessage(message,'confirm',okFn, cancelFn) ;
	});
});