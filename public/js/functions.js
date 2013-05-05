$(document).ready(function(){
	$('.animated_object').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$('#info').show('slow');
	});

	$('#info').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$(this).fadeOut();
	});
});



function rotate(degree){
	$(this).css({
		'transform': 'rotate(' + degrees + 'deg'
	});
}