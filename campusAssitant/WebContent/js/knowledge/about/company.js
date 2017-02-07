define(['jquery', 'common', 'util/validate', 'util/jquery.huifu', 'accountsPublic'], function($, common, validate, hf) {
	$(".wjs-btnspan span:eq(0)").click(
		function() {
			$(".wjs-box").find(".wjs-imgbox").animate({marginLeft: -238 * 0})
		})
	$(".wjs-btnspan span:eq(1)").click(
		function() {
			$(".wjs-box").find(".wjs-imgbox").animate({marginLeft: -238 * 1})
		})
});