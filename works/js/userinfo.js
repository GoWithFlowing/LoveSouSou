$(function(){
	userinfo.init();
})
var userinfo={
	init:function(){
		var sendData;
		sendData={CODE:105,JSON:JSON.stringify({uid:Storage.getUid()})};
		fnBase.commonAjax(frontUrl,sendData,function(data){
			var str="url(img/userimg.jpg)";
			$('.headimg').css('background',data.data.photo||str);
			var sex=data.data.gender;
			var birth=data.data.birthday;
			var tel=data.data.mobile;
			var nick=data.data.nickname;
			$('.phone').html(tel);
			if(nick){
				$('.nick_name').html(nick);
			}
			
			if(birth){
				$('.bir').html(birth);
			}
			if(sex==1){
				$('.sexs').html('男');
			}else{
				$('.sexs').html('女');
			}
		})
		sendData={CODE:131,JSON:JSON.stringify({"page_num":"1","limit":"10"})};
		fnBase.commonAjax(frontUrl,sendData,function(data){
			console.log(data)
		})
	}
}
