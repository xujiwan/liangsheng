define([ 'jquery', 'util/jquery.huifu','accountsPublic' ], function($, hf) {
	$('.zzu-btn-open').on('click',function(){
		hf.callAutoTenderPlan(null);
	});
});