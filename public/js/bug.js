function Bug(x, y, radius, interval){
		this.x = x;
		this.y = y;
		this.interval = interval;
		this.radius = radius;

		var delay = setInterval(hideAndShow, interval);
		var curve;

		function hideAndShow(){

			if ($('#bug').css('display') != 'none') {
				$('#bug').fadeToggle('fast');
			}
			var parent = $("#bug").parent();
			var height = parent.height();
			var width = parent.width();
		//	var radius = bug.radius;
			x = Math.floor(Math.random()*(width-2*radius))+radius;
			y = Math.floor(Math.random()*(height-2*radius))+radius;

			// if object is not displayed: 1. change position, 2. display objec
			// is it display: reverse sequence
			if ($("#bug").css('display') == 'none') {
				$("#bug").css({'left':x, 'top':y});
				$("#bug").fadeToggle('fast');
				moveOnCurve();
				//setTimeout(moveOnCurve, 1);
			} else{
				//set delay to prevent "slowness" of function toggle
				setTimeout(function(){
				$("#bug").css({'left':x, 'top':y});
				}, 350);
			}
		}

		function moveOnCurve(){
			var o = document.getElementById('bug');

			var fromPoint = [x,y];
			var toPoint = getToPoint(fromPoint[0], fromPoint[1], radius);
			var c1Curve = [fromPoint[0], toPoint[1]];
			var c2Curve = [toPoint[0], fromPoint[1]];

			curve = new CurveAnimator(fromPoint, toPoint, c1Curve, c2Curve);

		//	var o = document.getElementById('bug');
			o.style.position = 'absolute';

			curve.animate(5, function(point,angle){
				o.style.left = point.x+"px";
				o.style.top  = point.y+"px";
				o.style.transform =
			    o.style.webkitTransform =
			    o.style.MozTransform =
			    "rotate("+angle+"deg)";
			});
		}

		function getToPoint(x, y, radius){
			var minX = x - radius;

			//random x value between x-radius and x+radius
			var randomX = Math.floor(Math.random()*(2*radius))+minX;

			//using pythagoras, to calculate y value of the point
			var y2 = Math.round(Math.sqrt(Math.pow(radius,2)-Math.pow((x-randomX),2)));
			y2 *= Math.round(Math.random()) * 2 - 1
			y2 +=y;

			var toPoint = [randomX, y2];
			return toPoint;
		}

		this.destroy = function(){
			$('#bug-audio')[0].play();
			curve.stop();
			$("#bug").css('background-image', 'url(./public/img/blood.png)');
			clearInterval(delay);
			setTimeout(function(){
				$('#bug').toggle();
			},3000);
			setTimeout(function(){
				$("#bug").css('background-image', 'url(./public/img/bug.png)');
				delay = setInterval(hideAndShow, interval);
			}, 2*60*1000);
		}
	}