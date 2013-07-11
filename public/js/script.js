//prevent scrolling
document.ontouchmove = function(e) { e.preventDefault(); }

$(document).ready(function(){

	//ability to reload
	$('#reload').hammer().on('tap', function(){
		location.reload();
	});

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
				//creating snapped event to the dragged bean 
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
			    //setting snappable properties
			    snap: "#cup-snap",
			    snapMode: 'outer',
			    //by snapping on the snap element toggle the snapped element
			    snapped: function(event, ui) {
			        $(this).draggable('disable');
			       	if ($(this).css('display')!='none'){
			       		$(this).toggle();
			       		 beanCounter++;
			       	}
			       	//show text info by snapping all beans
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
		        		//setting functionality by swiping info element an cup
		        		$('#coffee_sonata').hammer().on('swiperight', kantata_handler);
		        		$('#cup').hammer().on('swipedown', kantata_handler);
		        	}
			    }
			});
		}
	});
	// setting function to play music and swipe back info text and cup
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
		ev.preventDefault();
		if (coffeePlayer.paused) {
			$('#coffeplay').css('background', 'url(./public/img/button_stopMusic@2x.png)');
			coffeePlayer.play();
		}

		else{
			$('#coffeplay').css('background', 'url(./public/img/button_playMusic@2x.png)');
			coffeePlayer.pause();
		}
	});
	
	//stage functionality
	$('#object_stage').hammer().on('tap', function(){
		$('#rope_inner').addClass('wiggle');
	});

	/*
	using rope-div by dragging it down to open curtain
	*/
	//get position of both curtain
	var curtainRightPositonLeft = $('#stage_curtain_right').position().left;
	var curtainLeftPositionLeft = $('#stage_curtain_left').position().left;
	//set rope draggable to move curtain
	$('#rope_inner').draggable({ 
		axis: "y", 
		containment: "parent",

		start: function(ev, ui){
			$('#rope_inner').removeClass('wiggle');
		},

		drag: function(ev, ui){
			//adding or subtracting distance from curtaon
			var ropeDeltaY = ui.position.top - ui.originalPosition.top;
			$('#stage_curtain_right').css({left: curtainRightPositonLeft + Math.round((1.5*ropeDeltaY))});
			$('#stage_curtain_left').css({left: curtainLeftPositionLeft - Math.round((1.5*ropeDeltaY))});
		},
		//set var to new position
		stop: function(ev, ui){
			curtainRightPositonLeft = $('#stage_curtain_right').position().left;
			curtainLeftPositionLeft = $('#stage_curtain_left').position().left;
		}
	});

	//animation of an angel by pressing the first burtton
	var angelAnimated = false;
	var wing = $('#angel_wing');
	//set initial css forfor wing
	var wingCss = {
		top: wing.position().top+'px',
		left: wing.position().left + 'px',
		'-webkit-transform': 'rotate(0deg)',
		'transform': 'rotate(0deg)',
		'display': 'block'
	};

	$('#stage_button_1').hammer().on('tap',function(ev){
		ev.preventDefault();
		var stageHeight = $('#stage_middle').height();
		var stageWidth = $('#stage_middle').width();
		if (!angelAnimated) {
			//start animation of angel, and let fall the wing
			$('#angel').toggle();
			$('#angel').animate({
				top: "+="+$('#angel_body').height()}, 1000);
			setTimeout(function(){
				
				$('#angel_wing').animate({
				rotation:45,
				top: "+=" + Math.round(stageHeight/2),
				left: "+=" + Math.round(stageWidth/5),
				},
	  			{
			    duration: 2500,
			    step: function(now, fx) {
			     	$(this).css({
			//      	"transform": "rotate("+now+"deg)"
			      	'-webkit-transform': 'rotate(' + now + 'deg)',
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
				setTimeout(function(){
					$('#angel').animate({
					top: "-="+$('#angel_body').height()}, 1000);
				}, 1000)
				$('#stage_popup p').html($('#stage_popup p').attr("data-text-angel"));
				$('#stage_popup').fadeIn(1000);
				setTimeout(function(){
					$('#angel').toggle();
					$('#angel_wing').css(wingCss);
				},2500)
			
				angelAnimated = false;
			//	$('#angel_wing').css(wingCss);
			},7500);
		}
	});

	$('#stage_button_2').hammer().on('tap', function(){
		var elephantWidt = $('#elephant').width();
		$('#elephant').toggle().delay(200).animate({left: "+=" + elephantWidt}, 4500);
		$('#stage_popup p').html($('#stage_popup p').attr("data-text-elephant"));
	//	$('#stage_popup').fadeIn(1000);
	});

	$('#stage_button_3').hammer().on('tap', function(){
		$('#stage_popup p').html($('#stage_popup p').attr("data-text-water"));
		$('#stage_popup').fadeIn(1000);
	});
	
	//closing parent by clicking on close button
	$('div.close ').hammer().on('tap', function(){
		$(this).parent().fadeOut('slow');
	});

});