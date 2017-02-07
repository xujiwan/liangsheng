define([ 'jquery', 'echars-common', 'common', 'util/validate', 'datepicker','datepickerCn', 'accountsPublic', 'page', 'bs'], function($, echarCommon, common, validate, wp, page) {
	var time = 'td1', statu, beginDate, endDate,zzu_order='desc';// 时间，状态，起始时间，结束时间,排序
	var today = new Date();
	/**
	 * 时间控件改变值
	 */
	var mDayFunc = function($dp) {
		var thisId = $(this).attr('id');
		$(this).siblings('a').removeClass('active');
		status = $('#zzu_status_table').find('a.active').attr('data');
		if ('zzu_begin_time_table' == thisId) {
			beginDate = $(this).val();
			endDate = $('#zzu_end_time_table').val();
		}
		if ('zzu_end_time_table' == thisId) {
			beginDate = $('#zzu_begin_time_table').val();
			endDate = $(this).val();
		}
		var datePoor = common.datePoor(beginDate, endDate);
		if (datePoor < 0) {
			common.showMessage('结束日期不能小于开始日期');
			return;
		}
		if (datePoor > 11) {
			common.showMessage('只能查询12个月内的数据');
			return;
		}
		tableList(1,10);
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
		}).val(today.getFullYear()+'-'+(today.getMonth()+1)).on('change', mDayFunc);
	} catch (e) {
		console.log(e);
	}

	$('.zzu-querylist').find('a').on('click', function() {
		var data = $(this).attr('data');
		if (validate.isNotNull(data)) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			/*
			 * // 图形报表时间查询 if (data.indexOf('d') == 0) { charData(data,
			 * $('#zzu_status').find('a.active').attr('data'), null, null); } //
			 * 图形报表状态查询 if (data.indexOf('s') == 0) { var d =
			 * $('#zzu_status').find('a.active').attr('data'); if (d) {
			 * charData(d, data, null, null); } else { var beginDate =
			 * $('zzu_begin_time').val(); var endDate = $('zzu_end_time').val();
			 * charData(null, data, beginDate, endDate); } }
			 */
			// 列表时间查询
			if (data.indexOf('td') == 0) {
				time = data;
				statu = $('#zzu_status_table').find('a.active').attr('data');
				beginDate = null;
				endDate = null;
			}
			// 列表状态查询
			if (data.indexOf('ts') == 0) {
				time = $('#zzu_begin_time_table').siblings('a.active').attr('data');
				statu = data;
				if (!validate.isNotNull(time)) {
					beginDate = $('#zzu_begin_time_table').val();
					endDate = $('#zzu_end_time_table').val();
				}
			}
			tableList(1,10);
		}
	});


	/**
	 * 图形报表请求
	 */
	/*
	 * var charData = function(data, sData, beginData, endData) { var param =
	 * putParam(data, sData, beginData, endData); param.type="invest";
	 * 
	 * var suc = function(data) { $('#zzu_invest_time').html(data.totalNum);
	 * $('#zzu_invest_money').html(data.totalInvset);
	 * $('#zzu_invest_earnings').html(data.totalProfit);
	 * echarCommon.createLine('zzu_chartRecord',
	 * data.keyList,data.valuelist,'投资记录',false,''); }
	 * common.ajaxUtil('graphical/reports.json',param,'GET',suc); }
	 */

	/**
	 * 回款列表
	 */
	var examineClick = function() {
		var thisData = $(this).attr('data');
		if (thisData) {
			var detailClass = $('#zzu_' + thisData + '_detail').attr('class');
			if (detailClass && detailClass.indexOf('zzu-hidden') > 0) {
				/**
				 * 收益列表
				 */
				var examineSuc = function(data) {
					common.putTemplete('zzu_table_detail_tem', data, 'zzu_' + thisData + '_table');
				}
				common.ajaxUtil('invest/investEarningsList.json', {
					investId: thisData
				}, 'GET', examineSuc);

				$('[id$="_detail"]').slideUp('fast').addClass('zzu-hidden');
				$('.zzu-text-link').html("查看");
				$('#zzu_' + thisData + '_detail').slideDown('slow').removeClass('zzu-hidden');
				$(this).slideDown();
				$(this).html('收起');
			} else {
				$('#zzu_' + thisData + '_detail').slideUp('fast').addClass('zzu-hidden');
				$(this).html('查看');
			}
		}
	};
	var tableList = function(pageNo, pageSize) {
		$("#loading_animation").show();
		var param = {};
		var _pageNo = pageNo || 1, _pageSize = pageSize || 10;
		var start = (_pageNo - 1) * _pageSize, length = _pageSize;
		var pageData = {
			"start": start,
			"length": length,
			"columns": [ {
				"data": "create_time",
				"name": "create_time",
				"orderable": true
			}, {
				"data": "LOAD_TITLE",
				"name": "LOAD_TITLE"
			}, {
				"data": "sub_load_id",
				"name": "sub_load_id"
			}, {
				"data": "STAGES_ASSESTS",
				"name": "STAGES_ASSESTS"
			}, {
				"data": "loanTime",
				"name": "loanTime"
			}, {
				"data": "interest_time",
				"name": "interest_time"
			},
			{
				"data": "PROFIT",
				"name": "PROFIT"
			} ,
			{
				"data": "balance",
				"name": "balance"
			} ,
			{
				"data": "PAYMENT_USES",
				"name": "PAYMENT_USES"
			} ,
			{
				"data": "STATUS",
				"name": "STATUS"
			} ,
			{
				"data": "can_transfer",
				"name": "can_transfer"
			} ,
			{
				"data": "investStatus",
				"name": "investStatus"
			} ,
			{
				"data": "DISBURSEMENT_PAYMNT_TIME",
				"name": "DISBURSEMENT_PAYMNT_TIME"
			} ,
			{
				"data": "LOAD_ID",
				"name": "LOAD_ID"
			} ,
			{
				"data": "LOANSTATUS",
				"name": "LOANSTATUS"
			} ,
			{
				"data": "INVEST_ID",
				"name": "INVEST_ID"
			} ],
			"order": [ {
				"column": "0",
				"dir": zzu_order
			} ]
		};
		param.pageData = JSON.stringify(pageData);
		if (validate.isNotNull(time)) {
			param.lastestDate = time.substr(2);
		}
		if (validate.isNotNull(statu)) {
			var status = statu.substr(2);
			if ('00' != status) {
				param.type = status;
			}
		}
		if (validate.isNotNull(beginDate)) {
			param.beginDate = beginDate;
			param.lastestDate = '';
		}
		if (validate.isNotNull(endDate)) {
			param.endDate = endDate;
			param.lastestDate = '';
		}
		if (validate.isNotNull(zzu_order)) {
			param.zzu_order = zzu_order;
		}
		var suc = function(data) {
			$("#loading_animation").hide();
			common.putTemplete('zzu_invest_list_tem', data.data, 'zzu_invest_list');
			$.zzuPage({pageId:'pageContainer',		
				pageNo		: 	_pageNo,
				pageSize	:	_pageSize,
				totalCount	:	data.recordsFiltered,
				load		:	tableList
			});
			$('.zzu-text-link').on('click', examineClick);
			$("a[id^='zzu_credit_']").on('click', creditClick);
			$("a[id^='zzu_cancel_credit_']").on('click', function(){
				var investId = $(this).attr("data");
				$('#invest_id').empty().val(investId);
				$('#zzu_invest-transfer-cancle').modal('show');
			});
			
		};
		common.ajaxUtil('invest/investList.json', param, 'POST', suc,function(){
			$("#loading_animation").hide();
		});
		
	};

	// charData('3', null, null, null);
	tableList(1, 10);
	
	/*
	 * 我要转让债权
	 */
	var creditClick = function() {
		// 可转让本金
		var creditAmt = $(this).attr("data-balance");
		var investId = $(this).attr("data");
		$('#zzu_invest_id').empty().val(investId);
		var loanId = $(this).attr("data-loadId");
		var param = {
			"investId" : investId,
			"loanId" : loanId
		};
		var success = function(data) {
			if (data) {
				// 今日至上次收款日之间的天数
				var offsetDays = data.offsetDays;
				// 当期未收利息
				var notObtainedInterest = data.not_obtained_interest;
				// 所有剩余未收利息
				var allObtainedInterest = data.all_not_obtained_interest;
				$('#zzu_trans_balance').empty().html('￥'+creditAmt);
				$('#zzu_trans_interest').empty().html(notObtainedInterest);
				$('#zzu_trans_remain_interest').empty().html(allObtainedInterest);
				// 建议出让价格
				var suggestedLowestPrice = Math.ceil(creditAmt / 1.1); // 建议最低出让价格
				var suggestedHighestPrice = Math.floor(creditAmt / 0.9); // 建议最高出让价格
				var readableLPrice = formatMoney('' + suggestedLowestPrice);
				var readableHPrice = formatMoney('' + suggestedHighestPrice);
				$('#zzu_trans_suggest').empty().html('￥' + readableLPrice + '&nbsp;至&nbsp;￥' + readableHPrice);
				$('#transferFeeRateMisc').empty().html('转让费率，持有60天以上0.2%；持有60天以下0.5%，转让成功时一次性收取，基数为转让价格。');
				
				$('#zzu_invest-transfer-confirm').modal('show');
				
			}
		};
		common.ajaxUtil('creditassign/nointerest.json', param, 'GET', success);
	};
	/**
	 * 确认撤销转让
	 */
	$('#zzu_credit_cancle').click(function() {
		var investId = $('#invest_id').val();
		creditCancleClick(investId);
	});
	var creditCancleClick = function(investId) {
		var param = {
			"investId" : investId
		};
		var success = function(data) {
			if (data.code == '1111') {
				window.location.reload();
			}
		};
		common.ajaxUtil('creditassign/cancelcredit.json', param, 'POST', success);
		
	};
	
	$('#zzu_trans_ok').click(function() {
		var investId = $('#zzu_invest_id').val();
		var transAmt = $('#zzu_inv_trans_price').val();
		var par = {
			"investId" : investId,
			"transAmt" : transAmt
		};
		var suc = function(data) {
			alert(data.message);
			if (data.code == '1111') {
				$('#zzu_invest-transfer-confirm').modal('hide');
			}
		};
		
		common.ajaxUtil('creditassign/commitcredit.json', par, 'POST', suc);
	});
	
	
	function formatMoney(str) {
	if (str) {
		var postfix = '';
		var index = str.indexOf('.');
		if (index != -1) {
			postfix = str.substr(index, 3);
			str = str.substring(0, index);
		}
		str = str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
		return str + postfix;
	}
	return '';
	}
	var rank = {
		rank_two: $("#zzu_rankTwo").val(),
		rank_one: $("#zzu_rankOne").val(),
	};
	/**
	 * 升序降序箭头
	 */
		$('.zzu-table-head').find('.zzu-rank').click(function() {
			zzu_order = $(this).attr('id');
			$(this).hide();
			$(this).siblings().show();
			tableList(1, 10);
		});
	//	common.ajaxUtil('creditassign/commitcredit.json', , 'POST', );
});
