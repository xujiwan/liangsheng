define(['jquery', 'common'], function($, common) {

	var validForm = function(calc_je, calc_nhlv, calc_qs) {
		var flag = true;
		if (!calc_je || $.trim(calc_je) === "") {
			$("#zzu_error").html("请填写金额");
			flag = false;
			$("#zzu_calc_je").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_je").removeClass("zzu-error-input");
		}
		if (!calc_nhlv || $.trim(calc_nhlv) === "") {
			$("#zzu_error").html("请填写利率");
			flag = false;
			$("#zzu_calc_nhlv").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_nhlv").removeClass("zzu-error-input");
		}
		if (!calc_qs || $.trim(calc_qs) === "") {
			$("#zzu_error").html("请填写期数");
			flag = false;
			$("#zzu_calc_qs").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_qs").removeClass("zzu-error-input");
		}
		var floatRegx = /^\d+\.?\d{0,2}$/;
		if (isNaN(calc_je) || !floatRegx.test(calc_je) || parseFloat(calc_je) <= 0) {
			$("#zzu_error").html("金额必须大于０并且只有２位小数");
			flag = false;
			$("#zzu_calc_je").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_je").removeClass("zzu-error-input");
		}
		if (isNaN(calc_nhlv) || !floatRegx.test(calc_nhlv) || parseFloat(calc_nhlv) <= 0) {
			$("#zzu_error").html("利率必须大于0并只能有两位小数");
			flag = false;
			$("#zzu_calc_nhlv").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_nhlv").removeClass("zzu-error-input");
		}
		var intRegx = /^\d{1,3}$/;
		if (isNaN(calc_qs) || !intRegx.test(calc_qs)) {
			$("#zzu_error").html("期数必须是1-999正整数");
			flag = false;
			$("#zzu_calc_qs").addClass("zzu-error-input");
			return flag;
		}else{
			$("#zzu_calc_qs").removeClass("zzu-error-input");
		}
		$("#zzu_error").html("");
		return flag;
	}

	var calcStar = function() {
		var calc_je = $("#zzu_calc_je").val();
		var calc_nhlv = $("#zzu_calc_nhlv").val();
		var calc_qs = $("#zzu_calc_qs").val();
		$("#zzu_calc_je,#zzu_calc_nhlv,#zzu_calc_qs").bind("blur", function() {
			validForm($("#zzu_calc_je").val(), $("#zzu_calc_nhlv").val(), $("#zzu_calc_qs").val());
		});
		if (!validForm(calc_je, calc_nhlv, calc_qs)) {
			return;
		}
		// 清除表格数据
		$("#zzu_calc_table tr[id=zzu_calc_result]:visible").remove();
		// 月利率
		var month_lv = new Number(calc_nhlv / 100 / 12);
		// 总本金，本期本金，利息，本息和
		var calc_je = new Number(calc_je).toFixed(2);
		var capital = 0;
		var interest = 0;
		var sum = 0;
		var P = calc_je * month_lv * Math.pow(1 + month_lv, calc_qs) / (Math.pow(1 + month_lv, calc_qs) - 1);
		var surplus = calc_je;
		var resultArr = new Array(parseInt(calc_qs));
		var totalInterest = 0;
		for (var i = 0; i < resultArr.length; i++) {
			surplus = surplus - capital;
			interest = surplus * month_lv;
			capital = P - interest;
			var result = {};
			result.index = i+1;
			result.surplus = common.retainTwoDecimal(surplus);
			result.capital = common.retainTwoDecimal(capital);
			result.interest = common.retainTwoDecimal(interest);
			result.sum = common.retainTwoDecimal(P);
			resultArr[i] = result;
			totalInterest += parseFloat(result.interest);
		}
		common.putTemplete("zzu_calculator_stage",resultArr,"zzu_calculator_tbody");
		
		$('#zzu_calc_investment_amount').empty().html(calc_je);
		$('#zzu_calc_interest').empty().html(
			common.retainTwoDecimal(totalInterest));
		$('#zzu_calc_monthly_sum').empty().html(common.retainTwoDecimal(P));
		$('#zzu_calc_months').empty().html(calc_qs);
	}

	$("#zzu_calc_star").on('click', calcStar);


});