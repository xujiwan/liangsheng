define([ 'jquery', 'echars-common', 'common', 'util/validate', 'datepicker','datepickerCn', 'accountsPublic', 'page', 'bs' ], function($, echarCommon, common, validate, datepicker,
		page) {
	var time = 'td1', statu, beginDate, endDate , zzu_order='desc';// 时间，状态，起始时间，结束时间，排序
	var today = new Date();
	
	/**
	 * 日期改变
	 */
	var cDayFunc = function() {
		var thisId = $(this).attr('id');
		$(this).siblings('a').removeClass('active');
		var status = $('#zzu_status_table').find('a.active').attr('data');
		//var beginDate, endDate;
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
		/*
		 * if(new Date(endDate) - new Date(beginDate) > 0){ tableList(null,
		 * status, beginDate, endDate); }else{
		 * common.showMessage('结束日期必须大于开始日期！'); }
		 */
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
		}).val(today.getFullYear()+'-'+(today.getMonth()+1)).on('change', cDayFunc);
	} catch (e) {
		console.log(e);
	}
	/**
	 * 状态和简便日期链接单击事件
	 */
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
				statu = data;
				time = $('#zzu_begin_time_table').siblings('a.active').attr('data');
				if (!validate.isNotNull(time)) {
					beginDate = $('#zzu_begin_time_table').val();
					endDate = $('#zzu_end_time_table').val();
				}
			}
			tableList(1, 10);
		}
	});

	/**
	 * 图形报表请求
	 */
	/*
	 * var charData = function(data, sData, beginData, endData) { var param =
	 * putParam(data, sData, beginData, endData); param.type="financ"; var suc =
	 * function(data) { echarCommon.createLine('zzu_chartRecord',
	 * data.keyList,data.valuelist, '融资记录',false,''); }
	 * common.ajaxUtil('graphical/reports.json',param,'GET',suc); }
	 */

	/**
	 * 还款列表
	 */
	var examineClick = function() {
		var thisData = $(this).attr('data');
		if (thisData) {
			var detailClass = $('#zzu_' + thisData + '_detail').attr('class');
			if (detailClass && detailClass.indexOf('zzu-hidden') > 0) {
				/**
				 * 还款列表
				 */
				var examineSuc = function(data) {
					common.putTemplete('zzu_table_detail_tem', data, 'zzu_' + thisData + '_table');
					$('.zzu-repay').on('click', repay);// 注册还款按钮事件
				}
				common.ajaxUtil('repay/repayplan.json', {
					loadId: thisData
				}, 'GET', examineSuc);

				$('[id$="_detail"]').slideUp('fast').addClass('zzu-hidden');
				$('.zzu-show-detail').html("查看");
				$('#zzu_' + thisData + '_detail').slideDown('slow').removeClass('zzu-hidden');
				$(this).slideDown();
				$(this).html('收起');
			} else {
				$('#zzu_' + thisData + '_detail').slideUp('fast').addClass('zzu-hidden');
				$(this).html('查看');
			}
		}
	};

	/**
	 * 分页请求融资列表
	 */
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
				"data": "load_title",
				"name": "load_title"
			}, {
				"data": "sum",
				"name": "sum"
			}, {
				"data": "payWay",
				"name": "payWay"
			}, {
				"data": "sub_load_id",
				"name": "sub_load_id"
			}, {
				"data": "loanStatus",
				"name": "loanStatus"
			}, {
				"data": "loanTime",
				"name": "loanTime"
			}, {
				"data": "isPrepayment",
				"name": "isPrepayment"
			}, {
				"data": "rate",
				"name": "rate"
			}, {
				"data": "payment_type",
				"name": "payment_type"
			}, {
				"data": "payment_method",
				"name": "payment_method"
			}, {
				"data": "status",
				"name": "status"
			}, {
				"data": "load_id",
				"name": "load_id"
			},
			{
				"data": "payment_uses",
				"name": "payment_uses"
			}],
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
			if ('0' != status) {
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
		var suc = function(data) {
			$("#loading_animation").hide();
			common.putTemplete('zzu_invest_list_tem', data.data, 'zzu_invest_list');
			$.zzuPage({
				pageId: 'pageContainer',
				pageNo: _pageNo,
				pageSize: _pageSize,
				totalCount: data.recordsFiltered,
				load: tableList
			});
			// 注册查看详情按钮事件
			$('.zzu-show-detail').on('click', examineClick);
			// 注册提前还款事件
			$('.zzu-prepayment').on('click', prepayment);
		};
		common.ajaxUtil('financing/list.json', param, 'POST', suc,function(){
			$("#loading_animation").hide();
		});
	};

	// charData('3', null, null, null);
	tableList(1, 10);

	/**
	 * 还款
	 */
	var repayType;// 请求类型
	var repamParam;// 还款参数
	var repay = function() {
		repayType = 'repayment';// 还款
		var load_id = $(this).attr('data-load');
		var every_load_id = $(this).attr('data');
		var number = $(this).attr('data-num');
		$('#zzu_pass').modal('show');
		$('#zzu_pass_input').val('');
		$('#zzu_show_error').html('');
		repamParam = {
			loadId: load_id,
			everyLoadId: every_load_id,
			num: number
		};
	};

	/**
	 * 提前还款
	 */
	var prepayment = function() {
		repayType = 'prepayment';
		var load_id = $(this).attr('data');
		var project_name = $(this).attr('data-short');//项目名称
		repamParam = {
			load_id: load_id
		};
		common.ajaxUtil('repay/prepaymentconfirm.json', repamParam, 'POST', function(data) {
			$('#zzu_loan_title').html(project_name);
			$('#zzu_payment_times').html(data.payment_times);
			$('#zzu_surplus_loan').html(data.sum);
			$('#zzu_default_sum').html(data.defaultSum);
			$('#zzu_prepay_total_amt').html(data.totalAmt);
			$('#zzu_prepayment-confirm').modal('show');
		});
	};
	
	$('#zzu_prepay_ok').on('click',function(){
		$('#zzu_pass').modal('show');
		$('#zzu_pass_input').val('');
		$('#zzu_show_error').html('');
	})

	/**
	 * 确认密码
	 */
	$('#zzu_pass_ok').on('click', function() {
		var pas = $('#zzu_pass_input').val();
		var isPas = validate.isPas(pas);
		if ('true' != isPas) {
			$('#zzu_show_error').html(isPas);
			return;
		}
		var suc = function(data) {
			$('#zzu_pass_input').val('');
			if ('1111' == data.code) {
				$('#zzu_pass').modal('hide');
				// 还款
				if (repayType == 'repayment') {
					common.ajaxUtil('repay/repayment.json', repamParam, 'POST', function(data) {
						common.showMessage(data.message,'info',function(){
							tableList(1, 10);
						});
					});
				}
				// 提前还款
				if (repayType == 'prepayment') {
					common.ajaxUtil('repay/prepayment.json', repamParam, 'POST', function(data) {
						$('#zzu_prepayment-confirm').modal('hide');
						common.showMessage(data.message,'info',function(){
							tableList(1, 10);
						});
					});
				}
			} else {
				$('#zzu_show_error').html(data.message);
			}
		};
		common.ajaxUtil('n/checkUser/isPass.json', {
			pwd: pas
		}, 'GET', suc);
	});
			/**
	 * 升序降序箭头
	 */
	$('.zzu-table-head').find('.zzu-rank').click(function() {
			zzu_order = $(this).attr('id');
			$(this).hide();
			$(this).siblings().show();
			tableList(1, 10);
	});

});
