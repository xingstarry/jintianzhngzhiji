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

    //************************分享***************************
    var share = $('.share');
    var oShareCancel = $('.shareCon .cancel');
    var oErweimaCancel = $('.erweimaBox .cancel');
    var shareCon = $('.shareCon');
    var shareBox = $('.shareBox');
    var oWeixinBtn = $('.shareCon .weixin');
    var oPengyouquanBtn = $('.shareCon .pengyouquan');
    var oErweimaBox = $('.erweimaBox');
    share.on('click',function () {
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
    var erCanvas = $('.code canvas');
    var erImg = $('.erweimaImg2');
    console.log(erCanvas)
    function convertCanvasToImage(canvas) {
        var imgSrc = canvas.get(0).toDataURL("image/png");
        return imgSrc;
    }
    erImg.attr('src',convertCanvasToImage(erCanvas));


    //***************************弹幕**************************
    /*var arr = ['李**正在答题','131****7719获得5元奖励','123****7719获得一等奖','张**正在答题','131****7719获得5元奖励','王**获得一等奖','贺**正在答题','158****7819获得10元奖励','136****2234获得二等奖','钟**正在答题','天**获得5元奖励','156****6566获得三等奖'];*/
    var arr2 = ['李**正在答题','131****7719获得5元奖励','123****7719获得一等奖','张**正在答题','131****7719获得5元奖励','王**获得一等奖'];
    var oTanmu = $('.tanmu');
    /*for(var i=0;i<arr.length;i++){
        $('<div><span>'+arr[i]+'</span></div>').appendTo(oTanmu);
    }
    for(var i=0;i<arr2.length;i++){
        $('<div><span>'+arr[i]+'</span></div>').appendTo(oTanmu2);
    }
    oTanmu.barrager();*/
    var aTanmuUl = $('.tanmu ul');
    $.ajax({
        url:'silders.json',
        data:{},
        type:'GET',
        success:function (res) {
            var json = eval(res);
           if(json.re){
               for(var i=0;i<json.data.length;i++){
                   var arr=[];
                   if((i+1)%2){//**奇数
                       $('<li>'+json.data[i]+'</li>').appendTo(aTanmuUl[0])
                   }else{ //**偶数
                       $('<li>'+json.data[i]+'</li>').appendTo(aTanmuUl[1])
                   }
               }
               console.log(aTanmuUl[0])
               setInterval(function () {
                   autoScroll(oTanmu)
               },2000)

           }
        },
        error:function (err) {

        }
    });
    /*******************滚动********************/
    function autoScroll(obj){
        $(obj).find("ul").stop().animate({
            marginTop : "-1.25rem"
        },500,function(){
            $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
        })
    }

// cookie
    // 设置cookie  sName->user  sValue->value  iDay->到期时间
    function setCookie(sName, sValue,iDay ){
        if(iDay){
            /*var oDate = new Date();
            oDate.setDate(oDate.getDate()+iDay);*/
            document.cookie=sName+'='+sValue+'; expires='+iDay+'; path=/';  // expires->到期时间   path=/ -> 存储在根目录下
        }else{
            document.cookie=sName+'='+sValue+'; path=/';
        }
    }
    // 获取cookie值 sName: 要获取的值的name
    function getCookie(sName){
        var str = document.cookie;   // 获取文档cookie信息
        var arr = str.split('; ');    // arr = [name=a, value=1, ...]
        for(var i=0; i<arr.length; i++){
            var arr2 = arr[i].split('=');   // arr[i] = 'name=a'  arr2[name,a]
            if(arr2[0] == sName){
                return arr2[1];
            }
        }
        return '';
    }

    function getTime(){
        var timeStamp = new Date(new Date().setHours(23, 59, 59, 59)).getTime();

        var a = new Date(timeStamp);

        return a;
    }
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var curWeeHours = new Date(curDate.toLocaleDateString());
    var startBtn = $('.startBtn');
    if(!getCookie('cishu')){
        setCookie('cishu',3,getTime());
    }
    startBtn.on('click',function () {
        setCookie('cishu',getCookie('cishu')-1,getTime());
        if(getCookie('cishu')>0){
            window.location.href = 'quiz.html';
        }else{
            return false;
        }
    });

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
            theUrl = 'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8';
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
    var downLoadBtn = $('.downLoadBtn');
    downLoadBtn.on('click',function(){
        downApp();
    })

});//*****$(function)******

