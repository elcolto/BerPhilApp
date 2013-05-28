$(document).ready(function(){

	$('.animated_object').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$('#info').show('slow');
	});

	$('#info').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$(this).fadeOut();
	});


	$(function(){
		$('.object_draggable').draggable({snap: '#snappable', snapMode:'inner'});
	});

//	behavior of #bug
	var bug = document.getElementById('bug');
	var bugInterval = setInterval("hideAndShow("+bug.id+")", 5000);

	$(bug).hammer().on('tap', function(ev){
		ev.preventDefault();
		$(this).fadeOut('slow');
		clearInterval(bugInterval);	
	});

});