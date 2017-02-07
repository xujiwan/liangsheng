define(['jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic'], function($, common, validate, hf) {
	$(".zzu-btnspan span:eq(0)").click(
		function() {
			$(".zzu-box").find(".zzu-imgbox").animate({marginLeft: -238 * 0})
		})
	$(".zzu-btnspan span:eq(1)").click(
		function() {
			$(".zzu-box").find(".zzu-imgbox").animate({marginLeft: -238 * 1})
		})
});