//*******************弹幕************************
/*
(function () {
    var Barrager = function (ele,options) {
        var defaults = {
            color:["#cd9f00","#323232","#0060ce","#704700","#9e2b74","#d3001e","#d34a00","#51befc"],
            wrap:ele,
            num:1
        };
        this.settings = $.extend({},defaults,options||{});
        this._init();
    };
    Barrager.prototype = {
        _init:function () {
            var item = $(this.settings.wrap).find("div");
            for(var i = 0;i<item.length;i++){
                item.eq(i).css({
                    top:this.getReandomTop()+"px",
                    color:this.getReandomColor()
                });
                item.eq(i).css({
                    right:-item.eq(i).width()
                })
            }
            this.randomTime(0);
        },
        getReandomColor:function () {
            var max = this.settings.color.length;
            var randomNum = Math.floor(Math.random()*max);
            return this.settings.color[randomNum];
        },
        getReandomTop:function () {
            var topArr = [10,30,50];
            var top=0;
            if(this.settings.num%3 ==0){
                top=topArr[2];
            }else if(this.settings.num%2 ==0){
                top=topArr[1];
            }else{
                top=topArr[0];
            }
            this.settings.num+=1;
            return top;
        },
        getReandomTime:function () {
            var time = Math.floor((8+Math.random()*10));
            return time*1000;
        },
        randomTime:function (n) {
            var obj = $(this.settings.wrap).find("div");
            var _this = this;
            var len = obj.length;
            if(n>=len){
                n=0;
            }
            setTimeout(function () {
                n++;
                _this.randomTime(n)
            },3000);
            var item = obj.eq(n),_w = item.outerWidth(!0);
            item.animate({
                left:-_w
            },_this.getReandomTime(),"linear",function () {
                item.css({right:-_w,left:""});
                _this.randomTime(n)
            });
        }
    };
    $.fn.barrager = function (opt) {
        var bger = new Barrager(this,opt);
    }
})(jQuery);*/
/*
(function () {
    var Barrager = function (ele,options) {
        var defaults = {
            color:["#cd9f00","#323232","#0060ce","#704700","#9e2b74","#d3001e","#d34a00","#51befc"],
            wrap:ele,
            num:1
        };
        this.settings = $.extend({},defaults,options||{});
        this._init();
    };
    Barrager.prototype = {
        _init:function () {
            var item = $(this.settings.wrap).find("div");
            for(var i = 0;i<item.length;i++){
                item.eq(i).css({
                    top:this.getReandomTop()+"px",
                    color:this.getReandomColor()
                });
                item.eq(i).css({
                    right:-item.eq(i).width()
                })
            }
            this.randomTime(0);
        },
        getReandomColor:function () {
            var max = this.settings.color.length;
            var randomNum = Math.floor(Math.random()*max);
            return this.settings.color[randomNum];
        },
        getReandomTop:function () {
            var topArr = [10,30,50];
            var top=0;
            if(this.settings.num%3 ==0){
                top=topArr[2];
            }else if(this.settings.num%2 ==0){
                top=topArr[1];
            }else{
                top=topArr[0];
            }
            this.settings.num+=1;
            return top;
        },
        getReandomTime:function () {
            var time = Math.floor((8+Math.random()*10));
            return time*1000;
        },
        randomTime:function (n) {
            var obj = $(this.settings.wrap).find("div");
            var _this = this;
            var len = obj.length;
            if(n>=len){
                n=0;
            }
            setTimeout(function () {
                n++;
                _this.randomTime(n)
            },3000);
            var item = obj.eq(n),_w = item.outerWidth(!0);
            item.animate({
                left:-_w
            },_this.getReandomTime(),"linear",function () {
                item.css({right:-_w,left:""});
                _this.randomTime(n)
            });
        }
    };
    $.fn.barrager = function (opt) {
        var bger = new Barrager(this,opt);
    }
})(jQuery);*/
