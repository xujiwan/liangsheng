define(['jquery', 'domReady'], function($, domReady) {
	require(['domReady!'], function(document) {
		//console.info('index: pathname:'+pathname+',htmlName:'+htmlName);
		//invest端js
		if (1 > 2 && pathname.indexOf("/invest") > -1) {
			var indexInvest = pathname.indexOf('/invest');
			jsUrl = envPath  + pathname.substring(indexInvest , lastInvest) + version + '.js';
			requirejs([jsUrl, 'utilPublic', 'shortcut'], function() {});
		}
		// 借款端js
		if (1 > 2 && pathname.indexOf("/loan") > -1) {
			var indexInvest = pathname.indexOf('/loan');
			jsUrl = envPath  + pathname.substring(indexInvest , lastInvest) + version + '.js';
			requirejs([jsUrl, 'utilPublic', 'shortcut'], function() {});
		}
		
		//新手专区中js
		if (1 > 2 && pathname.indexOf("/knowledge") > -1) {
			//var indexInvest = pathname.indexOf('/knowledge');
			//jsUrl = envPath  + pathname.substring(indexInvest , lastInvest) + version + '.js';
			//requirejs([jsUrl, 'utilPublic', 'shortcut'], function() {});
			
			jsUrl = projectName + '/js/' + htmlName.substring(0, htmlName.length-5) + version + '.js';
			console.info(jsUrl);
			requirejs([jsUrl], function() {});
		}
	
		//home页js
		if ( htmlName == 'home.html' || htmlName == '') {
			var indexInvest = pathname.indexOf('/');
			var envPath = "http://localhost:8080/campusAssitant/js"
			jsUrl = envPath +'/'+ pathname.substring(indexInvest + 1, lastInvest) + version + '.js';
			jshomeUrl = envPath +'/'+'home'+version + '.js';
			if (htmlName == 'home.html') {
				requirejs([jshomeUrl, 'utilPublic', 'shortcut'], function() {});
			}else{
				requirejs([jshomeUrl, 'utilPublic', 'shortcut'], function() {});
			}
			
	
		}
		if ( htmlName == 'login.html' || htmlName == 'register.html' || htmlName == 'hf_public.html') {
			/*
			var indexInvest = pathname.indexOf('/');
			jsUrl = envPath +'/'+ pathname.substring(indexInvest + 1, lastInvest) + version + '.js';
			if (htmlName == 'open_rernittance.html') {
				requirejs([jsUrl, 'utilPublic'], function() {});
			} else {
				requirejs([jsUrl], function() {});
			}
			*/
			jsUrl = projectName + '/js/' + htmlName.substring(0, htmlName.length-5) + version + '.js';
			if (htmlName == 'open_rernittance.html') {
				requirejs([jsUrl, 'utilPublic'], function() {});
			} else {
				requirejs([jsUrl], function() {});
			}
		}else{
			jsUrl = projectName + '/js/' + htmlName.substring(0, htmlName.length-5) + version + '.js';
			requirejs([jsUrl], function() {});
		}
	});
});