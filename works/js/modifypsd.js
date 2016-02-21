$(function(){
	modify.fnevent();
})
var modify={
	fnevent:function(){
		$('#btn').click(function(){
			  var oldpsd=$(".oldpsd").val();
			  var newpsd=$(".newpsd").val();
			  var repsd=$(".repsd").val();
			  if(oldpsd==""){
					fnBase.myalert("请输入原密码");
					return;
			  }else if(newpsd==""){
					fnBase.myalert("请输入新密码");
					return;
			  }else  if(repsd==""){
					fnBase.myalert("请确认密码");
					return;
			  }
			  var postData={JSON:'{"uid":'+Storage.getUid()+',"new_password":'+newpsd+',"old_password":'+oldpsd+'}',"CODE":"104"};
			  fnBase.commonAjax(frontUrl, postData,function(data){
               console.log(data);
               if(data.msgcode=="8"){
               	fnBase.myalert("原密码错误");
               }
//			   if(data.msgcode=="1"){
//				   Storage.setUid(data.data.uid);
//				//window.localStorage.setItem("uid",data.data.uid);
//				   //window.localStorage.setItem("uid","33");
//			    fnBase.myalert("登录     成功");
//				   setTimeout(function(){
//					   window.location.href = "mine.html"
//				   },300)
//			   }else if(data.msgcode=="0003"){
//                  /*登陆失败*/
//                 fnBase.loadHide();
//                  fnBase.myalert("用户名或密码错误");
////                  setTimeout(function(){window.location.href = "login.html"},200)
//					
//                  return;
//              };
              })
		})
	}
}
