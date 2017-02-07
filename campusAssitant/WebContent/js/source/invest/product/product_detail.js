define(['jquery', 'common','page','util/jquery.huifu','scrollbar'], function($, common,page,hf) {
	var remainMoney;//剩余可投金额
	var sum;//总额
	var payment_uses;//借款类型
	var total_interest;//总收益
	var anchor = window.location.hash;
	var loadId;
	var avlBal;//可用余额
	if (anchor) {
		loadId = anchor.substring(anchor.indexOf("#") + 1, anchor.lastIndexOf("#"));
		
		/**
		 * 显示现金券
		 */
		var param = new Array();//存放现金券的集合
		var item;//遍历了第几个
		var putCash = function(){
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
				$('#zzu_cash_coupon_info').show();
				common.putTemplete("zzu_cash_ticket", cash, "zzu_cash_ticketBox");
				$('.zzu-cash-ticketOne').on('click',useCash);
			}else{
				$('#zzu_cash_coupon_info').hide();
			}
		};
		/**
		 * 放现金券
		 */
		$('#zzu_cash_coupon_info').hide();
		var appendCaseCoupon = function(coupon){
			if(coupon && coupon.length > 0){
				param.length = 0;
				var money = $('.zzu-number-text').val();
				$.each(coupon, function(i, item){
					if(item.AMOUNT == 5 && money >= 1000){
						param.push(item)
					}
					if(item.AMOUNT == 10 && money >= 2000){
						param.push(item)
					}
					if(item.AMOUNT == 25 && money >= 5000){
						param.push(item)
					}
					if(item.AMOUNT == 50 && money >= 10000){
						param.push(item)
					}
				});
				if(param.length > 0){
					item = 2;
					putCash();
				}
			}
		};
		

		/**
		 * 现金券
		 */
		var getCoupon = function(money){
			if(payment_uses === '1' || payment_uses === 1){
				return;
			}
			var coupon = $('body').data('available_case_value_array');
			if(coupon){
				appendCaseCoupon(coupon);
			}else{
				common.ajaxUtil('n/cashCoupon/getcoupon.json', null, 'GET', function(data){
					$('body').data('available_case_value_array',data);
					appendCaseCoupon(data);
				});
			}
		};
		
		/**
		 * 验证金额
		 */
		var chkInvestmentAmount = function(elementjQuery,type) {
			$('#zzu_error').empty();
			var investmentAmount = elementjQuery.val();
			if (investmentAmount) {
				if (/^[1-9]{1}\d*$/g.test(investmentAmount)) {
					var canInvestAmount = parseFloat(common.rmoney(remainMoney));
					investmentAmount = parseFloat(investmentAmount);
					if (investmentAmount > canInvestAmount) {
						$('#investment_revenue').addClass('zzu-hidden');
						$('#zzu_error').empty().html('投资金额不能大于剩余可投金额');
						return false;
					} else {
						$('#zzu_text_emphasis').empty().html(
							common.formatMoney('' + (investmentAmount /common.rmoney(sum)) * total_interest));
						$('#investment_revenue').removeClass('zzu-hidden');
					}
					if(investmentAmount >= 1000 && 'callInitiat' != type){
						getCoupon(investmentAmount)
					}
					if(investmentAmount <= 1000){
						$('#zzu_cash_coupon_info').hide();
						$('#zzu_cash_id').val('');
						$('#zzu_cash_amt').val('');
					}
					return true;
				}
			} else {
				$('#investment_revenue').addClass('zzu-hidden');
			}
		};

		var detailSuc = function(data){
			if(data){
				remainMoney = data.availInvest;
				sum = data.SUM;
				payment_uses = data.payment_uses;
				total_interest = data.TOTAL_INTEREST;
				avlBal = data.avlBal;//可用余额
				$('#zzu_remaining_money').html(remainMoney);//剩余可投金额
				$('.zzu-emphasis-million').html(data.thousandProfit);//万份收益
				$('.zzu-audit-time').html(data.passTime);//审核时间
				$('#zzu_usable_amt').html(avlBal);
				if(avlBal){
					$('#zzu_usable_amt_span').removeClass('zzu-hidden');
				}
				/**
				 * 标头部
				 */
				common.putTemplete('zzu_load_title_tem', data, 'zzu_load_title');
				/**
				 * 标详情
				 */
				common.putTemplete('zzu_detail_info_tem', data, 'zzu_detail_info');
				$('.scrollbar-inner').scrollbar();
				
				/**
				 * 刷新页面时如果输入框有值执行验证金额方法
				 */
				chkInvestmentAmount($(".zzu-number-text"));
			}
		};
		
		common.ajaxUtil('n/loan/detail.json', {loadId:loadId}, 'GET', detailSuc);
		
		
		
		/**
		 * 现金券上一页
		 */
		$('#zzu_prev').on('click',function(){
			if(item <= 2){
				return;
			}else{
				item--;
				putCash();
			}
			
		});
		/**
		 * 现金券下一页
		 */
		$('#zzu_next').on('click',function(){
			item++;
			putCash();
		});
		
		/**
		 * 现金券单击使用
		 */
		var useCash = function(){
			if($('#zzu_cash_id').val() == $(this).attr('data')){
				$(this).css('background-color','#ed272e');
				$('#zzu_cash_id').val('');
				$('#zzu_cash_amt').val('');
			}else{
				$('#zzu_cash_id').val($(this).attr('data'));
				$('#zzu_cash_amt').val($(this).attr('data-amount'));
				$(this).siblings().css('background-color','#ed272e');
				$(this).css('background-color','#f2a5a8');
			}
		}
		
		
		
		/**
		 * 还款计划
		 */
		common.ajaxUtil('n/loan/repayplan.json', {loadId:loadId}, 'GET', function(data){
			if(data){
				common.putTemplete('zzu_striped_tem', data, 'zzu_triped_info');
			}
		});
		
		/**
		 * 投标记录
		 */
		function loadData(pageNo,pageSize){
			var _pageNo = pageNo || 1,_pageSize = pageSize || 5;
			var start = (_pageNo-1)*_pageSize,length = _pageSize;
			var pageData = {"start":start,"length":length,
					        "columns":[
					       	{"data":"ID","name":"ID"},
					       	{"data":"STAGES_ASSESTS","name":"STAGES_ASSESTS"},
					       	{"data":"CREATE_TIME","name":"CREATE_TIME","orderable":true},
					       	{"data":"TEL","name":"TEL"}
					       ],
					       "order":[{
					    	   "column":"2","dir":"desc"
					       	}]
					       };
			
			common.ajaxUtil('n/loan/investlist.json', {loanId:loadId,pageData:JSON.stringify(pageData)}, 'POST', function(data){
				common.putTemplete('zzu_records_tem', data.data, 'zzu_records_info');
				$('#zzu_total_num').html(data.recordsFiltered);
				$('#zzu_total_amt').html(data.totalAmount);
				$.zzuPage({pageId:'pageContainer',		
					pageNo		: 	_pageNo,
					pageSize	:	_pageSize,
					totalCount	:	data.recordsFiltered,
					load		:	loadData
				});
			});
		}
		
		loadData();
		
		/**
		 * 个人资料
		 */
		common.ajaxUtil('n/loan/auditfiles.json', {loanId:loadId},'GET',function(data){
			//信用报告
			if(data.creditReport){
				$('#zzu_credit_href').attr('href',data.creditReport).attr('target','_blank');
			}
			//身份认证
			if(data.incomeProof){
				$('#zzu_credit_href').attr('href',data.incomeProof).attr('target','_blank');
			}
			//工作认证
			if(data.jobProof){
				$('#zzu_credit_href').attr('href',data.jobProof).attr('target','_blank');
			}
			//收入认证
			if(data.idProof){
				$('#zzu_credit_href').attr('href',data.idProof).attr('target','_blank');
			}
		});
		
		$(".zzu-number-text").on('keyup change', function() {
			chkInvestmentAmount($(this));
		});

		/**
		 * 减号单击
		 */
		$("#zzu_minus").on('click', function() {
			var inputNumber = $(".zzu-number-text").val();
			if (inputNumber) {
				inputNumber = parseFloat(inputNumber);
				var inputMinus = inputNumber - 100;
				if (inputMinus > 0) {
					$(".zzu-number-text").val(inputMinus);
				} else {
					$(".zzu-number-text").val('');
				}
				chkInvestmentAmount($(".zzu-number-text"));
			}
		});

		/**
		 * 加号单击
		 */
		$("#zzu_add").on('click', function() {
			var inputNumber = $(".zzu-number-text").val();
			if (inputNumber) {
				inputNumber = parseFloat(inputNumber);
			} else {
				inputNumber = 0;
			}
			$(".zzu-number-text").val(inputNumber + 100);
			chkInvestmentAmount($(".zzu-number-text"));
		});



		/**
		 * 判断该标是否已经满标
		 */
		if (anchor.indexOf("zzu-disable") > 0) {
			$("#zzu_search_form").hide();
			$("#zzu_loan_repaymen").show();
		} else {
			$("#zzu_search_form").removeClass("zzu-hidden");
			$("#zzu_loan_repaymen").addClass("zzu-hidden");
		}
		
		/**
		 * 单击立即投资
		 */
		$("#zzu_btn_invest").on('click',function(){
			var loanDeal = $('#zzu_loan_deal');
			if(loanDeal && !loanDeal.is(':checked')){
				$('#zzu_error').empty().html('请阅读并同意签署《借贷协议》');
				return;
			}
			if(chkInvestmentAmount($('.zzu-number-text'),'callInitiat')){
				var transAmt = $('.zzu-number-text').val();
				var cashAmount = $('#zzu_cash_amt').val();
				var success = function(data) {
					if (data.code == "1111") {
						var param = {
								load_id : loadId,
								transAmt : transAmt,
								cashAmount :cashAmount,
								cashId : $('#zzu_cash_id').val()
						};
						hf.callInitiativeTender(param);
					}else{
						$('#zzu_error').empty().html(data.message);
					}
				};
				common.ajaxUtil('invest/checkinvest.json', {transAmt:transAmt,cashAmount:cashAmount}, 'POST', success);
			}
		});
	}
});
