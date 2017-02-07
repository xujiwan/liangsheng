define(['jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic'], function($, common, validate, hf) {
	$(".wjs-container-box").find('.wjs-partner').on('click', function() {
		$(".wjs-container-box").find('.wjs-partner').removeClass('wjs-partner-after');
		var partnerId = $(this).attr('id');
		$(".wjs-container-box").find('#' + partnerId + '_partner').show().siblings().hide();
		$(".wjs-container-box").find('#' + partnerId ).addClass('wjs-partner-after');
	});
});