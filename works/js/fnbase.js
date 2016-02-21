/**
 * Created by lm on 2015/10/14.
 */
var frontUrl="http://123.57.212.40:8088/index.php/Api/index";

/*公用的基础方法*/
var fnBase ={
    /*显示loading*/
    loadShow:function(){
        $("<div class='black_loading' style='display: block;'><div class='ldbg' style='position:absolute;left:220px;bottom:354px;width:290px'><img src='img/loading.gif' style='float:left'><p>正在加载，请稍后...</p></div></div>").appendTo($('body'))
    },
    /*删除loading*/
    loadHide:function(){
        $('.black_loading').remove();
    },
    /*ajax方法*/
    commonAjax : function(url, data,fn){
        fnBase.loadShow();
        $.ajax({
            cache : false,
            data : data,
            url : url,
            timeout:10000,
            dataType : "json",
            async : true,
            type : "post",
            success : function(data) {

                /*数据请求成功*/
//              if(data.msgcode=="0003"){
//                  /*判断是否登录*/
//                 fnBase.loadHide();
//                  fnBase.myalert("用户名或密码错误");
////                  setTimeout(function(){window.location.href = "login.html"},200)
//					
//                  return;
//              };
                data = fnBase.dataConversion(data);//数据过滤
                fnBase.loadHide();

                fn(data);//执行自定义的回调方法 fn
            },
            error:function(){
                /*数据请求失败*/
                fnBase.loadHide();
                fnBase.myalert("亲！您的手机网络不太顺畅喔~");
            }
        });
    },
    dataConversion:function(data){//ajax数据过滤
        var dataStr =JSON.stringify(data,function(key,value){
            switch (value){
                case null:
                    return '';
                    break;
                default :
                    return value;
                    break;
            };
        })
        return JSON.parse(dataStr);
    },
    getTime: function(nS){//时间戳转换
        var val = parseInt(nS)>10000000000?parseInt(nS):parseInt(nS)*1000;
        var time =  new Date(val);
        var oY = time.getFullYear();
        var oM = time.getMonth()+1;
        var oD = time.getDate();

        var str = oY+"-"+(oM>9?oM:"0"+oM)+"-"+(oD>9?oD:"0"+oD);
        return str;
    },
    mbtype:'',
    mobileSystem:function(){//设备类型判断

        if(fnBase.mbtype == ''){
            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                fnBase.mbtype = 'android';
                return 'android'
            } else if (u.indexOf('iPhone') > -1) {//苹果手机
                fnBase.mbtype = 'ios';
                return 'ios'
            } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
                fnBase.mbtype = 'windows';
                return 'windows'
            }
        } else{
            return fnBase.mbtype;
        }
    },
    baocun:function(type,key,value){
        switch (Constant.DEVICE){
            case 'android' :
                jsCall.putString(type,key,value);
                break;
            case 'ios' :
                connectWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showMessage', {'message': txt}, function (response) {
                        log('JS got response', response)
                    })
                });
                break;
            default :
                window.localStorage.setItem(key,value);
                break
        }

    },

    huoqu:function(type,key){
        switch (Constant.DEVICE){
            case 'android' :
                return jsCall.getString(type,key);
                break;
            case 'ios' :
                connectWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showMessage', {'message': txt}, function (response) {
                        log('JS got response', response)
                    })
                });
                break;
            default :
                return window.localStorage.getItem(key)||"";
                break
        }
    },
    /*消息提示*/
    myalert : function(txt,time){//自定义

        switch(Constant.DEVICE){
            case 'android':
                jsCall.showToast(txt);
                break;
             case 'ios':
                 connectWebViewJavascriptBridge(function(bridge) {
                     bridge.callHandler('showMessage', {'message': txt}, function (response) {
                         log('JS got response', response)
                     })
                 });
                break;
             case 'wx':
                 var htxt='';
                 var str='<div id="alertfunctoin" style="position:absolute;width:640px;top:0px;left:0;bottom:0;background:url(img/mt.png);z-index:2000;">';
                 str+='<div id="alerttxt" style="height: 52px;line-height: 52px;width: 380px;position: absolute;top: 385px;' +
                 'left: 130px;background: #fff;color: #6eb92b;font-size: 22px;text-align: center;z-index: 3000;">';
                 str+=txt;
                 str+='</div></div>';
                 $("body").append(str);

                 var removetime = 1200;
                 if(time){
                     removetime=time;
                 }
                 setTimeout(function(){
                     $("#alertfunctoin").remove();
                 },removetime);
                break;
            default:
                alert(txt);
                break;
        }
    },
    /*获取url里面的参数*/
    request: function(name){
        var url = window.location.href;
        if(url){
            var valArray = url.split("?")[1];
            //"cartId=474,475&cartValue=1,1"
            if(valArray && valArray.length >0){
                var valArr = valArray.split("&");
                //["cartId=474,475","cartValue=1,1"]
                if(valArr && valArr.length > 0){
                    for(var i in valArr){

                        if(valArr[i].split("=")[0] == name){
                            //['cartId','474,475']
                            return valArr[i].split("=")[1];
                        }
                    }
                }
            }
        }
        //encodeURIComponent($(this).attr('currentpid'))
        //encodeURIComponent()汉字编码转换
        // decodeURIComponent(fnBase.request("orderType"))
        //decodeURIComponent()汉字解码转换
    },
    /*支付方法*/
    orderPay:function(data){
        switch(Constant.DEVICE) {
            case 'android':
                jsCall.payMethod(data.orderId,data.orderName,data.orderDes||"",data.totalPrice);
                break;
            case 'ios':
                connectWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('showMessage', {'message': txt}, function (response) {
                        log('JS got response', response)
                    })
                });
                break;
            case 'wx':
                //window.location.href = "person-info.html";
                break;
            default :
                break;
        }
        /*"orderName": "水杯444554",
         "totalPrice": "0.00",
         "orderId": "2015102171425"*/
      // fnBase.myalert(data.orderId+","+data.orderName+","+(data.orderDes||"")+","+data.totalPrice)

               /* var sendData = {
                    productName:data.order_info,
                    productDescription:data.order_detail,
                    tradeNO:data.order_id,
                    amount:data.order_sum,
                    payment_type:data.payment_type
                };
                connectWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('orderPay', sendData, function (response) {
                        log('JS got response', response)
                    })
                });*/
    },


    //乘法计算
    accMul:function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}

        try {
            m += s2.split(".")[1].length
        } catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)

    },
    //加法计算
    accAdd:function (arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }

        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }

        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m
    }

};
