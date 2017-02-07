define(['jquery', 'echars-common', 'common', 'util/validate', 'datepicker', 'datepickerCn', 'accountsPublic', 'page', 'bs'], function($, echarCommon, common, validate, datepicker,
	page) {
	var n = 9;
	$(".spinner").hide();
	/**
	 * 分页请求平台公告
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
			"columns": [{
				"data": "TIME",
				"name": "TIME",
				"orderable": true
			}, {
				"data": "ISSUE",
				"name": "ISSUE"
			}, {
				"data": "TIME",
				"name": "TIME"
			}, {
				"data": "DESCRIPTION",
				"name": "DESCRIPTION"
			}],
			"order": [{
				"column": "0",
				"dir": "desc"
			}]
		};
		param.pageData = JSON.stringify(pageData);
		var suc = function(data) {
			$(".spinner").hide();
			common.putTemplete('zzu_lostfound_list_tem', data.data, 'zzu_lostfound_list');
			$('.zzu-lostfound').on('click', function() {
				$('#myModal').modal('show');
				common.putTemplete('zzu_lostfound_dialog_tem', $.tmplItem(this).data, 'zzu_lostfound_dialog');
			})
			$(".zzu-lostfound").mouseenter(function() {
				$(this).find(".zzu-shade").show();
				$(this).find(".zzu-lostfound-btn").css("color", "#ED272E");
			})
			$(".zzu-lostfound").mouseleave(function() {
					$(this).find(".zzu-lostfound-btn").css("color", "#000000");
					$(this).find(".zzu-shade").hide();
				})
				/*$(function(){
					var num = $("#zzu_lostfound_title_show").html();
					if (num.length > 5){
						$("#zzu_lostfound_title_show").html(num.substr(0,5)+"...");
					}
				})*/

			$.zzuPage({
				/*pageId: 'pageContainer',*/
				pageNo: _pageNo,
				pageSize: _pageSize,
				totalCount: data.recordsFiltered,
				load: tableList
			});

		};
		common.ajaxUtil('kw/mediaInfo/getFoundLostList.json', param, 'POST', suc,function(){
			$(".spinner").hide();
		});
		
	};
	tableList(1, 9);
	$(".zzu-lostfound-load-btn").click(function() {
		$(".spinner").show();
		var pageSize;
		var totalCount;
		n = n + 3;
		tableList(1, n);
		if (pageSize > totalCount) {
			$(".zzu-lostfound-btn").html("没有可加载项");
		}
	})

	/*$(".zzu-lostfound").click(function() {
			$(this).find(".zzu-shade").show();
		})*/

});