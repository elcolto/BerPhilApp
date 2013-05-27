function bug(x,y){
	this.x = x;
	this.y = y;

	function hideAndShow(){

		if ($('#bug').css('display') != 'none') {
		$('#bug').toggle('slow');
	}
		var height = $("#bug").parent().height();
		var width = $("#bug").parent().width();
		this.x = Math.floor(Math.random()*(width-350))+100;
		this.y = Math.floor(Math.random()*(height-350))+100;

		// if object is not displayed: 1. change position, 2. display objec
		// is it display: reverse sequence
		if ($("#bug").css('display') == 'none') {
			$("#bug").css({'left':x, 'top':y});
			$("#bug").toggle('slow');
			setTimeout(moveOnCurve, 1500);
		} else{
			//set delay to prevent "slowness" of function toggle
			setTimeout(function(){
			$("#bug").css({'left':x, 'top':y});
			}, 350);
		}
	}

	function moveOnCurve(){
		var o = document.getElementById('bug');

		var fromPoint = [this.x,this.y];
		

		var curve = new CurveAnimator(fromPoint, toPoint, c1Curve, c2Curve);

//	var o = document.getElementById('bug');
	o.style.position = 'absolute';

	curve.animate(2, function(point,angle){
		o.style.left = point.x+"px";
		o.style.top  = point.y+"px";
		o.style.transform =
	    o.style.webkitTransform =
	    o.style.MozTransform =
	    "rotate("+angle+"deg)";
	});
	}
}