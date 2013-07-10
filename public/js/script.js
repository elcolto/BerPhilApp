//prevent scrolling
document.ontouchmove = function(e) { e.preventDefault(); }

$(document).ready(function(){

	//get heigt and width of content div
	var screenWidth = $("#content").width(); //$(window).width();
	var screenHeight = $("#content").height(); //$(window).height();
	
	/*wiggle
	let randomly wiggle/shake objects on screen every 3 seconds, (using jQuery plugin ClassyWiggle*/
	var wiggleInterval = setInterval(function(){
		var wiggleArray = $('.wiggle');
		var wiggleCount = wiggleArray.size();

		var random = Math.floor(Math.random()*wiggleCount);
		var wiggleObject = $(wiggleArray.get(random));
		wiggleObject.ClassyWiggle('start', {limit: 5});
	}, 3000);

	//remove wiggle property of object which have been taped or draged
	$('.wiggle').hammer().on('tap dragstart', function(ev){
		$(this).removeClass('wiggle');
	})

	//	implementing #bug which is randomly moving around, could be destroyed by tapping on it
	var bug = new Bug(100, 100, Math.floor(screenWidth*0.25), 4000)
	$('#bug').hammer().on('tap', function(ev){
		ev.preventDefault();
		bug.destroy();
	});

	//coffee
	var beanArray = $('.bean');
	var beanCounter = 0;
	var beanTapped = false;
	var coffeePlayer = $("#coffee-audio")[0];
	var showSpeechBubble = false;
	/*
	by tapping on a bean adding draggable property
	*/
	$('.bean').on('tap', function(ev){
		ev.preventDefault();
		//show a speechbubble with info text
		if (!beanTapped) {
			$('#cup').animate({
			"bottom":"0px"
			}, 1500);
			setTimeout(function(){
				$('#speech_bubble_find').fadeIn(2000);
			},500);
			
			showSpeechBubble = true;
			beanTapped = true;

			//adding draggable property to every bean
			$(".bean").draggable({
				start: function(event, ui){
					$(this).css('z-index','100');
					//fadeout info text by dragging the first bean
					if (showSpeechBubble) {
						$('#speech_bubble_find').fadeOut(2000);
						showSpeechBubble = false;
					}
				},
			    drag: function(event, ui) {
			        var draggable = $(this).data("ui-draggable");
			        $.each(draggable.snapElements, function(index, element) {
			            if (element.snapping) {
			                draggable._trigger("snapped", event, $.extend({}, ui, {
			                    snapElement: $(element.item)
			                }));
			            }
			        });
			    },
			    snap: "#cup-snap",
			    snapMode: 'outer',

			    snapped: function(event, ui) {
			        $(this).draggable('disable');
			       	if ($(this).css('display')!='none'){
			       		$(this).toggle();
			       		 beanCounter++;
			       	}
			       
		        	if(beanCounter==beanArray.length){
		           		$('#speech_bubble_mhhh').fadeIn(2000);
		        		setTimeout(function(){
							$('#speech_bubble_mhhh').fadeOut(2000);;
						}, 3500);
						setTimeout(function(){
							$('#coffee_sonata').animate({
								"right":"0px"
							}, 2000);
						}, 3500);
		        		beanCounter=0;
		        		$('#coffee_sonata').hammer().on('swiperight', kantata_handler);
		        		$('#cup').hammer().on('swipedown', kantata_handler);
		        	}
			    }
			});
		}
	});

	var kantata_handler = function(event){
		if (!coffeePlayer.paused) {
			coffeePlayer.pause();
			$('#coffeplay').css('background', 'url(./public/img/button_playMusic@2x.png)');
		};
		$('#coffee_sonata').animate({
			"left":screenWidth+1+"px"
		}, 2000);
		var cupHeight = $('#cup').height();
		$('#cup').animate({"bottom":-cupHeight + "px"}, 2000 );
	};

	$('#coffeplay').hammer().on('tap', function(ev){
		if (coffeePlayer.paused) {
			$('#coffeplay').css('background', 'url(./public/img/button_stopMusic@2x.png)');
			coffeePlayer.play();
		}

		else{
			$('#coffeplay').css('background', 'url(./public/img/button_playMusic@2x.png)');
			coffeePlayer.pause();
		}
	});
	


	var curtainRightPositonLeft = $('#stage_curtain_right').position().left;
	var curtainLeftPositionLeft = $('#stage_curtain_left').position().left;
	$('#rope_inner').draggable({ 
		axis: "y", 
		containment: "parent",

		drag: function(ev, ui){
			var ropeDeltaY = ui.position.top - ui.originalPosition.top;
			$('#stage_curtain_right').css({left: curtainRightPositonLeft + Math.round((1.5*ropeDeltaY))});
			$('#stage_curtain_left').css({left: curtainLeftPositionLeft - Math.round((1.5*ropeDeltaY))});
		},

		stop: function(ev, ui){
			console.log("Stop!")
			console.log("right: "+ $('#stage_curtain_right').position().left);
			console.log("left: " + $('#stage_curtain_left').position().left)
			console.log("------------------");
			curtainRightPositonLeft = $('#stage_curtain_right').position().left;
			curtainLeftPositionLeft = $('#stage_curtain_left').position().left;
		}
	});

	//test
	var angelAnimated = false;
	var wing = $('#angel_wing');
	var wingCss = {
		top: wing.position().top+'px',
		left: wing.position().left + 'px',
		'-webkit-transform': 'rotate(0deg)',
	    '-moz-transform': 'rotate(0deg)',
        '-ms-transform': 'rotate(0deg)',
		'-o-transform': 'rotate(0deg)',
		'transform': 'rotate(0deg)',
		'display': 'block'
	};

	$('#stage_button_1').hammer().on('tap',function(ev){
		ev.preventDefault();
		if (!angelAnimated) {
			$('#angel').toggle();
			$('#angel').animate({
				top: "+="+$('#angel_body').height()}, 1000);
			//$('#angel_wing').animate({top: "500px"},300);
			setTimeout(function(){
				
				$('#angel_wing').animate({
				rotation: 90,
				top: "+=250",
				left: "+=50"
				},
	  			{
			    duration: 2500,
			    step: function(now, fx) {
			     	$(this).css({
			//      	"transform": "rotate("+now+"deg)"
			      	'-webkit-transform': 'rotate(' + now + 'deg)',
	            	'-moz-transform': 'rotate(' + now + 'deg)',
		            '-ms-transform': 'rotate(' + now + 'deg)',
		            '-o-transform': 'rotate(' + now + 'deg)',
		            'transform': 'rotate(' + now + 'deg)',
		            'display': 'block'
			      });
			    },
			    complete: function(){
			    	angelAnimated = true;
			    }
	 			}
	 			);
				//$('#angel_wing').animate({top: "+=300"},300);
			},2500);

			setTimeout(function(){
				
				$('#angel_wing').fadeToggle('slow');
			//	delay(1);
				setTimeout(function(){
					$('#angel').animate({
					top: "-="+$('#angel_body').height()}, 1000);
				}, 1000)
				$('#stage_popup p').html($('#stage_popup p').attr("data-text-angel"));
				$('#stage_popup').fadeIn('slow');
				setTimeout(function(){
					$('#angel').toggle();
					$('#angel_wing').css(wingCss);
				},2500)
			
				angelAnimated = false;
			//	$('#angel_wing').css(wingCss);
			},7500);

		}
	});
	
	//closing parent by clicking on close button
	$('div.close ').hammer().on('tap', function(){
		$(this).parent().fadeOut('slow');
	});

});