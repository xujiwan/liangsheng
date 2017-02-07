var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPaht = curWwwPath.substring(0, pos);
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
var htmlName = pathname.substring(projectName.length + 1);
var envPath = '';
var version = '';

var BaseUrl = "http://localhost:8080/campusAssitant";
var isDevEnv = true;
var NotSslUrl = BaseUrl;
var SslUrl = BaseUrl;
if (BaseUrl) {
	var index = BaseUrl.indexOf('https');
	if (index != -1) {
		NotSslUrl = 'http' + BaseUrl.substr(index + 5); 
		var BaseUrl = "http://localhost:8080/campusAssitant";
		var HFINTER_URL = "http://mertest.chinapnr.com/muser/publicRequests"
		var isDevEnv = false;
		var SslUrl = BaseUrl;
		var NotSslUrl = BaseUrl;
		var pathname = location.pathname;  //完整路径
		var htmlName = pathname.substr(pathname.lastIndexOf("/") + 1); //页面名称name.html
		var version = '-2.0.1.min'; //js压缩版本号
		var versionCss = '-all-2.0.1.min'; //css压缩版本号
		var lastInvest = pathname.indexOf('.html'); //提取.html字符在路径中的位置数
		var envPath; //访问js的前半部路径
		var pageUrl = NotSslUrl + '/invest/'; 
		if (BaseUrl) {
			var index = BaseUrl.indexOf('https');
			if (index != -1) {
				NotSslUrl = 'http' + BaseUrl.substr(index + 5);
			} else {
				index = BaseUrl.indexOf('http');
				SslUrl = (isDevEnv ? 'http' : 'https') + BaseUrl.substr(index + 4);
			}
		}
		var linkPath;
		if (isDevEnv) {
			envPath = '/campusAssitant/js/source';
			version = '';
			versionCss = '-all-2.0.1';
			if (lastInvest < 0) {
				linkPath = '<link href="css/all/home' + versionCss + '.css" rel="stylesheet">';
			} else {
				var indexInvest = pathname.indexOf('/');
				linkPath = '<link href="css/all/' + pathname.substring(indexInvest + 1, lastInvest) + versionCss + '.css" rel="stylesheet">';
			}
		}
		if (!isDevEnv) {
			envPath = '/campusAssitant/js/dist';
			if (lastInvest < 0) {
				linkPath = '<link href="css/dist/home' + versionCss + '.css" rel="stylesheet">';
			} else {
				var indexInvest = pathname.indexOf('/');
				linkPath = '<link href="css/dist/' + pathname.substring(indexInvest + 1, lastInvest) + versionCss + '.css" rel="stylesheet">';
			}
		}
		document.write(linkPath);
	} else {
		index = BaseUrl.indexOf('http');
		SslUrl = (isDevEnv ? 'http' : 'https') + BaseUrl.substr(index + 4);
	}
}
/*var pageUrl = NotSslUrl+'/invest/';*/