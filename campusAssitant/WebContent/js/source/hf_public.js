define([ 'jquery','common','util/jquery.huifu' ], function($,common,hf) {
	var hfType = window.location.hash;
	switch(hfType){
		//开通汇付
		case '#zzu_hf_UserRegister':
			hf.callUserRegister(null);
			break;
		//用户绑卡
		case '#zzu_hf_UserBindCard':
			hf.callBindCard(null);
			break;
		//修改账户信息
		case '#zzu_hf_AcctModify':
			hf.callAcctModify(null);
			break;
	};
});