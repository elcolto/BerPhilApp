
$(document).ready(function(){

	
	$('.animated_object').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$('#info').show('slow');
	});

	$('#info').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$(this).fadeOut();
	});

	$('#bug').hammer().on('tap', function(ev){
		ev.preventDefault();
		$(this).fadeOut('slow');
		clearTimeout();	
	});

	$(function(){
		$('.get_pop').draggable({snap: '#snappable', snapMode:'inner'});
		
	});
	var newPosition=function (){
	var width = $(window).width();
	var height = $(window).height();
	var x = Math.random()*(width - 50);
	var y = Math.random()*(height - 50);
		
		
		$('#bug').css({'left':x,
						'top':y});
		$('#bug').show('slow');
		//$('#bug').fadeOut('slow');

	setTimeout(newPosition, 2000);
	}
	newPosition();


});



$(function(){
	var rotateObject = $('#object5');
});