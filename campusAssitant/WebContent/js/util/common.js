define([ 'jquery', 'temp', 'bs' ], function($,tmp,bs) {
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
		console.info('ur1l:'+url);
		/*if (url) {
			var protocol = window.location.protocol;
			var flag = false,URI;
			if (protocol.indexOf('https')  != -1) {
				flag = true;
			} 
			URI = "localhost:8080/campusAssitant/";
			if(url.indexOf('/l/n/') > -1){
				url = URI+ url;
			}else if(url.indexOf('/kw/') > -1){
				url = URI +  url;
			}else{
				url = URI + '/i/' + url;
			}
				
			$.ajax({
				type: type,
				url: url,
				data: data,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				cache: false,
				timeout: 60000,
				success: function(dataMap) {
					var code = dataMap.code;
					if ('1005' == code && url.indexOf('n/checkUser/isLogin') < 0) {
						common.goUrl('login.html');
					}
					if('9999' == code){
						common.showMessage(dataMap.message);
					}else{
						successfun(dataMap);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
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
		}*/
		
		
		if (url) {
			if(url.indexOf('/l/n/') > -1){
				url = SslUrl + url;
			}else{
				url = SslUrl + '/i/' + url;
			}
			console.info(url);
			
			$.ajax({
				type: 'POST',
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
		if ('' == url || 'home.html' == url || '404.html' == url || url.indexOf('error.html') > -1 ) {
			location.href = NotSslUrl + '/' + url;
		}else if('login.html' == url || 'register.html' == url){
			location.href = SslUrl + '/' + url;
		} else {
			location.href = SslUrl + '/invest/' + url;
		}
	};

	// 四舍五入，保留两位小数
	common.retainTwoDecimal = function(floatVal) {
		if ($.isNumeric(floatVal)) {
			var tmp = Math.round(parseFloat(floatVal) * 100) / 100;
			var tmpStr = tmp.toString();
			var decimalPos = tmpStr.indexOf('.');
			if (decimalPos < 0) {
				decimalPos = tmpStr.length;
				tmpStr += '.';
			}
			while (tmpStr.length <= decimalPos + 2) {
				tmpStr += '0';
			}
			return tmpStr;
		}
	}

	/**
	 * 格式化金额
	 * 
	 * @param {Object}
	 *            str
	 */
	common.formatMoney = function(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	}

	/**
	 * 反格式化金额
	 */
	common.rmoney = function(money) {
		if (money) {
			return parseFloat(money.replace(/[^\d\.-]/g, ""));
		}
		return '0.00';
	}

	/**
	 * 复制
	 */
	common.copyUrl = function(textInfo) {
		if (window.clipboardData) {
			window.clipboardData.setData("Text", textInfo);
		} else if (window.netscape) {
			netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip)
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans)
				return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			str.data = textInfo;
			trans.setTransferData("text/unicode", str, textInfo.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip)
				return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
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
	common.sendValidateSMS = function(phone, id, captchaId,type) {
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
	};

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
		var $dialog = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
				+ '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">'
				+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h4 class="modal-title" id="myModalLabel">'
				+ title + '</h4>' + '</div>' + '<div class="modal-body">' + message + '</div>' + '<div class="modal-footer" id="zzu_modal_foot">'+buts+'</div>'
				+ '</div>' + '</div>' + '</div>');
		$dialog.appendTo("body");
		// 把按钮添加到对话框中
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
