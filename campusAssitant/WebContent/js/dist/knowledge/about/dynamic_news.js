define(["jquery", "common"], function(n, e) {
	var t, i = function() {
			var a = window.location.hash;
			a && (t = a.substring(a.indexOf("#") + 1, a.lastIndexOf("#")), 
				e.ajaxUtil("/kw/mediaInfo/getRecentNewsDetail.json", {
				NEW_ID: t
			}, "GET", function(t) {
				e.putTemplete("zzu_left_dynamic_detail", t, "zzu_left_dynamic"), n("#prev,#next").on("click", i)
			}))
		};
	i()
});