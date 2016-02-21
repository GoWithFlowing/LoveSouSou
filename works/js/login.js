$(function(){
	login.del();
	login.logins();
})
var login={
	del:function(){
		$('.glyphicon-remove-circle').click(function(){
			$('#username').val('');
		})
		$('.glyphicon').eq(1).click(function(){
			if($(this).hasClass('glyphicon-eye-open')){
				$('#psd').attr('type','text');
				$(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
			}else{
				$('#psd').attr('type','password');
				$(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
			}
		})
	},
	logins:function(){
		$('#log').click(function(){
			
			  var phoneNumber=$("#username").val();
			  if(phoneNumber==""){
					fnBase.myalert("请填写手机号码");
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var psw_txt=$("#psd").val();
			  if(psw_txt==""){
			  	fnBase.myalert("请输入密码");
				return;
			  }
			  
			  var postData={JSON:'{"username":'+phoneNumber+',"password":'+psw_txt+'}',"CODE":"101"};
			  fnBase.commonAjax(frontUrl, postData,function(data){
               console.log(data);
			   if(data.msgcode=="1"){
				   Storage.setUid(data.data.uid);
				//window.localStorage.setItem("uid",data.data.uid);
				   //window.localStorage.setItem("uid","33");
			    fnBase.myalert("登录     成功");
				   setTimeout(function(){
					   window.location.href = "mine.html"
				   },300)
			   }else if(data.msgcode=="0003"){
                    /*登陆失败*/
                   fnBase.loadHide();
                    fnBase.myalert("用户名或密码错误");
//                  setTimeout(function(){window.location.href = "login.html"},200)
					
                    return;
                };
              })
		})
	}
}
			  
			  
			  
			  
			  
			  
