//scrollen verhindern
document.ontouchmove = function(e) { e.preventDefault(); }

$(document).ready(function(){

	var screenWidth = $("#content").width(); //$(window).width();
	var screenHeight = $("#content").height(); //$(window).height();
	var coffeePlayer = $("#coffee-audio")[0];


	var curtainRightPositonLeft = $('#stage_curtain_right').position().left;
	var curtainLeftPositionLeft = $('#stage_curtain_left').position().left;
	$('#rope_inner').draggable({ 
		axis: "y", 
		containment: "parent",

		create: function(ev, ui){
			console.log("create!")
			console.log("right: "+ $('#stage_curtain_right').position().left);
			console.log("left: " + $('#stage_curtain_left').position().left);
		},

		start: function(ev, ui){
		console.log("Start!")
		console.log("right: "+ $('#stage_curtain_right').position().left);
		console.log("left: " + $('#stage_curtain_left').position().left);
		},

		drag: function(ev, ui){
			var ropeDeltaY = ui.position.top - ui.originalPosition.top;
			$('#stage_curtain_right').css({left: curtainRightPositonLeft + (1.5*ropeDeltaY)});
			$('#stage_curtain_left').css({left: curtainLeftPositionLeft - (1.5*ropeDeltaY)});
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
	

	//wiggle
	var wiggleInterval = setInterval(function(){
		var wiggleArray = $('.wiggle');
		var wiggleCount = wiggleArray.size();
		var random = Math.floor(Math.random()*wiggleCount);
		var wiggleObject = $(wiggleArray.get(random));
		wiggleObject.ClassyWiggle('start', {limit: 5});
	},3000	);

	$('.wiggle').hammer().on('tap dragstart', function(ev){
		$(this).removeClass('wiggle');
	})

	//	behavior of #bug
	var bug = new Bug(100, 100, Math.floor(screenWidth*0.25), 4000)
	$('#bug').hammer().on('tap', function(ev){
		ev.preventDefault();
		bug.destroy();
	});

	//coffee
	var beanArray = $('.bean');
	var beanCounter = 0;
	var beanTapped = false;
	var showSpeechBubble = false;
	$('.bean').on('tap', function(ev){
		//alert(beanArray.length);
		ev.preventDefault();
		if (!beanTapped) {
			$('#cup').animate({
			"bottom":"0px"
			}, 1500);
			setTimeout(function(){
				$('#speech_bubble_find').fadeIn(2000);
			},500);
			
			showSpeechBubble = true;
			beanTapped = true;
		
			//$('.bean').draggable({snap: '#cup-snap', snapMode: 'outer',});
			$(".bean").draggable({
				start: function(event, ui){
					$(this).css('z-index','100');
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
			        // Do something with 'ui.snapElement'...
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
		        	//	$(document).hammer().on('tap', kantata_handler);
		        		$('#coffee_sonata').hammer().on('swiperight', kantata_handler);
		        		$('#cup').hammer().on('swipedown', kantata_handler);
		        	}
			    }
			});
		}
	});

	var kantata_handler = function(event){
		if (!coffeePlayer.paused) {
			$('#coffeplay').css('background-color', 'red');
			coffeePlayer.pause();
		};
		$('#coffee_sonata').animate({
			"left":screenWidth+1+"px"
		}, 2000);
		var cupHeight = $('#cup').height();
		$('#cup').animate({"bottom":-cupHeight + "px"}, 2000 );
	};

	$('#coffeplay').hammer().on('tap', function(){
		if (coffeePlayer.paused) {
			$('#coffeplay').css('background', 'url(./public/img/button_stopMusic@2x.png)');
			coffeePlayer.play();
		}

		else{
			$('#coffeplay').css('background', 'url(./public/img/button_playMusic@2x.png)');
			coffeePlayer.pause();
		}
	});
	
});