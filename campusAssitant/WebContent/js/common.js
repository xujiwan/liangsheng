define([ 'jquery', 'temp', 'config', 'bs' ], function($) {
	var common = new Object();
	/**
	 * ajax请求
	 * 
	 * @param {Object}
	 *            url
	 * @param {Object}
	 *            data
	 * @param {Object}
	 *            type
	 * @param {Object}
	 *            success
	 * @param {Object}
	 *            fail
	 */
	common.ajaxUtil = function(url, data, type, successfun, fail) {
		console.info(url);
		if (url) {
			if(url.indexOf('/l/n/') > -1){
				url = SslUrl + url;
			}else{
				url = SslUrl + '/i/' + url;
			}
			console.info(url);
			$.ajax({
				type: type,
				url: url,
				data: data,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				cache: false,
				timeout: 60000,
				success: function(dataMap) {
					console.info('SUCC');
					var code = dataMap.code;
					if (code) {
						if ('1005' == code && url.indexOf('n/checkUser/isLogin') < 0) {
							common.goUrl('login.html');
						}
					}
					successfun(dataMap);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.info('ERR..');
					$('.loading-animation').hide();
					if ($.isFunction(fail)) {
						fail(jqXHR);
					} else {
						if (0 == jqXHR.readyState) {
							common.showMessage('亲，网络不太给力');
						}
						if (404 == jqXHR.readyState || 500 == jqXHR.readyState || 505 == jqXHR.readyState) {
							common.showMessage('服务器偷懒了');
						}
					}
				}
			});
		}
	};

	/**
	 * 模板数据添加
	 * 
	 * @param {Object}
	 *            temId
	 * @param {Object}
	 *            data
	 * @param {Object}
	 *            appendId
	 */
	common.putTemplete = function(temId, data, appendId) {
		if (data) {
			var carHtml = $("#" + temId).html();
			$.template(temId, carHtml);
			$("#" + appendId).empty();
			$.tmpl(temId, data).appendTo("#" + appendId);
		}
		// $("#" + appendId).append($.templates("#" + temId).render(data));
		// $.templates("#" + temId).link("#" + appendId, data);
	};

	/**
	 * 页面跳转
	 * 
	 * @param {Object}
	 *            url
	 */
	common.goUrl = function(url) {
		if ('' == url || 'home.html' == url || 'login.html' == url || 'register.html' == url || '404.html' == url || url.indexOf('error.html') > -1) {
			location.href = SslUrl + '/' + url;
		} else {
			location.href = SslUrl + '/invest/' + url;
		}
	};

	/**
	 * 保存数据
	 */
	common.setItemSession = function(key, value) {
		if (window.sessionStorage) {
			window.sessionStorage.setItem(key, value);
		} else {
			$('body').data(key, value);
		}
	};

	/**
	 * 取数据
	 */
	common.getItemSession = function(key) {
		if (window.sessionStorage) {
			return window.sessionStorage.getItem(key);
		} else {
			return $('body').data(key);
		}
	};

	/**
	 * 删除数据
	 */
	common.removeItemSession = function(key) {
		if (window.sessionStorage) {
			window.sessionStorage.removeItem(key);
		} else {
			$('body').jQueryremoveData(key);
		}
	};

	/**
	 * 发送短信验证码
	 */
/*	common.sendValidateSMS = function(phone, id, captchaId,type) {
		var idObj = $('#' + id);
		if ('already' == idObj.attr('isclick')) {
			return;
		} else {
			idObj.attr('isclick', 'already');
		}
		var param = {
			mobile: phone
		};
		var suc = function(data) {
			if ('1111' == data.code) {
				common.setItemSession(id, '120');
				var i = 120;
				var smsInteral = setInterval(function() {
					if (i !== 0) {
						idObj.empty().html(i-- + '秒后再试');
					} else {
						clearInterval(smsInteral);
						idObj.removeAttr('isclick');
						idObj.empty().html('获取验证码');
						common.removeItemSession(id)
					}
				}, 1000);
			} else {
				if (captchaId) {
					$('#' + captchaId).trigger("click");
				}
				common.showMessage(data.message);
			}
		};
		if('loan' == type){
			common.ajaxUtil('/l/n/sms/send.json', param, 'POST', suc);
		}else{
			common.ajaxUtil('n/sms/send.json', param, 'POST', suc);
		}
	};*/

	/**
	 * 弹出提示框
	 */
	common.showMessage = function(message, type, okFn, cancelFn) {
		var title, buts = '<button type="button" class="btn btn-default" id="zzu_btn_dialog_ok">确定</button>';
		type = type || 'info';
		if ('info' == type) {
			title = '提示';
		}
		if ('confirm' == type) {
			title = '确认信息';
			buts = buts + '<button type="button" class="btn zzu-btn-primary" id="zzu_but_dialog_concel">取消	</button>';
		}
		var dialog = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
				+ '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">'
				+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h4 class="modal-title" id="myModalLabel">'
				+ title + '</h4>' + '</div>' + '<div class="modal-body">' + message + '</div>' + '<div class="modal-footer" id="zzu_modal_foot"></div>'
				+ '</div>' + '</div>' + '</div>';
		// 把对话框体添加到dom元素中
		if ($('#myModal').html()) {
			$('#myModal').remove();
		}
		$('body').append(dialog);
		// 把按钮添加到对话框中
		$('#zzu_modal_foot').html(buts);
		$('#zzu_btn_dialog_ok').on('click', function() {
			$('#myModal').modal('hide');
			if ($.isFunction(okFn)) {
				okFn();
			}
		});
		$('#zzu_but_dialog_concel').on('click', function() {
			$('#myModal').modal('hide');
			if ($.isFunction(cancelFn)) {
				cancelFn();
			}
		});
		// 显示对话框
		$('#myModal').modal('show');
	};

	/**
	 * 日期差值
	 * 
	 * @return 月
	 */
	common.datePoor = function(star, end) {
		if (star && end) {
			starY = star.split('-')[0];
			starM = star.split('-')[1];
			endY = end.split('-')[0];
			endM = end.split('-')[1];
			return (endY - starY) * 12 + (endM - starM);
		}
		return 0;
	};

	/**
	 * 加载中
	 */
	common.loading = function() {
		var dialog = '<div class="modal fade loading-animation" tabindex="-1" role="dialog" aria-hidden="true">' + '<div class="modal-dialog">'
				+ '<div class="spinner">' + '<div class="spinner-container container1">' + '<div class="circle1"></div>' + '<div class="circle2"></div>'
				+ '<div class="circle3"></div>' + '<div class="circle4"></div>' + '</div>' + '<div class="spinner-container container2">'
				+ '<div class="circle1"></div>' + '<div class="circle2"></div>' + '<div class="circle3"></div>' + '<div class="circle4"></div>' + '</div>'
				+ '<div class="spinner-container container3">' + '<div class="circle1"></div>' + '<div class="circle2"></div>' + '<div class="circle3"></div>'
				+ '<div class="circle4"></div>' + '</div>' + '</div>' + '</div>' + '</div>';
		if (!$('.loading-animation').html()) {
			$('body').append(dialog);
		}
		$('.loading-animation').modal('show');
	}

	return common;
})