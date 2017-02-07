define([ 'jquery', 'common' ], function($, common) {
	var putProduct = function(param) {
		$("#loading_animation").show();
		common.putTemplete('zzu_loanlist_product', [], 'zzu_loanlist_products');
		if (param) {
			if (param.loan_type) {
				$(".zzu-loan-type").find('a').removeClass('active');
				$(".zzu-loan-type").find('a[data="t' + param.loan_type + '"]').addClass('active');
				if('00' == param.loan_type){
					param.loan_type = '';
				}
				$("#zzu_loan_type").val(param.loan_type);
			}
			if (param.time_limit) {
				$(".zzu-time-limit").find('a').removeClass('active');
				$(".zzu-time-limit").find('a[data="d' + param.time_limit + '"]').addClass('active');
				if('00' == param.time_limit){
					param.time_limit = '';
				}
				$("#zzu_time_limit").val(param.time_limit);
			}
			if (param.loan_statu) {
				$(".zzu-loan-statu").find('a').removeClass('active');
				$(".zzu-loan-statu").find('a[data="s' + param.loan_statu + '"]').addClass('active');
				if('00' == param.loan_statu){
					param.loan_statu = '';
				}
				$("#zzu_loan_statu").val(param.loan_statu);
			}
			if (param.loan_order) {
				$(".zzu-order").find('button').removeClass('active');
				$(".zzu-order").find('button[data="' + param.loan_order + '"]').addClass('active');
				if('00' == param.loan_order){
					param.loan_order = '';
				}
				$("#zzu_loan_order").val(param.loan_order);
			}
		}

		common.ajaxUtil('n/scattered/loanByCondition.json', param, 'GET', function(data) {
			$("#loading_animation").hide();
			common.putTemplete('zzu_loanlist_product', data, 'zzu_loanlist_products');
		});
	};
	// 进入页面时渲染选中
	var anchor = window.location.hash;
	if (anchor && anchor.indexOf('#zzu_') > -1) {
		var dataType = '00';
		switch (anchor) {
			case '#zzu_car':
				dataType = '0,1';
				break;
			case '#zzu_house':
				dataType = '1,0';
				break;
			case '#zzu_beauty':
				dataType = '3,0';
				break;
			case '#zzu_student':
				dataType = '4,0';
				break;
			case '#zzu_credit':
				dataType = '0,1';
				break;
		}
		putProduct({loan_type:dataType});
	}else{
		putProduct();
	}


	var params = {
		loan_type: $("#zzu_loan_type").val(),
		time_limit: $("#zzu_time_limit").val(),
		loan_statu: $("#zzu_loan_statu").val(),
		loan_order: $("#zzu_loan_order").val(),
		serach_input: $("#zzu_search_input").val()
	};

	$(".zzu-select-filter").find('a').on('click', function() {
		var valData = $(this).attr('data');
		if (valData) {
			if (valData.indexOf('t') === 0) {
				params.loan_type = valData.substr(1);
			}
			if (valData.indexOf('d') === 0) {
				params.time_limit = valData.substr(1);
			}
			if (valData.indexOf('s') === 0) {
				params.loan_statu = valData.substr(1);
			}
			putProduct(params);
		}
	});

	$(".zzu-order").find('button').on('click', function() {
		var valData = $(this).attr('data');
		if (valData) {
			params.loan_order = valData;
			putProduct(params);
		}
	});

	$("#zzu_search_button").on('click', function() {
		var search_input = $("#zzu_search_input").val();
		if (search_input) {
			params.serach_input = search_input;
			putProduct(params);
		}
	});
	
	/**
	 * 项目统计
	 */
	$('#zzu_total_amt').html('75,849.60');
	$('#zzu_invest_num').html('104,140');
	$('#zzu_loan_num').html('4,483');
	/*common.ajaxUtil('n/scattered/loanStatistic.json', null, 'GET', function(data) {
		if(data){
			var total = common.rmoney(data.TOTAL_AMT)/10000;
			$('#zzu_total_amt').html(common.formatMoney(total,2));
			$('#zzu_invest_num').html(data.INVEST_NUM);
			$('#zzu_loan_num').html(data.LOAN_NUM);
		}
	});*/
});