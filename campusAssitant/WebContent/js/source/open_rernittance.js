define([ 'jquery','common','config' ], function($,common) {
	$('#zzu_btn_no').on('click',function(){
		common.goUrl('accounts/account_index.html');
	});
	$('#zzu_btn_open').on('click',function(){
		hf.callUserRegister(null);
	});
});