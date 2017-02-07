define(['jquery', 'domReady'], function($, domReady) {
	require(['domReady!'], function(document) {
		//invest端js
		if (pathname.indexOf("/invest") > -1) {
			var indexInvest = pathname.indexOf('/invest');
			jsUrl = envPath  + pathname.substring(indexInvest , lastInvest) + version + '.js';
			requirejs([jsUrl, 'utilPublic', 'shortcut'], function() {});
		}
		//home页js
		if (htmlName == 'home.html' || htmlName == '') {
			var indexInvest = pathname.indexOf('/');
			jsUrl = envPath +'/'+ pathname.substring(indexInvest + 1, lastInvest) + version + '.js';
			jshomeUrl = envPath +'/'+'home'+version + '.js';
			if (htmlName == 'home.html') {
				requirejs([jsUrl, 'utilPublic', 'shortcut'], function() {});
			}else{
				requirejs([jshomeUrl, 'utilPublic', 'shortcut'], function() {});
			}
		}
		if ( htmlName == 'login.html' || htmlName == 'register.html' || htmlName == 'hf_public.html') {
			var indexInvest = pathname.indexOf('/');
			jsUrl = envPath +'/'+ pathname.substring(indexInvest + 1, lastInvest) + version + '.js';
			if (htmlName == 'open_rernittance.html') {
				requirejs([jsUrl, 'utilPublic'], function() {});
			} else {
				requirejs([jsUrl], function() {});
			}
		}
	});
});