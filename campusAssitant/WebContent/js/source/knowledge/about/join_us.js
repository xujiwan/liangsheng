define(['jquery', 'common', 'util/validate'], function($, common, validate) {
	$(".zzu-leftNav").on('click', function() {
		$(this).addClass('zzu-leftnav-bg').siblings().removeClass('zzu-leftnav-bg');
		var postId = $(this).attr('id');
		$(".zzu-right-box").find('.zzu-leftnav-introduce').hide();
		$(".zzu-right-box").find('#' + postId + '_introduce').show();
		
	});
});