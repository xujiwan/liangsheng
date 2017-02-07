define([ 'jquery', 'echars-common', 'common', 'util/validate', 'echarts','util/jquery.huifu', 'datepicker','datepickerCn','accountsPublic' ],
		function($, echarCommon, common, validate, echarts,hf,datepicker) {
			var today = new Date();
			
			/**
			 * 时间框改变事件
			 */
			var cDayFunc = function() {
				var thisId = $(this).attr('id');
				var beginDate,endDate;
				if (validate.isNotNull(thisId)) {
					if (thisId.indexOf('table') > 0) {
						if('zzu_begin_time_table' == thisId){
							beginDate =$(this).val();
							endDate = $('#zzu_end_time_table').val();
						}
						if('zzu_end_time_table' == thisId){
							beginDate = $('#zzu_begin_time_table').val();
							endDate =  $(this).val();
						}
						var datePoor = common.datePoor(beginDate, endDate);
						if (datePoor < 0) {
							common.showMessage('结束日期不能小于开始日期');
							return;
						}
						if(datePoor < 2){
							return;
						}
						if (datePoor > 11) {
							common.showMessage('报表只能统计3-12个月的数据');
							return;
						}
						$('#zzu_tabTwo').children('.active').removeClass('active');
						cashOrWithdrawal($('#zzu_cash_withdrawal').val(), null, beginDate, endDate);
					} else {
						if('zzu_begin_time' == thisId){
							beginDate = $(this).val();
							endDate = $('#zzu_end_time').val();
						}
						if('zzu_end_time' == thisId){
							beginDate = $('#zzu_begin_time').val();
							endDate =  $(this).val();
						}
						var datePoor = common.datePoor(beginDate, endDate);
						if (datePoor < 0) {
							common.showMessage('结束日期不能小于开始日期！');
							return;
						}
						if(datePoor < 2){
							return;
						}
						if (datePoor > 11) {
							common.showMessage('报表只能统计3-12个月的数据');
							return;
						}
						$('#zzu_tabOne').children('.active').removeClass('active');
						getInvestOrFinanc($('#zzu_invest_financ').val(), null, beginDate, endDate);
					}
				}
			};
			

			try {
				$('.zzu-date-control').datepicker({
					format: 'yyyy-mm',
					autoclose: true,
					weekStart: 1,
					startView: 1,
					minView: 1,
					maxView: 1,
					minViewMode: 1,
					forceParse: false,
					language: 'zh-CN',
					initialDate: today,
					endDate: today
				}).val(today.getFullYear()+'-'+(today.getMonth()+1)).on('change', cDayFunc);
			} catch (e) {
				console.log(e);
			}
			
			var putParam = function(type, time, beginDate, endDate) {
				var param = {};
				if (type) {
					param.type = type;
				}
				if (time) {
					param.time = time;
				}
				if (beginDate) {
					param.beginDate = beginDate;
				}
				if (endDate) {
					param.endDate = endDate;
				}
				return param;
			}
			/**
			 * 投融资信息
			 */
			var getInvestOrFinanc = function(type, time, beginDate, endDate) {
				$('#zzu_invest_financ').val(type);
				var investOrFinancSuc = function(data) {
					if (data) {
						if ('financ' == type) {
							echarCommon.createLine('zzu_main', data.keyList, data.valuelist, '融资总额', false, '');
							$('#zzu_invest').hide();
						} else {
							echarCommon.createLine('zzu_main', data.keyList, data.valuelist, '投资总额', false, '');
							common.putTemplete('zzu_invest_tem', data, 'zzu_invest');
							$('#zzu_invest').show();
						}
					}
				};
				var param = putParam(type, time, beginDate, endDate);
				common.ajaxUtil('graphical/reports.json', param, 'GET', investOrFinancSuc);
			};

			/**
			 * 充值取现
			 */
			var cashOrWithdrawal = function(type, time, beginDate, endDate) {
				$('#zzu_cash_withdrawal').val(type);
				var cashOrWithdrawalSuc = function(data) {
					if (data) {
						if ('cash' == type) {
							echarCommon.createLine('zzu_chartRecord', data.keyList, data.valuelist, '充值总额', false, '');
						} else {
							echarCommon.createLine('zzu_chartRecord', data.result.keyList, data.result.valuelist, '取现总额', false, '');
							// common.putTemplete('zzu_invest_tem',data,'zzu_invest');
						}
					}
				}
				var param = putParam(type, time, beginDate, endDate);
				common.ajaxUtil('graphical/reports.json', param, 'GET', cashOrWithdrawalSuc);
			}

			/**
			 * 时间点
			 */
			$('.zzu-filter > span').click(function() {
				$(this).addClass('active').siblings().removeClass('active');
				var data = $(this).attr('data-value');
				var type;
				if (data.indexOf('c') == 0) {
					data = data.substr(1);
					type = $('#zzu_cash_withdrawal').val();
					cashOrWithdrawal(type, data);
				} else {
					type = $('#zzu_invest_financ').val();
					getInvestOrFinanc(type, data);
				}
			});

			/**
			 * 类型
			 */
			$('.zzu-tab > .zzu-item').on('click', function() {
				$(this).addClass('active').siblings().removeClass('active');
				var data = $(this).attr('data');
				if ('invest' == data || 'financ' == data) {
					var time = $('#zzu_tabOne > span.active').attr('data-value');
					if(validate.isNotNull(time)){
						getInvestOrFinanc(data, time);
					}else{
						getInvestOrFinanc(data, null,$('#zzu_begin_time').val(),$('#zzu_end_time').val());
					}
				}
				if ('cash' == data || 'withdrawal' == data) {
					var time = $('#zzu_tabTwo > span.active').attr('data-value');
					if(validate.isNotNull(time)){
						time = time.substr(1);
						cashOrWithdrawal(data, time);
					}else{
						cashOrWithdrawal(data, null,$('#zzu_begin_time_table').val(),$('#zzu_end_time_table').val());
					}
				}
			});

			/**
			 * 余额
			 */
			var userInfoSuc = function(data) {
				var nikeName = data.zzu_USER_USER_NICKNAME;
				if(nikeName){
					common.setItemSession('nikeName', nikeName);
					$('.zzu-nike-name').html(nikeName);
				}
				if(data.zzu_LOGIN_TIME){
					$('.zzu-date').html(data.zzu_LOGIN_TIME);
				}
				if(data.available_assets){
					common.setItemSession('available_assets', data.available_assets);
					$('#zzu_useable_amount').html(data.available_assets);
				}
				if(data.frozen_assets){
					$('#zzu_freeze_amount').html(data.frozen_assets);
				}
				if(data.total_assets){
					$('#zzu_total_assets').html(data.total_assets);
				}
				if(data.total_revenue){
					$('#zzu_total_revenue').html(data.total_revenue);
				}
				if(data.invested_assets){
					$('#zzu_invested_assets').html(data.invested_assets);
				}
				if(data.debt_assets){
					$('#zzu_debt_assets').html(data.debt_assets);
				}
			};
			common.ajaxUtil('account/userAccount.json', null, 'GET', userInfoSuc);

			
			/**
			 * 开通支付账户
			 */
			common.ajaxUtil('n/checkUser/isRegisterHf.json', null, 'GET',function(data){
				if('1111' == data.code){
					$('#zzu_rernittance').hide();
				}else{
					$('#zzu_rernittance').show();
				}
			});
			$('#zzu_rernittance').on('click',function(){
				hf.callUserRegister(null);
			});
			
			getInvestOrFinanc('invest', '3', null, null);
			cashOrWithdrawal('cash', '3', null, null);
		});