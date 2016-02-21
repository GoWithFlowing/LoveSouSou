$(document).ready(function(e) {
    resiger.addEvent();
});
var resiger={
   sendCoded:false,
   inputList:new Array(),
   btnList:new Array(),
   addEvent:function(){
	 resiger.inputList=[];
	 resiger.btnList=[];
	 resiger.inputList.push($("#username"),$("#yzcode"),$("#pwd"));
	 resiger.btnList.push($("#yzm"),$("#resiger_btn"));
     resiger.btnList[0].click(
	    function(){
			  if(resiger.sendCoded){
			   return;
			  }
			  var phoneNumber=resiger.inputList[0].val();
			  if(phoneNumber==""){
					fnBase.myalert("请填写手机号码")
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var postData ={JSON:'{"mobile":'+phoneNumber+'}',"CODE":"103"};
			  fnBase.commonAjax(frontUrl, postData,function(data){
               console.log(data);
			   if(data.msgcode=="1"){
				   fnBase.myalert("发送成功");
				   resiger.sendCoded=true;
			  		resiger.timecount();
			   }else{
			   		if(data.msgcode=="6"){
			   			fnBase.myalert('验证码发送失败');
			   		}else if(data.msgcode=="7"){
			   			fnBase.myalert('手机号码已存在');
			   		}
			       
			   }
              })
			  
		}
	 );
	 resiger.btnList[1].click(
	  function(){
		     var phoneNumber=resiger.inputList[0].val();
			  if(phoneNumber==""){
					fnBase.myalert("请填写手机号码")
					return;
			  
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
		     var _yzm=resiger.inputList[1].val();
			 if(_yzm==""){
			   fnBase.myalert("请填写验证码");
			 }
			 var _psw=resiger.inputList[2].val();
			 if(_psw==""){
			  fnBase.myalert("请输入密码");
			 }
			  var postData={JSON:'{"mobile":"'+phoneNumber+'","password":"'+_psw+'","code":"'+_yzm+'"}',"CODE":"102"}
			  fnBase.commonAjax(frontUrl, postData,function(data){

			   if(data.msgcode=="1"){
			     fnBase.myalert("注册成功");
//				   Storage.setUid(data.data.uid);

//				   setTimeout(function(){
//					   window.location.href = "person-info.html"
//				   },300)
				   
			   }else{
			   		if(data.msgcode=="4"){
			   			fnBase.myalert('手机号码已经存在');
			   		}else if(data.msgcode=="5"){
			   			fnBase.myalert('用户名已经存在');
			   		}else if(data.msgcode=="10"){
			   			fnBase.myalert('验证码错误');
			   		}
			   }
              }
			 )
			 
		
	  }
	 );
   },
   timecount:function(){
         var total=60;
	     var mytimecont;
		 resiger.btnList[0].text("60秒后重发");
		 clearInterval(mytimecont);
		 mytimecont=setInterval(function(){
			 total=total-1;
			 var str=total+"秒后重发";
			 resiger.btnList[0].text(str);
			 if(total<=0){
				clearInterval(mytimecont);
				resiger.sendCoded=false;
				resiger.btnList[0].text("获取短信验证码");
			 }
		 },1000);
   
   }
   
}