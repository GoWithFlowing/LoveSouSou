$(function(){
	function zoom() {
		var zoom = $(window).width() / 640;
		$("html").css("zoom", zoom).show();
	}
	zoom();
	window.onresize = zoom;
})