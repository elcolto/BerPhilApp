$(document).ready(function(){
	$('#object1').hammer().on('doubletap', function(ev){
		$();
	});
});



function rotate(degree){
	$(this).css({
		'transform': 'rotate(' + degrees + 'deg'
	});
}