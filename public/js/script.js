document.ontouchmove = function(e) { e.preventDefault(); }

$(document).ready(function(){

	
	var screenWidth = $("#content").width(); //$(window).width();
	var screenHeight = $("#content").height(); //$(window).height();

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
				$('#speech_bubble').fadeToggle(2000);
			},1500);
			
			showSpeechBubble = true;
			beanTapped = true;
		
		
		//	$('.bean').draggable();
		//	$('.bean').addClass('draggable');
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
						}, 5500);
		        		beanCounter=0;
		        		$(document).hammer().on('tap', kantata_handler);
		        	/*	$('#coffee_sonata').hammer().off('tap', kantata_handler);
		        		$('#cup').hammer().off('tap', kantata_handler);
*/

		        	}
			    }
			});
		}
	});
//	if (showSpeechBubble) {
		$('.bean').hammer().on('dragstart', function(ev){
			$('#speech_bubble').fadeOut(2000);
		});
//	}
	var kantata_handler = function(event){
		$('#coffee_sonata').animate({
			"left":screenWidth+1+"px"
		}, 2000);
		$('#cup').animate({"bottom":"-280px"}, 2000 );
		$(document).hammer().off('tap', kantata_handler);
	};
	
});