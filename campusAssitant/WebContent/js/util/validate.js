define([ 'jquery' ], function($) {
	var validate = new Object();

	/**
	 * 验证手机号
	 */

	validate.isPhoneNumber = function(tel) {
		var reg = /^(13[0-9]|14[57]|15[0-35-9]|17[0678]|18[0-9])\d{8}$/g;
		return reg.test(tel);
	};

	/**
	 * 验证是字母
	 */
	validate.isLetter = function(tel) {
		var reg = /^[A-Za-z]+$/;
		return reg.test(tel);
	};

	/**
	 * 验证密码
	 */
	validate.isPas = function(pas) {
		if (validate.isNotNull(pas)) {
			if (pas.length < 6) {
				return '密码最少6位';
			}
			if (pas.length > 16) {
				return '密码最长16位';
			}
			return 'true';
		}
		return '密码不能为空';
	}

	/**
	 * 是否为空
	 */
	validate.isNotNull = function(exp) {
		if (exp && typeof (exp) != "undefined" && exp != '' && exp != 'undefined') {
			return true;
		}
		;
		return false;
	};

	/**
	 * 是数字
	 */
	validate.isNumber = function(number) {
		return /^[1-9]{1}\d*$/g.test(number);
	};

	/**
	 * 是邮箱
	 * 
	 * @param {Object}
	 *            email
	 */
	validate.isEmail = function(email) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return reg.test(email);
	};

	/**
	 * 验证金额
	 * 
	 * @param {Object}
	 *            money
	 */
	validate.checkMoney = function(_keyword) {
		if (_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00") {
			_keyword = "0";
			return false;
		} else {
			var index = _keyword.indexOf("0");
			var length = _keyword.length;
			if (index == 0 && length > 1) {/* 0开头的数字串 */
				var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
				if (!reg.test(_keyword)) {
					return false;
				} else {
					return true;
				}
			} else {/* 非0开头的数字 */
				var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
				if (!reg.test(_keyword)) {
					return false;
				} else {
					return true;
				}
			}
			return false;
		}
	};

	/**
	 * 金额差值
	 */

	validate.amountDifference = function(maxMoney, minMoney) {
		if (maxMoney && minMoney) {
			maxMoney = parseFloat(maxMoney);
			minMoney = parseFloat(minMoney);
			return maxMoney - minMoney;
		}
		;
		return -1;
	};

	/**
	 * 验证微信号
	 */
	validate.isWeChat = function(weChat) {
		if (validate.isNotNull(weChat)) {
			if (weChat.length < 3) {
				return '微信号不正确';
			}
			if (weChat.length > 18) {
				return '微信号不正确';
			}
			return 'true';
		}
		return '微信号不能为空';
	}

	return validate;
})