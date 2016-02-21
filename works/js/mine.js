/**
 * Created by Administrator on 2015/12/4.
 */
$(function(){
	center.init();
	center.fnEvent();
})
var center={
    init:function(){
        var sendData = {CODE:105,JSON:JSON.stringify({uid:Storage.getUid()})}
        fnBase.commonAjax(frontUrl,sendData,function(data){
        	console.log(data)
        	if(data.data.gender==0){
        		$('.des img').attr('src','img/female.png');
        	}else{
        		$('.des img').attr('src','img/male.png');
        	}
            $(".img").attr('src',data.data.photo||"img/tx.png");
            $(".nick").text(data.data.nickname||data.data.mobile||'未登录，请登录')
        });

    },
    fnEvent:function(){
        $('#edit').click(function(){
            Storage.clearData();
            window.location.href = "index.html";
        })
    }
}
