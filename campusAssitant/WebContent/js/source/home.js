define([ 'jquery', 'common', 'echars-common', 'scrollbar', 'bs'], function($, common, echarCommon, scrollbar) {
	
	$('#zzu_service_borrow').on('click',function() {
		var serClass = $(this).attr('class');
		if(serClass.indexOf('zzu-service-borrow') > 0){
			$(this).removeClass('zzu-service-borrow').addClass('zzu-service-invest');
			$('#zzu_borrow_describe').addClass('zzu-hidden');
			$('#zzu_service_invest').removeClass('zzu-service-invest').addClass('zzu-service-borrow');
			$('#zzu_invest_describe').removeClass('zzu-hidden');
		}else{
			$(this).removeClass('zzu-service-invest').addClass('zzu-service-borrow');
			$('#zzu_borrow_describe').removeClass('zzu-hidden');
			$('#zzu_invest_describe').addClass('zzu-hidden');
			$('#zzu_service_invest').removeClass('zzu-service-borrow').addClass('zzu-service-invest');
		}
	});
	$('#zzu_service_invest').on('click',function() {
		var serClass = $(this).attr('class');
		if(serClass.indexOf('zzu-service-borrow') > 0){
			$(this).removeClass('zzu-service-borrow').addClass('zzu-service-invest');
			$('#zzu_invest_describe').addClass('zzu-hidden');
			$('#zzu_service_borrow').removeClass('zzu-service-invest').addClass('zzu-service-borrow');
			$('#zzu_borrow_describe').removeClass('zzu-hidden');
		}else{
			$(this).removeClass('zzu-service-invest').addClass('zzu-service-borrow');
			$('#zzu_invest_describe').removeClass('zzu-hidden');
			$('#zzu_borrow_describe').addClass('zzu-hidden');
			$('#zzu_service_borrow').removeClass('zzu-service-borrow').addClass('zzu-service-invest');
		}
	});
	
	/**
	 * 轮播图
	 */
	$('#zzu-carousel').on('mouseover',function(){
		$(this).find('img').removeClass('zzu-hidden');
	}).on('mouseout',function(){
		$(this).find('img').addClass('zzu-hidden');
	});

	/**
	 * 鼠标经过事件
	 */
	// 存储当前项
//	var currentIndex = $('#zzu_newuser_guide > .col-xs-3 > a.active').index();
	$('#zzu_newuser_guide > .col-xs-3 > a').hover(function() {
		$(this).addClass('active').parent().siblings().children().removeClass('active');
	}, function() {
		$(this).removeClass('active');
		// 恢复之前的当前项
//		~currentIndex && $('#zzu_newuser_guide > .col-xs-3 > a').eq(currentIndex).addClass('active');
	});

	// 平台公告
	common.ajaxUtil('n/news/get.json', {
		TYPE: '1',
		SIZE: '5'
	}, 'GET', function(data) {
		common.putTemplete("zzu_platform", data, "zzu_ul_Platform");
	});
	// 新手体验标
	common.ajaxUtil('n/experience/experienceOne.json', null, 'GET', function(data) {
		common.putTemplete("zzu_new_user_info", data, "zzu_new_user");
		/**
		 * 生成新手体验标环形图
		 */
		echarCommon.creatPie('zzu_chartNewUser',data.PROCESS, 100 - data.PROCESS);
	});

	common.ajaxUtil('n/scattered/loanEveryType.json', null, 'GET', function(data) {
		if (data) {
			if(data.code){
				common.showMessage(data.message);
			}else{
				common.putTemplete("zzu_loan", data, "zzu_loan_tem");
				/**
				 * 生成标环形图
				 */
				$(data).each(function(i, e) {
					echarCommon.creatPie('zzu_chart_' + e.SUB_LOAD_ID, e.PROCESS * 100, 100 - e.PROCESS * 100);
				});
			}
		}
	});

	/**
	 * 注册用户数、投资数、投资次数
	 */
	$('#zzu_user_all').html('215,540');
	$('#zzu_investment_amount').html('758,496,045.00');
	$('#zzu_investment_num').html('104,140');
	/*common.ajaxUtil('n/scattered/loanStatistic.json', null, 'GET', function(data) {
		common.putTemplete("zzu_section-overview", {
			userAll: '43,108',
			investmentAmount: '151,699,209.00',
			investmentNum: '20,828'
		}, "zzu_summary_user");
	});*/

	/**
	 * 用户评论
	 */
/*	var avatar = [{
		img:'avatar01',
		name:'黑皮',
		date:'2016-01-15',
		describe:'以前都是50元理财 现在1元即可，项目都是车辆周转或者车辆抵押，风险相对来说比较小'
	},
	{
		img:'avatar02',
		name:'小于',
		date:'2016-01-10',
		describe:''
	},
	{
		img:'avatar03',
		name:'',
		date:'',
		describe:'好滴很～'
	},
	{
		img:'avatar04',
		name:'Rio',
		date:'2015-11-27',
		describe:'优点是：1元即可投，标期限短，项目安全，缺点是：信息披露需要增强，APP仍需要再优化'
	},
	{
		img:'avatar05',
		name:'大河报小编一枚',
		date:'2015-11-20',
		describe:''
	},
	{
		img:'avatar06',
		name:'96688小小客服',
		date:'2015-9-16',
		describe:'今天去参观了网交所，体验了下网交所理财，还不错。以后咱中原银行和网交所多多合作，多多交流哈～'
	}];
//	common.putTemplete('zzu_evaluation_list',avatar,'zzu_evaluation');
*/	$('.scrollbar-inner').scrollbar();

	/**
	 * 生成收益曲线图
	 */
	echarCommon.createLine('zzu_chartCompare', [ '银行定期存款', '基金投资', '网交所' ], [ 1.5, 5, 12 ], '收益对比');
	
});