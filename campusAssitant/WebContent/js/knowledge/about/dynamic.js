define(['jquery', 'echars-common', 'common', 'util/validate', 'datepicker', 'datepickerCn', 'accountsPublic', 'page', 'bs'], function($, echarCommon, common, validate, datepicker,
	page) {
	var n = 8;
	$(".spinner").hide();
	/**
	 * 分页请求最新动态
	 */
	var tableList = function(pageNo, pageSize) {
		var param = {};
		var _pageNo = pageNo || 1,
			_pageSize = pageSize || 5;
		var start = (_pageNo - 1) * _pageSize,
			length = _pageSize;
		var pageData = {
			"start": start,
			"length": length,
			"columns":[{
				"data": "TIME",
				"name": "TIME",
				"orderable": true
			},
			{
				"data": "YEAR",
				"name": "YEAR"
			},
			{
				"data": "DATE",
				"name": "DATE"
			},
			{
				"data": "ISSUE",
				"name": "ISSUE"
			},
			{
				"data": "NEW_ID",
				"name": "NEW_ID"
			},
			{
				"data": "DESCRIPTION",
				"name": "DESCRIPTION"
			}],
			"order": [ {
				"column": "0",
				"dir": "desc"
			} ]
		};
		param.pageData = JSON.stringify(pageData);
		var suc = function(data) {
			$(".spinner").hide();
			common.putTemplete('zzu_dynamic_list_tem', data.data, 'zzu_dynamic_list');
			$.zzuPage({
				/*pageId: 'dynamic_pageContainer',*/
				pageNo: _pageNo,
				pageSize: _pageSize,
				totalCount: data.recordsFiltered,
				load: tableList
			});

		};
		common.ajaxUtil('/kw/mediaInfo/getRecentNewList.json', param, 'POST', suc,function(){
			$(".spinner").hide();
		});
		
	};
	tableList(1, 8);
	
	$(".zzu-dynamic-btn").click(function(){
		$(".spinner").show();
		var pageSize;
		var totalCount;
		n = n + 5;
		tableList(1,n);
		if ( pageSize > totalCount){
			$(".zzu-dynamic-btn").html("没有可加载项");
		}
	})
});