define(['jquery', 'common', 'lib/qrcode.min','util/validate','accountsPublic','page'], function($, common, qrcode,validate,page) {
	
	/**
	 * 手机端分享url
	 */
	var mobileUrl;
	
	/**
	 * pc端分享url
	 */
	var pcUrl;
	/**
	 * 取推荐码
	 */
	var recommendCode = common.getItemSession('recommend');
	if(validate.isNotNull(recommendCode)){
		mobileUrl = BaseUrl+'/mobile/views/activity/redPacket/red_Packet.html?recommend='+recommendCode;
		pcUrl = BaseUrl+'/register.html?recommend='+recommendCode;
		$('#zzu_recommend_url').html('<a href='+mobileUrl+'>查看详情</a>');
		$('#zzu_recommend_code_pc').html(pcUrl);
	}else{
		common.ajaxUtil('recommendFriend/getRecommendCode.json',null,'GET',function(data){
			if(data.recommendCode){
				recommendCode = data.recommendCode;
			}
			mobileUrl = BaseUrl+'/mobile/views/activity/redPacket/red_Packet.html?recommend='+recommendCode;
			pcUrl = BaseUrl+'/register.html?recommend='+recommendCode;
			$('#zzu_recommend_url').html('<a href='+mobileUrl+'>查看详情</a>');
			$('#zzu_recommend_code_pc').html(pcUrl);
		});
	};
	
	/**
	 * 复制链接
	 */
	$('.zzu-copy').on('click', function() {
		common.copyUrl(pcUrl);
	});
	/**
	 * 取推荐信息
	 */
	common.ajaxUtil('recommendFriend/getRecommendInfo.json',null,'GET',function(data){
		if(data.cashAmount){
			$('#zzu_cash_amount').html(data.cashAmount);
		}
		if(data.bonus){
			$('#zzu_bonus').html(data.bonus);
		}
		if(data.regCount){
			$('#zzu_reg_count').html(data.regCount);
		}
		if(data.investReg){
			$('#zzu_invest_reg').html(data.investReg);
		}
	});
	/**
	 * 取推荐记录
	 */
	function loadRecommendList(pageNo,pageSize){
			var _pageNo = pageNo || 1,_pageSize = pageSize || 8;
			var start = (_pageNo-1)*_pageSize,length = _pageSize;
			var pageData = {"start":start,"length":length,
					        "columns":[
					       	{"data":"tel","name":"tel"},
					       	{"data":"time","name":"time"},
					       	{"data":"usr_custid","name":"usr_custid"},
					       	{"data":"bonus","name":"bonus"},
					       	{"data":"STATE","name":"STATE"}
					       ],
					       "order":[{
					    	   "column":"1","dir":"desc"
					       	}]
					       };
		common.ajaxUtil('recommendFriend/recommendList.json',{pageData:JSON.stringify(pageData)},'POST',function(data){
			common.putTemplete("zzu_recommend_people_tem", data.data, "zzu_recommend_people");
			$.zzuPage({pageId:'pageContainer',		
				pageNo		: 	_pageNo,
				pageSize	:	_pageSize,
				totalCount	:	data.recordsFiltered,
				load		:	loadRecommendList
			});
		});
	}
	
	loadRecommendList();


	$('#zzu_weibo_share').on('click', function() {
		if (pcUrl) {
			window.open('http://service.weibo.com/share/share.php?title=用我的推荐码注册，可得10000元体验金，登录' + pcUrl + '参加活动吧。&pic=http://www.zzuchina.com/images/nv_logo.png');
		}
	});

	
	$(document).on('click', function() {
		$('#zzu_show_error').html('');
		$('#zzu_sms_share,#zzu_weixin_share').removeClass('active');
		
	});
	

	
	/**
	 * 生成二维码图片
	 */
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		width: 137,
		height: 137
	});

	var makeCode = function() {
		qrcode.makeCode(mobileUrl);
	}
	
	$('#zzu_weixin_share').on('click',makeCode);
	
	/**
	 * 验证码
	 */
	$('#zzu_captcha_img').on('click', function() {
		$(this).attr("src", "/i/n/images/captcha.jpg?" + Math.random());
	});
	$('#zzu_captcha_img').trigger("click");
	
	/**
	 * 微信分享 和短信分享按钮单击
	 */
	$('#zzu_sms_share,#zzu_weixin_share').on('click', function(ev) {
		$(this).addClass('active').siblings().removeClass('active');
		ev.stopPropagation();
		
	});
	
	/**
	 * 短信分享发送按钮点击事件
	 */
	$('#zzu_btn_confirm').on('click',function(){
		var tel = $('#zzu_share_phone').val();
		var vat = $('#zzu_vat').val();
		if(!(validate.isPhoneNumber(tel))){
			$('#zzu_share_phone').val('').focus();
			$('#zzu_captcha_img').trigger("click");
			$('#zzu_show_error').html('手机号格式不正确');
			return;
		}
		if(!validate.isNotNull(vat)){
			$('#zzu_vat').focus();
			$('#zzu_captcha_img').trigger("click");
			$('#zzu_show_error').html('图形验证码不能为空');
			return;
		}
		
		
		common.ajaxUtil('n/captcha/check.json',{captcha:vat},'POST',function(data){
			if('1111' == data.code){
				common.ajaxUtil('recommendFriend/sharemessage.json',{tel:tel,vat:vat},'POST',function(data){
					if(data.message){
						$('#zzu_show_error').html(data.message);
						$('#zzu_share_phone').val('');
						$('#zzu_vat').val('');
						$('#zzu_captcha_img').trigger("click");
					}
				});
			}else{
				$('#zzu_vat').val('');
				$('#zzu_captcha_img').trigger("click");
				$('#zzu_show_error').html(data.message);
			}
		});
	});
	
	
	
});
