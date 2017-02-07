define(['jquery',  'common','accountsPublic','bs'], function($,  common) {
	var cashSuc = function(data){
		var result = data.result;
		if(result){
			common.putTemplete("zzu_cash_ticket", result, "zzu_cash_ticketBox");
		}
	};
	common.ajaxUtil('n/cashCoupon/allCashCoupon.json',null,'GET',cashSuc);
	
	$('.zzu-reminder').tooltip();
});