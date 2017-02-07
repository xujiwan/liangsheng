define([ 'jquery', 'common', 'util/jquery.huifu','accountsPublic','config' ], function($, common, hf) {
	var putData = function(tag) {
		common.putTemplete("zzu_cardsList_tem", {cards:tag}, "zzu_cartsList");
		$(".zzu-btn-del").on('click', function() {
			var cardId = $(this).attr('data');
			var param = {
				card_number: cardId
			}
			common.ajaxUtil('bankcards/delcard.json', param, 'POST', function(data){
				if('1111' == data.code){
					common.showMessage('删除'+data.message);
					common.ajaxUtil('bankcards/bankCardList.json', null, 'GET', putData);
				}else{
					common.showMessage(data.message);
				}
			});
		});

		/**
		 * 绑卡
		 */
		$("#zzu_addCard").on('click', function() {
			var el = document.createElement("a");
			document.body.appendChild(el);
			el.href = SslUrl +'/hf_public.html#zzu_hf_UserBindCard'; //url 是你得到的连接
			el.target = '_blank'; //指定在新标签页打开
			el.click();
			document.body.removeChild(el);
			$('#zzu_card_confirm').modal('show');
		});
	};
	common.ajaxUtil('bankcards/bankCardList.json', null, 'GET', putData);
	
	/**
	 * 绑卡成功
	 */
	$('#zzu_card_dialog_ok').on('click',function(){
		$('#zzu_card_confirm').modal('hide');
		common.ajaxUtil('bankcards/bankCardList.json', null, 'GET', putData);
	});

	/**
	 * 排序
	 */
	$("#zzu_bank_order").find('a').on('click', function() {
		$(this).parent().addClass('active').siblings('dd').removeClass('active');
		var param = {
				order:'desc'
		}
		common.ajaxUtil('bankcards/bankCardList.json', param, 'GET', putData);
	});

});