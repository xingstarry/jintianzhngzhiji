(function(win,doc){
    function change(){
        doc.documentElement.style.fontSize = 20 * document.documentElement.clientWidth / 375 + 'px';
    };
    win.addEventListener('resize',change,false);
    change();
})(window,document);


$(function () {
    var clientH = $(window).height();
    var headH = $('.head').outerHeight();
    var contentH = clientH-headH;
    function  clientHeight(obj) {
        obj.css('minHeight',contentH+'px');
    }
    var homeCon = $('.homeCon');
    var quizCon = $('.quizCon');
    clientHeight(homeCon);
    clientHeight(quizCon);
    $(window).resize(function () {
        clientHeight(homeCon);
        clientHeight(quizCon);
    });
    var pepoleNum = Math.floor(Math.random()*3000)+2000;
    var beatNum = $('.beat em');
    beatNum.html(pepoleNum);

    // ***********************下载app*********************
    function downApp(){
        // 获取终端相关信息
        var Terminal = {
            // 辨别移动终端类型
            platform: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    // android 终端 或uc浏览器
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    // 是否为iPhone 或 QQHD浏览器
                    iPhone: u.indexOf('iPhone') > -1,
                    // 是否 iPad
                    iPad: u.indexOf('iPad') > -1
                };
            }(),
            // 辨别移动终端的语言： zh-ch、en-us、ko-kr、ja-jp ...
            language: (navigator.browserLanguage || navigator.language).toLowerCase()

        };

        // 根据不同的终端，跳转到不同的地址
        var theUrl = '默认下载地址';
        if (Terminal.platform.android) {
            // 安卓下载地址
            theUrl = '此次填写安卓下载地址'
        } else if (Terminal.platform.iPhone) {
            // 苹果下载地址
            theUrl = '苹果下载地址';
        } else if (Terminal.platform.iPad) {
            // 还可以通过Language,区分多国语言版
            switch (Terminal.language) {
                case 'en-us':
                    // 你的iPad APP (英文版) 对应下载地址： APP Store地址
                    theUrl = 'ipad';
                    break;
                case 'ko-kr':
                    // 你的iPad APP (韩语版) 对应下载地址： APP Store地址
                    theUrl = '';
                    break;
                case 'ja-jp':
                    // 你的iPad APP (日文版) 对应下载地址： APP Store地址
                    theUrl = '';
                    break;
                default:
                    // 你的iPad APP (中文-默认) 对应下载地址： APP Store地址
                    theUrl = '';
            }
        }

        location.href = theUrl;
    }
    var borderBtn = $('.borderBtn');
    borderBtn.on('click',function(){
        downApp();
    });

    //************************分享***************************
    var share = $('.share');
    var oShareCancel = $('.shareCon .cancel');
    var oErweimaCancel = $('.erweimaBox .cancel');
    var shareCon = $('.shareCon');
    var shareBox = $('.shareBox');
    var oWeixinBtn = $('.shareCon .weixin');
    var oPengyouquanBtn = $('.shareCon .pengyouquan');
    var oErweimaBox = $('.erweimaBox');
    var oBeatShare = $('.beatShare');
    share.on('click',function () {
        shareBox.stop().fadeIn();
        shareCon.stop().animate({bottom:0},300);
    });
    oBeatShare.on('click',function () {
        shareBox.stop().fadeIn();
        shareCon.stop().animate({bottom:0},300);
    });
    oShareCancel.on('click',function () {
        shareBox.stop().fadeOut();
        shareCon.stop().animate({bottom:'-5rem'},300);
    });
    oWeixinBtn.on('click',function () {
        shareCon.stop().animate({bottom:'-5rem'},300);
        oErweimaBox.stop().animate({bottom:0},300);
    });
    oPengyouquanBtn.on('click',function () {
        shareCon.stop().animate({bottom:'-5rem'},300);
        oErweimaBox.stop().animate({bottom:0},300);
    });
    oErweimaCancel.on('click',function () {
        shareBox.stop().fadeOut();
        oErweimaBox.stop().animate({bottom:'-10.5rem'},300);
    });
    /*$("#code").qrcode({
     render: "table", //table方式
     width: 80, //宽度
     height:80, //高度
     text: "www.baidu.com" //任意内容
     });*/
    $('#code').qrcode("http://www.baidu.com/?a=0"); //任意字符串

/********************阻止返回********************/

// pushHistory();
    window.addEventListener("popstate", function(e) {
        location.href="index.html"
    }, false);
    /*function pushHistory() {
        var state = {
            title: "title",
            url: "https://www.baidu.com/"
        };
        window.history.pushState(state, "title", "https://www.baidu.com/");
    }*/


    /*********************禁止后退********************/
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);


});//*****$(function)******


