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

    // cookie
    // 设置cookie  sName->user  sValue->value  iDay->到期时间
    function setCookie(sName, sValue,iDay ){
        if(iDay){
            var oDate = new Date();
            oDate.setDate(oDate.getDate()+iDay);
            document.cookie=sName+'='+sValue+'; expires='+oDate+'; path=/';  // expires->到期时间   path=/ -> 存储在根目录下
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
    if(getCookie('cishu')<=0){
        location.href='index.html';
    }
    /*************************弹幕**************************/
    var oTanmu2 = $('.tanmu2');
    /*var arr = ['李**正在答题','131****7719获得5元奖励','123****7719获得一等奖','张**正在答题','131****7719获得5元奖励','王**获得一等奖','贺**正在答题','158****7819获得10元奖励','136****2234获得二等奖','钟**正在答题','天**获得5元奖励','156****6566获得三等奖'];
    var arr2 = ['李**正在答题','131****7719获得5元奖励','123****7719获得一等奖','张**正在答题','131****7719获得5元奖励','王**获得一等奖'];

    for(var i=0;i<arr.length;i++){
        $('<div><span>'+arr[i]+'</span></div>').appendTo(oTanmu);
    }
    for(var i=0;i<arr2.length;i++){
        $('<div><span>'+arr[i]+'</span></div>').appendTo(oTanmu2);
    }
    oTanmu2.barrager2();*/
    var aTanmu2Ul = $('.tanmu2 ul');
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
                        $('<li>'+json.data[i]+'</li>').appendTo(aTanmu2Ul[0])
                    }else{ //**偶数
                        $('<li>'+json.data[i]+'</li>').appendTo(aTanmu2Ul[1])
                    }
                }
                setInterval(function () {
                    autoScroll(oTanmu2)
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

    //************************questions高度***************************8
    var oQuestions = $('.questions');
    var oQueCon = $('.queCon');
    var oDownLoadAPP =$('.downLoadAPP');
    var oQuestionsH = contentH-oTanmu2.outerHeight();
    oQuestions.css('height',oQuestionsH+'px');
    oQueCon.css('height',(oQuestions.height()-oDownLoadAPP.outerHeight())+'px');


//********************获取题目***************************
    var oQueTextAll = $('.queTextAll');
    var n = 0;
    /*var arrQues = [ { "title": "啊啊啊啊啊啊啊啊", "A":"aaaaaa", "B": "bbbb","C":"ccccc", "D": "ddddd","right":"C" },
        { "title": "嘿嘿哈哈哈哈哈哈", "A":"qqqq", "B": "sefsdf","C":"htdh", "D": "zxczxc","right":"C" },
        { "title": "鹅鹅鹅鹅鹅鹅", "A":"weew", "B": "vsdsv","C":"grgd", "D": "hfthft","right":"C" }
    ];*/
    /*for(var i=0;i<arrQues.length;i++){
        $('<li>'+
            '<div class="timeAll clear-fix">'+
                '<p class="queNum fl"><i>'+(i+1)+'</i>/10</p>'+
                '<div class="timeBar fl">'+
                    '<div class="timeBarCon"></div>'+
                '</div>'+
                '<p class="time fr"><em class="items">15</em>秒</p>'+
            '</div>'+
            '<dl class="queTextOne">'+
                '<dt class="queTitle">'+(i+1)+'. <i>'+arrQues[i].title+'</i></dt>'+
                '<dd>A. '+arrQues[i].A+'<span></span></dd>'+
                '<dd>B. '+arrQues[i].B+'<span></span></dd>'+
                '<dd>C. '+arrQues[i].C+'<span></span></dd>'+
                '<dd>D. '+arrQues[i].D+'<span></span></dd>'+
            '</dl>'+
        '</li>').appendTo(oQueTextAll);
    }*/
    var userAnswers = [];
     var countdown=15;
     var timeout = null;
     var aTime = null;
     var aTimeBarCon = null;
    $.ajax({
        url:'questionList.json',
        data:'',
        type:'get',
        dataType:'json',
        success:function (res) {
            var json = eval(res);
            if(json){
                console.log(json.word);
                var jsonData = json.data;
                for(var i=0;i<jsonData.length;i++){
                    $('<li>'+
                        '<div class="timeAll clear-fix">'+
                        '<p class="queNum fl"><i>'+(i+1)+'</i>/10</p>'+
                        '<div class="timeBar fl">'+
                        '<div class="timeBarCon"></div>'+
                        '</div>'+
                        '<p class="time fr"><em class="items">15</em>秒</p>'+
                        '</div>'+
                        '<dl class="queTextOne">'+
                        '<dt class="queTitle">'+(i+1)+'. <i>'+jsonData[i].title+'</i></dt>'+
                        '<dd>A. '+jsonData[i].optiona+'<span></span></dd>'+
                        '<dd>B. '+jsonData[i].optionb+'<span></span></dd>'+
                        '<dd>C. '+jsonData[i].optionc+'<span></span></dd>'+
                        '<dd>D. '+jsonData[i].optiond+'<span></span></dd>'+
                        '</dl>'+
                        '</li>').appendTo(oQueTextAll);
                    userAnswers[i] = jsonData[i].rightOption;
                }
                timeNow();
                choose(userAnswers);
            }

        },
        error:function (err) {

        }
    });

    //*******************选中选项********************
    var rightAnswer = 0;
    var aQueTextLi = null;
    var aAnswer = null;
    function choose(rightOption){
        aQueTextLi = $('.queTextAll li');
        aQueTextLi.eq(0).show();
        aAnswer = $('.queTextOne dd');
        aAnswer.on('click',function () {
            aAnswer.removeClass('select');
            $(this).addClass('select');
            clearTimeout(timeout);
            aTimeBarCon.eq(n).stop()
            var rOrW =$(this).html()[0];
            if(rightOption[n]==rOrW){
                $(this).children().addClass('right');
                rightAnswer++;
            }else{
                $(this).children().addClass('wrong');
            }
            setTimeout(function(){
                if(n>=aQueTextLi.length-1){
                    if(getCookie('cishu')>1){
                        window.location.href='result1.html';
                    }else{
                        window.location.href='result2.html';
                    }

                }else{
                    nextQue(aQueTextLi);
                    beginTime(aTime);
                }

            },1000);
        });

        function checkAnswers() {
            var resultArr = [],
                flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }


    }
    function nextQue(aQueTextLi){
        if(n>=aQueTextLi.length-1){
            if(getCookie('cishu')>1){
                window.location.href='result1.html';
            }else{
                window.location.href='result2.html';
            }
            return false;
        }else{
            n++;
            aQueTextLi.hide();
            aQueTextLi.eq(n).show();
        }
    }

    //***********************倒计时****************************
   /* var countdown=15;
    var timeout = null;
    var aTime = null;
    var aTimeBarCon = null;*/
    function timeNow() {
        aTime = $('.items');
        aTimeBarCon = $('.timeBarCon');
        settime(aTime);
        beginTime(aTime);
    }
    function settime(val) {
        clearTimeout(timeout);
        if (countdown == 0) {
            countdown = 0;
            nextQue(aQueTextLi);
            beginTime(aTime);

        } else {
            if(countdown<10){
                countdown='0'+countdown;
            }
            val.html(countdown);
            var long = (countdown-1)/15;
            var siWu = long.toFixed(2);
            aTimeBarCon.eq(n).stop().animate({
                width:long*100+'%'
            },1000,"linear");
            countdown--;
        }
        timeout = setTimeout(function() {
            settime(val);
        },1000)
    }
    function beginTime(aTimeN){
        if(n){
            countdown=15;
            settime(aTimeN);
        }

    }

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
    var quizDownAPP = $('.quizDownAPP');
    quizDownAPP.on('click',function(){
        downApp();
    })




});//*****$(function)******


/*(function () {
    var Barrager2 = function (ele,options) {
        var defaults = {
            color:["#cd9f00","#323232","#0060ce","#704700","#9e2b74","#d3001e","#d34a00","#51befc"],
            wrap:ele,
            num:1
        };
        this.settings = $.extend({},defaults,options||{});
        this._init();
    };
    Barrager2.prototype = {
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
            var topArr = [10,30];
            var top=0;
            if(this.settings.num%2 !=0){
                top=topArr[0];
            }else{
                top=topArr[1];
            }
            this.settings.num+=1;
            return top;
        },
        getReandomTime:function () {
            var time = 8;
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
            },8000+n*1000,"linear",function () {
                item.css({right:-_w,left:""});
                _this.randomTime(n)
            });
        }
    };
    $.fn.barrager2 = function (opt) {
        var bger = new Barrager2(this,opt);
    }
})(jQuery);*/

