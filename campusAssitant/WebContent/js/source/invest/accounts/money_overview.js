define(['jquery', 'common', 'util/validate', 'datepicker','datepickerCn','accountsPublic','page'], function($, common, validate, wp,page) {
	var time = 't1',statu,beginDate,endDate;//时间，状态，起始时间，结束时间
	var today = new Date();
	/**
	 * 日期控件改变
	 */
	var cDayFunc = function() {
		time = null;
		var thisId = $(this).attr('id');
		$(this).siblings('a').removeClass('active');
		var data = $('.zzu-invest-list > .zzu-invest-status').find('a.active').attr('data');
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
			common.showMessage('结束日期不能小于开始日期');
			return;
		}
		if (datePoor > 11) {
			common.showMessage('只能查询12个月内的数据');
			return;
		}
		tableList(1,5);
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
	 * 统计数据截至日期
	 */
	$('#deadLine').html(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1)+' 23:59:59')
	
	$('.zzu-querylist').find('a').on('click', function() {
		var data = $(this).attr('data');
		if (validate.isNotNull(data)) {
			$(this).addClass('active').siblings().removeClass('active');
			//单击状态筛选
			if(data.indexOf('d') == 0){
				time = $('.zzu-invest-time').find('a.active').attr('data');
				statu = data;
				if(!validate.isNotNull(time)){
					beginDate = $('#zzu_begin_time').val();
					endDate = $('#zzu_end_time').val();
				}
				tableList(1,5);
			}
			//单击时间筛选
			if(data.indexOf('t') == 0){
				statu = $('.zzu-invest-status').find('a.active').attr('data');
				time = data;
				tableList(1,5);
			}
		}
	});
	
	/**
	 * 请求数据
	 */
	var tableList = function(pageNo,pageSize){
		common.loading();
		var param = {};
		var _pageNo = pageNo || 1,_pageSize = pageSize || 5;
		var start = (_pageNo-1)*_pageSize,length = _pageSize;
		var pageData = {"start":start,"length":length,
				"columns":[
				           {"data":"ID","name":"ID"},
				           {"data":"transType","name":"transType"},
				           {"data":"CREATE_TIME","name":"CREATE_TIME","orderable":true},
				           {"data":"AMOUNT","name":"AMOUNT"},
				           {"data":"otherUser","name":"otherUser"},
				           ],
				           "order":[{
				        	   "column":"2","dir":"desc"
				           }]
		};
		param.pageData = JSON.stringify(pageData);
		
		if(validate.isNotNull(time)){
			param.lastestDate = time.substr(1);
		}
		if(validate.isNotNull(statu) && 'd0' != statu){
			param.type = statu.substr(1);
		}
		if(validate.isNotNull(beginDate)){
			param.beginDate = beginDate;
		}
		if(validate.isNotNull(endDate)){
			param.endDate = endDate;
		}
		
		common.ajaxUtil('trans/recordlist.json',param,'POST',function(data){
			common.putTemplete('zzu_money_overview_tem', data.data, 'zzu_money_overview');
			$.zzuPage({pageId:'pageContainer',		
				pageNo		: 	_pageNo,
				pageSize	:	_pageSize,
				totalCount	:	data.recordsFiltered,
				load		:	tableList
			});
			$('.loading-animation').modal('hide');
		},function(){
			$('.loading-animation').modal('hide');
		});
	};
	tableList(1,5);

});
