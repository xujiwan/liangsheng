define([ 'jquery', 'common', 'echars-common', 'scrollbar', 'page','bs'], function($, common, echarCommon, scrollbar) {
	
	/**
	 * 轮播图
	 */
	$('#zzu-carousel').on('mouseover',function(){
		$(this).find('img').removeClass('zzu-hidden');
	}).on('mouseout',function(){
		$(this).find('img').addClass('zzu-hidden');
	});

	// 平台公告
	 common.ajaxUtil('n/news/getPlatform.json', {
		 TYPE: '1',
		 SIZE: '5'
		}, 'GET', function(data) {
		common.putTemplete("zzu_platform", data, "zzu_ul_platform");
	 });
	 
	
	// 平台新闻
	common.ajaxUtil('n/news/getNews.json', {
		TYPE: '0',
		SIZE: '5'
	}, 'GET', function(data) {
		common.putTemplete("zzu_news", data, "zzu_ul_news");
	});
	//失物招领 
	common.ajaxUtil('n/news/getLostfound.json', {
		TYPE: '2',
		SIZE: '5'
	}, 'GET', function(data) {
		common.putTemplete("zzu_lost_found", data, "zzu_ul_lost_found");
	});
	var BUILDING_NUMBER;
	$('.zzu-classroom-status').find('a').on('click',function(){
		var data = $(this).attr('data');
		// 列表状态查询
		if (data.indexOf('ts') == 0) {
			BUILDING_NUMBER = data.charAt(2);
		}
		tableList(1, 50);
	});
	/**
	 * 分页请求空闲教室列表
	 */
	/*window.onload = function gettchange() {
        var test = document.getElementByIdx_x("bianse");
        var lis = test.getElementsByTagName_r("li");
        var odd = false;
        for (var i = 0; i < lis.length; i++) {
            if (odd == true) {
                lis[i].className = "obc";
                odd = false;
            }
            else {
                odd = true;
            }
        }
    }*/
	/*//奇数行
	$(".zzu-table ul li:odd").css({
	    "background-color":"#AAEEFF"
	});
	//偶数行
	$(".zzu-table ul li:even").css({
	    "background-color":"#FFEEAA"
	});*/
	var tableList = function(pageNo, pageSize) {
		var param = {};
		var _pageNo = pageNo || 1, _pageSize = pageSize || 5;
		var start = (_pageNo - 1) * _pageSize, length = _pageSize;
		var pageData = {
			"start": start,
			"length": length,
			"BUILDING_NUMBER":BUILDING_NUMBER,
			"columns": [{
				"data": "CLASSROOM_NUMBER",
				"name": "CLASSROOM_NUMBER",
			},{
				"data": "0",
				"name": "IS_FREE"
			}],
			"order": [ {
				"column": "0",
			} ]
		};
		param.pageData = JSON.stringify(pageData);
		var suc = function(data) {
			$("#loading_animation").hide();
			common.putTemplete('zzu_classroomlist_tem', data.data, 'zzu_classroom_list');
			$.zzuPage({
				pageId: 'pageContainer',
				pageNo: _pageNo,
				pageSize: _pageSize,
				totalCount: data.recordsFiltered,
				load: tableList
			});
			// 查看本教室课表事件
			/*$('.zzu-show-detail').on('click', examineClick);*/
		};
		common.ajaxUtil('n/freeClassroom/getFreeClassroomList.json',param, 'POST', suc,function(){
			$("#loading_animation").hide();
		});
	};
	tableList(1,50);
	//每一个教室当天的课程表状况
	/*var examineClick = function(){
		
	};*/
});