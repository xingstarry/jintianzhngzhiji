$(function () {
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
    if(getCookie('cishu')==1){
        setCookie('cishu',0,getTime())
    }

})