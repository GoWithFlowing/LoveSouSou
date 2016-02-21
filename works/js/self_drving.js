$(function(){
	self_drving.init();
})
var self_drving={
	init:function(){
        var sendData = {CODE:131,JSON:JSON.stringify({"page_num":"1","limit":"12"})}
        fnBase.commonAjax(frontUrl,sendData,function(data){
        	console.log(data);
        	for (var i=0; i<data.data.length;i++) {
        		if(!data.data[i].cityname){
        			data.data[i].cityname='西安';
        		}
        		$('.contain').append('<li class="item"><p class="name"><img src="img/left.jpg"/><span class="position">'+data.data[i].cityname+'</span><img src="img/right.jpg"/></p><i class="bottom"><p class="list"><img src="'+data.data[i].list[0].img+'" class="right mbottom"/><img src="'+data.data[i].list[1].img+'" class="mbottom"/><img src="'+data.data[i].list[2].img+'" class="right mbottom"/><img src="'+data.data[i].list[3].img+'" class="mbottom"/></p><p></p></i></li>')       		       		
        	}

        })
    }
}
