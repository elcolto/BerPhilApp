
function rotate(){
	var rotateObject = $('#object5');
};

function hideAndShow(objectName){
	
	if ($(objectName).css('display') != 'none') {
		$(objectName).toggle('slow');
	}
	//random position
	
	var width = $(window).width();
	var height = $(window).height();
	var x = Math.floor(Math.random()*(width-350))+100;
	var y = Math.floor(Math.random()*(height-350))+100;
	
	// if object is not displayed: 1. change position, 2. display objec
	// is it display: reverse sequence
	if ($(objectName).css('display') == 'none') {
		$(objectName).css({'left':x, 'top':y});
		$(objectName).toggle('slow');
		setTimeout(moveOnCurve, 1500);
	}
	else{
		//set delay to prevent "slowness" of function toggle
		setTimeout(function(){
			$(objectName).css({'left':x, 'top':y});
		}, 350);
	}
};
function moveOnCurve(){
	var o = document.getElementById('bug');
	var x1 = parseInt(o.style.left,10), y1 = parseInt(o.style.top, 10);

	var fromPoint=[x1,y1], toPoint = [x1+300,y1], c1Curve =[x1, y1-200], c2Curve = [x1+300, y1-200];


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
};
