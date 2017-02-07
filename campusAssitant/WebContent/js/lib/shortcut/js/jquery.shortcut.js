/**
 * Created by Administrator on 2015/9/14 0014.
 */
;(function($){
    //加入收藏夹
    function favoriteFun(){
        var sTitle=document.title;
        var sURL=document.location.href;
        try{
            if(document.all){
                window.external.AddFavorite(sURL,sTitle);
            }else if(window.sidebar){
                window.sidebar.addPanel(sTitle,sURL,"");
            }else{
                var msg = "请使用CTR+D快捷键进行添加";
                showMsg(msg,'favorite');
            }
        }catch(e){
            var msg = "请使用CTR+D快捷键进行添加";
            showMsg(msg,'favorite');
        }
    }
    function qqFun(){
        window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA2MjQzNl8yMzI3OTdfNDAwODg4MDE3Nl8yXw');
    }
    function feedbackFun(){
        showFeedBack();

    }
     function feedbackFunT(){
        showFeedBackT();

    }
    function submitFeedBack(){
        var contact =  $("#contact").val();
        var content = $("#content").val();
        if(!contact || $.trim(contact) == ""){
            $("#feedback-error").text("请留下手机号/QQ/Email");
            return;
        }
        if(!content || $.trim(content) == ""){
            $("#feedback-error").text("请填写您要反馈的问题");
            return;
        }
        $("#feedback-error").text('');
        $("#content_box_tool_close").trigger("click");
        var url = $.fn.shortcut.defaults.url,params = {contact:contact,content:content};
        $.ajax({
            url : url,
            type : "POST",
            dataType : 'json',
            data : params,
            success: function(data){
                showMsg("反馈成功","feedback");
            },
            error :function(data){
                showMsg("反馈失败","feedback");
            }
        });
//        var o = new AjaxOpts();
//        o.put("service_code", "H0001");
//        o.put("contact", contact);
//        o.put("content", content);
//        o.sus = function(data) {
//            showMsg("反馈成功","feedback");
//        };
//        o.error = function(data){
//            showMsg("反馈失败","feedback");
//        };
//        $.ajax(o);
    }
    function gotopFun(){
        $('body,html').stop().animate({
            'scrollTop': 0,
            'duration': 100,
            'easing': 'ease-in'
        })
    }

    function scrollEventFun(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop > 50) {
            $("#shortcut-gotop").addClass("scroll");
        }else{
            $("#shortcut-gotop").removeClass("scroll");
        }
    }

    function switchFun(){
        $("ul > li").hover(function(){
            $(this).addClass("hover");
        },function(){
            $(this).removeClass("hover");
        });
    }

    function showMsg(msg,type){
        var _cssPosition =  $.fn.shortcut.defaults.type[type];
        var _msgCss = $.extend({} ,$.fn.shortcut.defaults[_cssPosition] , $.fn.shortcut.defaults.msgCss);
        var $msgBox = $('<div id="msg_box" class="msg-box"><div class="msg-box-notice"><div class="msg-box-notice-content" id="msg_box_notice_content"></div></div> </div>');
        $msgBox.css(_msgCss)
            .find("#msg_box_notice_content").html(msg).end()
            .appendTo("body")
            .fadeIn(500)
            .one("destory",function(){
                setTimeout(function(){
                    $msgBox.remove();
                },3000);
            })
            .trigger("destory");
    }

    function showFeedBack(){
        var $contentBox = $('<div id="contentBox" class="content-box"><div class="content-box-tool"> <a class="content-box-tool-close" id="content_box_tool_close">X</a> </div> <div class="content-box-body"> <div class="feedback-box">'+
            '<div class="feedback-box-title"> <span class="feedback-title-prefix"></span> <span class="feedback-title">用户反馈</span> <span class="feedback-title-suffix"></span> </div>'+
            '<div class="feedback-concat"> <input class="feedback-concat-input" id="contact" name="contact" type="text" maxlength="50" placeholder="请留下手机号/QQ/Email"> </div>'+
            '<div class="feedback-content"> <div class="feedback-content-label"> 问题/建议 </div>'+
            '<div class="feedback-content-input"> <textarea class="feedback-content-textarea" id="content" name="content" maxlength="250"  placeholder="请填写您要反馈的问题"></textarea> </div> </div>'+
            '<div class="feedback-error" id="feedback-error"></div> <div class="feedback-tool"> <input  class="feedback-tool-btn" id="submitBtn" type="button" value="提交反馈"> </div> </div> </div> </div>');
        $contentBox.css($.fn.shortcut.defaults.feedBackPosition)
            .appendTo("body")
            .fadeIn(500)
            .find("#content_box_tool_close").bind("click",function(){
                $contentBox.remove();
            }).end()
            .find("#submitBtn").bind("click",function(){
                submitFeedBack();
            });
    }
    function showFeedBackT(){
        var $contentBoxT = $('<div id="contentBox" class="content-boxT"><img src="images/foot/secretary.png" /></div>');
        $contentBoxT.css($.fn.shortcut.defaults.feedBackPositionT)
            .appendTo("body")
            .fadeIn(500)
          
           	$("#shortcut-feedbackT").mouseover(function(){
  					 $contentBoxT.show();
				});
				$("#shortcut-feedbackT").mouseout(function(){
  					 $contentBoxT.hide();
				});
           
    }

    function createShortCut(){
        /*var shortCutHtml = '<div id="shortcut" class="shortcut shortcut-position">' +
            '<ul id="shortcut-middle" class="shortcut-middle">' +
            '<li id="shortcut-favorite" class="shortcut-favorite"><a class="favorite">收藏本站</a> </li>' +
            '<li id="shortcut-feedbackT" class="shortcut-feedbackT"><a class="feedbackT">公众平台</a> </li>' +
            '<li id="shortcut-qq" class="shortcut-qq">  <a class="qq">在线客服</a> </li>' +
            '<li id="shortcut-feedback" class="shortcut-feedback"><a class="feedback">用户反馈</a> </li>' +
            '<li id="shortcut-gotop" class="shortcut-gotop"> <a class="gotop">返回顶部</a> </li> </ul> </div>';
        $(shortCutHtml).css($.fn.shortcut.defaults.position).appendTo("body");*/
    }
    function bindEvent(){
        $("#shortcut-favorite").bind("click",favoriteFun);
        $("#shortcut-feedbackT").bind("mouseenter",feedbackFunT);
        $("#shortcut-qq").bind("click",qqFun);
        $("#shortcut-feedback").bind("click",feedbackFun);
        $("#shortcut-gotop").bind("click",gotopFun);
        $(window).scroll(function(){
            scrollEventFun();
        });
        switchFun();
    }

    $.fn.shortcut = function(options){
        $.extend($.fn.shortcut.defaults,options || {});
        createShortCut();
        bindEvent();
    }
    $.fn.shortcut.defaults = {
        type : {
            feedback : 'feedBackPosition',
            feedbackT : 'feedBackPositionT',
            favorite : 'favoritePostion'
        },
        //位置
        position : {
            position: 'fixed',
            right: 0,
            bottom:25
        },
        //用户反馈位置
        feedBackPosition : {
            width: 275,
            height: 400,
            bottom: 75
        },
        //平台公告位置
        feedBackPositionT : {
            width: 149,
            height: 172,
            bottom: 135
        },
        //收藏提示位置
        favoritePostion : {
            width: 275,
            height: 60,
            bottom: 245
        },
        //消息提示框样式
        msgCss : {
            width: 275,
            height: 60
        }
    }
})(jQuery);
$(function(){
    $.fn.shortcut({url:'http://tlb.zzuchina.com/i/n/feedBack/postFeedBack'});
});