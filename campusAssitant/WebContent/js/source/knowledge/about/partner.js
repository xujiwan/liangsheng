define(['jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic'], function($, common, validate, hf) {
	$(".zzu-container-box").find('.zzu-partner').on('click', function() {
		$(".zzu-container-box").find('.zzu-partner').removeClass('zzu-partner-after');
		var partnerId = $(this).attr('id');
		$(".zzu-container-box").find('#' + partnerId + '_partner').show().siblings().hide();
		$(".zzu-container-box").find('#' + partnerId ).addClass('zzu-partner-after');
	});
});