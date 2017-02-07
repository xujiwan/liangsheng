define([ 'jquery', 'echars-common', 'common' ],
		function($, echarCommon, common) {
			var getLoadTypeInfo = function(id) {
				if (id) {
					$(id).addClass('active').siblings().removeClass('active');
					var productData = {
						loadTitle: id,
						htmlUrl: id,
					};
					common.putTemplete('zzu_content_car_info', productData, 'zzu_car_info');

					/**
					 * 标统计
					 */
					var param = {};
					//汽车项目
					if('#zzu_car' == id){
						param.loanType = '0';
						$('#zzu_product_type').html('汽车项目');
						/**
						 * 标信息图
						 */
						echarCommon.createProductTypePie('zzu_chartLoanType_car', [ '0-10万', '10-30万', '30-100万' ], [ {
							value: 10,
							name: '0-10万'
						}, {
							value: 78,
							name: '10-30万'
						}, {
							value: 12,
							name: '30-100万'
						} ]);
					}
					//信用项目
					if('#zzu_credit' == id){
						param.loanType = '1';
						$('#zzu_product_type').html('信用项目');
						/**
						 * 标信息图
						 */
						echarCommon.createProductTypePie('zzu_chartLoanType_car', [ '0-5万', '5-15万', '15-30万' ], [ {
							value: 15,
							name: '15-30万'
						}, {
							value: 25,
							name: '5-15万'
						}, {
							value: 60,
							name: '0-5万'
						} ]);
					}
					//三农项目
					if('#zzu_agriculture' == id){
						param.loanType = '5';
						/**
						 * 标信息图
						 */
						echarCommon.createProductTypePie('zzu_chartLoanType_car', [ '0-1000万' ], [ {
							value: 100,
							name: '0-1000万'
						}]);
						$('#zzu_product_type').html('三农项目');
					}
					/**
					 * 统计数据
					 */
					if(param.loanType == '0'){
						$('#zzu_total_amt').html('583,28.34');
						$('#zzu_invest_number').html('43,895');
						$('#zzu_loan_number').html('2,436');
					}
					if(param.loanType == '1'){
						$('#zzu_total_amt').html('175,21.26');
						$('#zzu_invest_number').html('60,245');
						$('#zzu_loan_number').html('2,047');
					}
					if(param.loanType == '5'){
						$('#zzu_total_amt').html('0.00');
						$('#zzu_invest_number').html('0.00');
						$('#zzu_loan_number').html('0.00');
					}
					/*common.ajaxUtil('n/scattered/loanStatistic.json',param,'GET',function(data){
						if(data){
							var total = common.rmoney(data.TOTAL_AMT)/10000;
							$('#zzu_total_amt').html(common.formatMoney(total,2));
							$('#zzu_invest_number').html(data.INVEST_NUM);
							$('#zzu_loan_number').html(data.LOAN_NUM);
						}
					});*/
				}
			}
			
			

			/**
			 * 标类型点击
			 */
			$('#zzu_agriculture,#zzu_credit,#zzu_car').on('click', function() {
				var liId = $(this).attr('id');
				getLoadTypeInfo('#' + liId);
				var liMain = liId+'Main';
				$('.zzu-loan-info').hide();
				$('#'+liMain).show();
			});
			
			var anchor = window.location.hash;
			if (anchor && anchor.indexOf('#zzu_') > -1 && anchor.length < 20) {
				$(anchor).trigger("click");
			} else {
				$('#zzu_car').trigger("click");
			};
		});