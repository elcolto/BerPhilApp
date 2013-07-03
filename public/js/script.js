//scrollen verhindern
document.ontouchmove = function(e) { e.preventDefault(); }

$(document).ready(function(){

	
	
	var wiggleInterval = setInterval(function(){
		var wiggleArray = $('.wiggle');
		var wiggleCount = wiggleArray.size();
		var random = Math.floor(Math.random()*wiggleCount);
		var wiggleObject = $(wiggleArray.get(random));
		wiggleObject.ClassyWiggle('start', {limit: 5});
	},3000	);

	$('.wiggle').hammer().on('tap', function(ev){
		ev.preventDefault();
		$(this).removeClass('wiggle');
	})

	var screenWidth = $("#content").width(); //$(window).width();
	var screenHeight = $("#content").height(); //$(window).height();
	var coffeePlayer = $("#coffee-audio")[0];

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
				$('#speech_bubble').fadeIn(2000);
			},500);
			
			showSpeechBubble = true;
			beanTapped = true;
		
			$('.bean').draggable({snap: '#cup-snap', snapMode: 'outer',});
			$(".bean").draggable({
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
			    snapped: function(event, ui) {
			        // Do something with 'ui.snapElement'...
			        $(this).draggable('disable');
			       	// $(this).removeClass('ui-draggable');
			       	
			       	if ($(this).css('display')!='none'){
			       		$(this).toggle();
			       		 beanCounter++;
			       	}
			       
		        	if(beanCounter==beanArray.length){
		        		$('#speech_bubble p').text("sehr gut, du hast alle bohnen gefunden.");
		        		$('#speech_bubble').fadeIn(2000);
		        		setTimeout(function(){
							$('#speech_bubble').fadeOut(2000);;
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

	$('.bean').hammer().on('dragstart', function(ev){
		$(this).css('z-index','100');
		if (showSpeechBubble) {
			$('#speech_bubble').fadeOut(2000);
			showSpeechBubble = false;
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
		$('#cup').animate({"bottom":"-280px"}, 2000 );
	};

	$('#coffeplay').hammer().on('tap', function(){
		if (coffeePlayer.paused) {
			$('#coffeplay').css('background-color', 'yellow');
			coffeePlayer.play();
		}

		else{
			$('#coffeplay').css('background-color', 'red');
			coffeePlayer.pause();
		}
	});
	
});