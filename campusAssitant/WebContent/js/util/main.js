var invest_path = '../invest/js/';
var loan_path = '../loan/js/';
var forum_path = '../forumChair/js/';
requirejs.config({
	baseUrl: '/campusAssitant/js/',
	paths: {
		'jquery': 'lib/jquery-1.11.2.min',
		'bs': 'lib/bootstrap/js/bootstrap.min',
		'domReady': 'lib/domReady',
		'echarts': 'lib/echarts.main',
		'common': 'util/common',
		//'config': 'util/config',
		//'common': 'common',
		'temp': 'lib/jquery.tmpl.min',
		'accountsPublic':'util/accounts_public',
		'page' : 'lib/jquery-page-1.2/jquery.page.custom',
		'scrollbar':'lib/scrollbar/js/jquery.scrollbar',
		'shortcut':'lib/shortcut/js/jquery.shortcut',
		'datepicker':'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker.min',
		'datepickerCn':'lib/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
		'utilPublic':'util/public'
	},
	shim: {
		'echarts': {
			exports: 'echarts'
		},
		'bs': {
			deps: [ 'jquery' ],
			exports: 'bs'
		},
		'datepicker': {
			deps: ['bs' ],
			exports: 'datepicker'
		},
		'datepickerCn': {
			deps: ['datepicker' ],
			exports: 'datepickerCn'
		},
		'common': {
			deps: [ 'jquery' ],
			exports: 'common'
		},
		'temp': {
			deps: [ 'jquery' ],
			exports: 'temp'
		},
		'page' : {
			deps:['jquery'],
			exports : 'page'
		},
		'scrollbar' : {
			deps:['jquery'],
			exports : 'scrollbar'
		},
		'shortcut' : {
			deps:['jquery'],
			exports : 'shortcut'
		}
	},
	deps: [ 'util/index' ],
	waitSeconds: 0
});
requirejs.onError = function(err) {
	/*if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}
	console.log(err);
	throw err;*/
};
