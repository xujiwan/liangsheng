define([ 'jquery', 'common'], function($, common) {
	$('.wjs-nike-name').html(common.getItemSession('nikeName'));
	var pathname = location.pathname;
	if (pathname && pathname.indexOf("/") > -1) {
		var htmlName = pathname.substr(pathname.lastIndexOf("/") + 1);
		var accountLi = $('.wjs-account-nav > li').removeClass('active');
		switch (htmlName) {
			// 账户管理
			case 'manage.html':
				accountLi.eq(3).addClass('active');
				break;
			// 账户首页
			case 'account_index.html':
				accountLi.eq(0).addClass('active');
				break;
			// 银行卡管理
			case 'bank_manage.html':
				accountLi.eq(1).addClass('active');
				break;
			// 我的融资
			case 'financing.html':
				accountLi.eq(2).addClass('active');
				break;
			// 我的投资
			case 'invest.html':
				accountLi.eq(2).addClass('active');
				break;
			// 资金概览
			case 'money_overview.html':
				accountLi.eq(1).addClass('active');
				break;
			// 充值
			case 'recharge.html':
				accountLi.eq(1).addClass('active');
				break;
			// 推荐好友
			case 'recommend_friend.html':
				accountLi.eq(4).addClass('active');
				break;
			// 提现
			case 'withdrawal.html':
				accountLi.eq(1).addClass('active');
				break;
			// 投标计划
			case 'bid_plan.html':
				accountLi.eq(6).addClass('active');
				break;
			// 自动投标
			case 'auto_bid.html':
				accountLi.eq(6).addClass('active');
				break;
			// 自动投标开启
			case 'bid_open.html':
				accountLi.eq(6).addClass('active');
				break;
			// 现金券
			case 'cash_ticket.html':
				accountLi.eq(5).addClass('active');
				break;
			// 体验金
			case 'experience_money.html':
				accountLi.eq(5).addClass('active');
				break;
		};

		/**
		 * 自动投标
		 */
		accountLi.eq(6).on('click', function() {
			var success = function(data) {
				if (data.code == '1096') {
					common.goUrl('accounts/auto_bid.html');
				}
				if (data.code == '1095') {
					common.goUrl('accounts/bid_open.html');
				}
			};
			common.ajaxUtil('autotender/isauthrize.json', {}, 'GET', success);
		});

	}
});