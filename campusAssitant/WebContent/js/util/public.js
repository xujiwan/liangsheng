define([ 'jquery','common'], function($,common) {
	/**
	 * 顶部显示和隐藏
	 */
	common.ajaxUtil('n/checkUser/isLogin.json', null, 'GET',function(data){
		if('1111' == data.code){
			$('.zzu-no-login').addClass('zzu-hidden');
			$('.zzu-login').removeClass('zzu-hidden');
		}else{
			$('.zzu-login').addClass('zzu-hidden');
			$('.zzu-no-login').removeClass('zzu-hidden');
		}
	});

	/**
	 * 退出
	 */
	$("#zzu_exit").on('click', function() {
		common.showMessage('确定要退出吗？','confirm',function(){
			var success = function() {
				common.removeItemSession('hfCode');
				common.removeItemSession('sessionId');
				common.removeItemSession('recommend');
				common.goUrl('login.html');
			};
			common.ajaxUtil('n/user/logout.json', null, 'POST', success, null);
		});
	});

	var pathname = location.pathname;
	if (pathname.indexOf('home.html') > 0 || '/' == pathname) {
		$("#zzu_nav_header").find("li:first-child").addClass("active").siblings().removeClass("active");
	}
	;
	if (pathname.indexOf('product/') > 0) {
		$("#zzu_nav_header").find("li:nth-child(2)").addClass("active").siblings().removeClass("active");
	}
	if (pathname.indexOf('loan/') > 0) {
		$("#zzu_nav_header").find("li:nth-child(3)").addClass("active").siblings().removeClass("active");
	}
	;
	// 头部导航
	var $navBg = $('#zzu_navBg');
	// 存储当前导航项
	var currentIndex = $('#zzu_nav_header > li.active').index();
	$('#zzu_nav_header > li').hover(function() {
		$(this).siblings().removeClass('active');
		if ($(this).find('.zzu-sub-menu').get(0)) {
			$(this).addClass('focus').siblings().removeClass('focus');
			$navBg.addClass('focus');
		}
	}, function() {
		$(this).removeClass('focus');
		$navBg.removeClass('focus');
		// 恢复之前的当前项
		~currentIndex && $('#zzu_nav_header > li').eq(currentIndex).addClass('active');
	});
	
	/**
	 * 友情链接
	 */
	/*var friendLink = common.getItemSession('friend_link');
	if(friendLink){
		common.putTemplete('zzu_friend_link_tem', JSON.parse(friendLink), 'zzu_friend_link');
	}else{
		var success = function(data) {
			if (data.code) {
				common.showMessage(data.message);
			} else {
				common.putTemplete('zzu_friend_link_tem', data, 'zzu_friend_link');
				
				common.setItemSession('friend_link',JSON.stringify(data));
			}
		};
		common.ajaxUtil('n/friendlink/friendLink.json', null, 'GET', success);
	}*/
});