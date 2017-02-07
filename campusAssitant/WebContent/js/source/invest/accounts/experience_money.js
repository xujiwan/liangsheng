define(['jquery',  'common','accountsPublic'], function($,  common) {
	$('.zzu-usage-body a').mouseenter(function(){
		$('.zzu-usage-body span').eq($(this).attr('data')).css('background','red');
	}).mouseleave(function(){
		$('.zzu-usage-body span').eq($(this).attr('data')).css('background','#d5d5d5');
	});
	
	var cashSuc = function(data){
		common.putTemplete("zzu_cash_ticket", data, "zzu_cash_ticketBox");
		/*$('.zzu-cash-ticketOne').on('click',function(){
			common.goUrl('accounts/novice_bid.html');
		});*/
	};
	common.ajaxUtil('n/activity/allExperienceGold.json',null,'GET',cashSuc);
	
});