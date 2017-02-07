define(['jquery', 'common'], function($, common) {
	var new_id;
	var getDynamic = function(){
		var anchor = window.location.hash;
		if (anchor) {
			new_id = anchor.substring(anchor.indexOf("#") + 1, anchor.lastIndexOf("#"));
			common.ajaxUtil('/kw/mediaInfo/getRecentNewsDetail.json', {NEW_ID:new_id}, 'GET', function(data){
				common.putTemplete('zzu_left_dynamic_detail', data, 'zzu_left_dynamic');
				$('#prev,#next').on('click',getDynamic);
			});
		}
	}
	getDynamic();
	
});