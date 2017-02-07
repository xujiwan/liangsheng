define(["jquery", "echars-common", "common", "util/validate", "datepicker", "datepickerCn", "accountsPublic", "page", "bs"], function(a, e, n, t, i, d) {
	var c = 8;
	a(".spinner").hide();
	var r = function(e, t) {
			var i = {},
				d = e || 1,
				c = t || 5,
				o = (d - 1) * c,
				s = c,
				m = {
					start: o,
					length: s,
					columns: [{
						data: "TIME",
						name: "TIME",
						orderable: !0
					}, {
						data: "YEAR",
						name: "YEAR"
					}, {
						data: "DATE",
						name: "DATE"
					}, {
						data: "ISSUE",
						name: "ISSUE"
					}, {
						data: "NEW_ID",
						name: "NEW_ID"
					}, {
						data: "DESCRIPTION",
						name: "DESCRIPTION"
					}],
					order: [{
						column: "0",
						dir: "desc"
					}]
				};
			i.pageData = JSON.stringify(m);
			var l = function(e) {
					a(".spinner").hide(), n.putTemplete("zzu_dynamic_list_tem", e.data, "zzu_dynamic_list"), a.zzuPage({
						pageNo: d,
						pageSize: c,
						totalCount: e.recordsFiltered,
						load: r
					})
				};
			n.ajaxUtil("/kw/mediaInfo/getRecentNewList.json", i, "GET", l, function() {
				a(".spinner").hide()
			})
		};
	r(1, 8), a(".zzu-dynamic-btn").click(function() {
		a(".spinner").show();
		var e, n;
		c += 5, r(1, c), e > n && a(".zzu-dynamic-btn").html("没有可加载项")
	})
});