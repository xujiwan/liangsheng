define([ 'jquery', 'common', 'util/validate','util/jquery.huifu' ], function($, common, validate,hf) {
	var rate, days, loadId, isLogin;// 标的利率,标的期限,标的Id,是否登录
	var anchor = window.location.hash;
	if (anchor) {
		loadId = anchor.substring(anchor.indexOf("#") + 1, anchor.lastIndexOf("#"));
	}
	
	var detailSuc = function(data) {
		if (data) {
			if(!validate.isNotNull(loadId)){
				loadId = data.experienceLoan.LOAD_ID;
				/**
				 * 还款计划
				 */
				repayPlan();

				/**
				 * 投标记录
				 */
				loanHistory();
			}
			rate = data.experienceLoan.RATE;
			days = data.experienceLoan.PAYMENT_TIMES;
			/**
			 * 标详情
			 */
			common.putTemplete('zzu_detail_info_tem', data.experienceLoan, 'zzu_detail_info');
		}
	};
	
	
	
	common.ajaxUtil('n/experience/loandetail.json', {
		loadId: loadId
	}, 'GET', detailSuc);

	/**
	 * 还款计划
	 */
	var repayPlan = function(){
		common.ajaxUtil('n/loan/repayplan.json', {
			loadId: loadId
		}, 'GET', function(data) {
			if (data) {
				common.putTemplete('zzu_striped_tem', data, 'zzu_triped_info');
			}
		});
	}

	/**
	 * 投标记录
	 */
	var loanHistory = function(){
		common.ajaxUtil('n/loan/loanhistory.json', {
			loadId: loadId
		}, 'GET', function(data) {
			common.putTemplete('zzu_records_tem', data.loanHistoryList, 'zzu_records_info');
			$('#zzu_total_num').html(data.totalNum);
			$('#zzu_total_amt').html(data.totalAmt + '.00');
		});
	}
	
	/**
	 * 如果传入的有标的id
	 */
	if(validate.isNotNull(loadId)){
		repayPlan();
		loanHistory();
	}
	
	/**
	 * 选中体验金
	 */
	var ticketSelected = function(){
		if($('#zzu_experience_id').val() == $(this).attr('data')){
			$(this).css('background-color','#ff665a');
			$('#zzu_experience_id').val('');
			$('#zzu_experience_amt').val('');
		}else{
			$('#zzu_experience_id').val($(this).attr('data'));
			$('#zzu_experience_amt').val($(this).attr('data-amount'));
			$(this).siblings().css('background-color','#ff665a');
			$(this).css('background-color','#f2a5a8');
		}
	}

	/**
	 * 用户体验金
	 */
	var param = new Array();//存放体验金的集合
	var item;//遍历了第几个
	var putExperience = function(){//放体验金
		var cash = new Array();
		if(item > param.length){
			item = param.length;
		}
		if(item < 2){
			item = 2;
		}
		for(var i = (item-2); i<item; i++){
			cash.push(param[i]);
		}
		if(cash.length > 0){
			common.putTemplete('zzu_cash_ticket', cash, 'zzu_cash_ticketBox');
			$('.zzu-cash-ticketOne').on('click', ticketSelected);
		}
	}
	common.ajaxUtil('n/activity/allExperienceGold.json', {use_status:0}, 'GET', function(data) {
		param = data;
		item = 2;
		putExperience();
	},function(data){});
	
	/**
	 * 现金券上一页
	 */
	$('#zzu_prev').on('click',function(){
		if(item <= 2){
			return;
		}else{
			item--;
			putExperience();
		}
		
	});
	/**
	 * 现金券下一页
	 */
	$('#zzu_next').on('click',function(){
		item++;
		putExperience();
	});

	/**
	 * 单击投标
	 */
	$('#zzu_btn_invest').on('click', function(data) {
		common.ajaxUtil('n/checkUser/isLoginAndRegisterHf.json', null, 'GET', function(data) {
			if('1005' == data.code){
				common.goUrl('login.html');
			}
			if('1046' == data.code){
				common.showMessage(data.message,'info',function(){
					hf.callUserRegister(null);
				});
			}
			if('1111' == data.code){
				if (!validate.isNotNull($('#zzu_experience_amt').val())) {
					common.showMessage('无可用的体验金，或者未单击选中体验金');
					return;
				}
				var param = {
					ruleId: $('#zzu_experience_id').val(),
					rate: rate,
					days: days,
					loanId: loadId,
					amount: $('#zzu_experience_amt').val()
				};
				common.ajaxUtil('n/activity/exprienceinvest.json', param, 'POST', function(data) {
					if ('1111' == data.code) {
						common.goUrl('accounts/experience_money.html');
					} else {
						common.showMessage(data.message);
					}
				});
			}
		});
	});

});