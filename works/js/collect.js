$(function(){
	item.fnEvent();
	item.init();
})
//动态修改border线
var item={
	count:1,
	border:function(){
		var size=$('.hotel li').size();
		if(size>1){
			$('.hotel li').eq(size-1).siblings().css('border-bottom','none');
		}
	},
	fnEvent:function(){
		$('.list').on('click','.listitem',function(){
			$(this).addClass('clicked').siblings().removeClass('clicked');
	        var sendData;
			switch ($(this).index()){
				case 0:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":1,"page_num":"1","limit":"8"})};
					break;
				case 1:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":2,"page_num":"1","limit":"8"})};				
					break;
				default:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":3,"page_num":"1","limit":"8"})};				
					break;
			}
			fnBase.commonAjax(frontUrl,sendData,function(data){
				item.addDate(data);
			});
		})
		//全选按钮
		$('.hotelImg').click(function(){
			var d=true;
			if (!($(this).attr('state'))||($(this).attr('state')==0)){
				$(this).attr('state','1');
				$(this).attr('src','img/hotel2.jpg');
				
				
			} else{
				$(this).attr('state','0');
				$(this).attr('src','img/hotel1.jpg');
			}
			for (var i=0;i<$('.hotelImg').size();i++) {
				if($('.hotelImg').eq(i).attr('state')==0||!($('.hotelImg').eq(i).attr('state'))){
					d=false;
					break;
				}
			}
			if(d){
				$('.all').attr('src','img/alls.jpg');
			}else{
				$('.all').attr('src','img/all.jpg');
			}
		})
		$('.all').click(function(){
			if($(this).attr('src')=='img/alls.jpg'){
				$(this).attr('src','img/all.jpg');
				$('.hotelImg').attr('state','0');
				$('.hotelImg').attr('src','img/hotel1.jpg');
				
			}else{
				$(this).attr('src','img/alls.jpg');
				$('.hotelImg').attr('state','1');
				$('.hotelImg').attr('src','img/hotel2.jpg');
			}
		})
		//删除收藏
		$('.del').click(function(){
			$('.hotelImg').each(function(){
				if ($(this).attr('state')==1) {
					var sendData;
					sendData={CODE:134,JSON:JSON.stringify({"collid":$(this).attr('id')})};
					fnBase.commonAjax(frontUrl,sendData,function(data){
						console.log(data);
					})
				} 
			})
			item.init();
		})
	},
	init:function(){
		//添加一条收藏
		var sendData;
		sendData={CODE:115,JSON:JSON.stringify({"id":"55e3f0e4a36f4","uid":"561e1a71d22d3","type":1})};
		fnBase.commonAjax(frontUrl,sendData,function(data){
			console.log(data);
		})
		$('.listitem').eq(0).addClass('clicked').siblings().removeClass('clicked');
		var count;
		for (var i=0; i<$('.listitem').size();i++) {
				num(i);
		}
		function num(i){
			var sendData;
			switch (i){
				case 0:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":1,"page_num":"1","limit":"8"})};
					break;
				case 1:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":2,"page_num":"1","limit":"8"})};				
					break;
				default:
					sendData={CODE:127,JSON:JSON.stringify({"uid":Storage.getUid(),"type":3,"page_num":"1","limit":"8"})};				
					break;
			}
			fnBase.commonAjax(frontUrl,sendData,function(data){
				
				if(data.data){
					count=data.data.length;
				}else{
					count=0;
				}
				$('.listitem').eq(i).children('span').text(count);
				
				if(i==0){
					item.addDate(data);
				}
			});
		}
	},
	addDate:function(data){
		$('.hotel').html('');
		if(data.data){
			for(var j=0;j<data.data.length;j++){
				//判断星星的数量
				var str1='';
				for(var m=0;m<data.data[j].star;m++){
					str1+='<img src="img/stars.jpg" class="stars"/>';
				}
				for(var m=0;m<5-data.data[j].star;m++){
					str1+='<img src="img/star.jpg" class="stars"/>';
				}
				$('.hotel').append('<li><img src="img/hotel1.jpg" class="hotelImg" id="'+data.data[j].id+'"/><img src="'+data.data[j].img+'" class="hotelItem"/><div class="seven"><span class="hotel_name">'+data.data[j].name+'</span><span class="road">'+data.data[j].desp+'</span><span>'+str1+'</span></div><span class="price">￥'+data.data[j].price+'</span>')						
			}
    		item.border();
    		item.fnEvent();
		}
	}
	
	
	
	
	
}
