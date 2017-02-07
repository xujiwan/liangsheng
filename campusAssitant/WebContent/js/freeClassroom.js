define([ 'jquery', 'echars-common', 'common', 'util/validate', 'datepicker','datepickerCn', 'accountsPublic', 'page', 'bs' ],
 function($, echarCommon, common, validate, datepicker,page) {
 	/**
	 * 分页请求空闲教室列表
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
			// 查看本教室课表事件
			$('.zzu-show-detail').on('click', examineClick);
		};
		common.ajaxUtil('/freeClassroom.json', param, 'GET', suc,function(){
			$("#loading_animation").hide();
		});
	};
		});