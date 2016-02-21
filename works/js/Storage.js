/**
 * Created by lm on 2015/7/9.
 */

var Constant = {
    URL: "http://www.setfarm.com/index.php/Api/Api",
    WX_URL:"http://www.setfarm.com/mobile",
    IMG_URL:"",
    PAGE_ROW:12,
    VOID_SHOW:false,
    DEVICE:"wx"//android//ios//pc//wx
};


/* var u = navigator.userAgent;
 if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
 fnBase.mbtype = 'android';
 return 'android'
 } else if (u.indexOf('iPhone') > -1) {//苹果手机
 fnBase.mbtype = 'ios';
 return 'ios'
 } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
 fnBase.mbtype = 'windows';
 return 'windows'
 }*/

var animaBase={
    itemRemove:function(obj,fn){
        obj.height(obj.height())
        obj.addClass('itemRemove');

        obj.on('animationend',function(){
            obj.remove();
            fn&&fn()
        })
    }
};



/*var Storage = {
    clearData: function(key){
        if(arguments.length===1){
            window.sessionStorage.removeItem(key);
        }else {
            window.sessionStorage.clear();
            window.localStorage.clear();
        }
    },
    setData: function(key,value){
        if(arguments.length===1){
            for(var attr in key){
                window.sessionStorage.setItem(attr,key[attr])
            }
        }else {
            window.sessionStorage.setItem(key,value)
        }
    },
    getData: function(key){
        return window.sessionStorage.getItem(key)||''
    },
    setJSON:function(key,value){
        window.sessionStorage.setItem(key,JSON.stringify(value))
    },
    getJSON:function(key){
        return JSON.parse(window.sessionStorage.getItem(key))||{}
    },
    setProInfo:function(value){
        window.localStorage.setItem('product-info',JSON.stringify(value))
    },
    getProInfo:function(){
        return JSON.parse(window.localStorage.getItem('product-info'))||{"list":[]}
    },
    changeData: function(){
        var keyArr = ['prolist-key','detail-type','order-type','cat-id','product-id','address-id',
            'cart-id','brand-id','shop-id','product-num'];
        for(var i = 0;i<keyArr.length;i++){
            (function(index){
                $(document).on('click','a[data-'+keyArr[index]+']', function(){
                    Storage.setData(keyArr[index],$(this).attr('data-'+keyArr[index]));
                });
            })(i)
        }
    },
    request: function(name){//获取url传参
        var url = window.location.href;
        if(url){
            var valArray = url.split("?")[1];
            if(valArray && valArray.length >0){
                var valArr = valArray.split("&");
                if(valArr && valArr.length > 0){
                    for(var i in valArr){
                        if(valArr[i].split("=")[0] == name){
                            return valArr[i].split("=")[1];
                        }
                    }
                }
            }
        }
    },
    getUid:function(){
        return window.localStorage.getItem("uid")||""
    },
    setUid:function(val){
        return window.localStorage.setItem("uid",val);
    },
    testLogin:function(fn,fn2){
        if(Storage.getUid()==''){
            fnBase.myalert('请先登录');
            fn2&&fn2();
            setTimeout(function(){
                window.location.href = 'login.html'
            },300)
        }else{
            fn()
        }
    }

}*/





var Storage = {
    clearData: function(key){
        if(arguments.length===1){
            fnBase.baocun(2,key,'')
        }else {
            fnBase.baocun(1,"uid",'');
            if(Constant.DEVICE=="wx"){
                window.localStorage.clear();
            }
        }
    },
    setData: function(key,value){
        if(arguments.length===1){
            for(var attr in key){
                fnBase.baocun(2,attr,key[attr])
            }
        }else {
            fnBase.baocun(2,key,value)

        }
    },
    getData: function(key){
        return fnBase.huoqu(2,key)||"";
    },
    setJSON:function(key,value){
        fnBase.baocun(2,key,JSON.stringify(value))

    },
    getJSON:function(key){

        return JSON.parse(fnBase.huoqu(2,key)||"{}");
    },
    setProInfo:function(value){
        fnBase.baocun(1,'product-info',JSON.stringify(value))
    },
    getProInfo:function(){
        return JSON.parse(fnBase.huoqu(1,product-info))||{"list":[]};
    },
    request: function(name){//获取url传参
        var url = window.location.href;
        if(url){
            var valArray = url.split("?")[1];
            if(valArray && valArray.length >0){
                var valArr = valArray.split("&");
                if(valArr && valArr.length > 0){
                    for(var i in valArr){
                        if(valArr[i].split("=")[0] == name){
                            return valArr[i].split("=")[1];
                        }
                    }
                }
            }
        }
    },
    getUid:function(){
        return fnBase.huoqu(1,"uid")||"";
    },
    setUid:function(val){
        fnBase.baocun(1,"uid",val);
        //fnBase.huoqu(1,"uid")||"";
    },
    testLogin:function(fn,fn2){
        if(Storage.getUid()==''){
            fnBase.myalert('请先登录');
            fn2&&fn2();
            setTimeout(function(){
                window.location.href = 'login.html'
            },300)
        }else{
            fn()
        }
    }

}