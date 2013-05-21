
function rotate(){
	var rotateObject = $('#object5');
};

function hideAndShow(objectName){
	
	if ($(objectName).css('display') != 'none') {
		$(objectName).toggle('slow');
	}
	//random position
	var width = $(window).width();
	var height = $(window).height();
	var x = Math.floor(Math.random()*(width - 50));
	var y = Math.floor(Math.random()*(height - 50));
	
	// if object is not displayed: 1. change position, 2. display objec
	// is it display: reverse sequence
	if ($(objectName).css('display') == 'none') {
		$(objectName).css({'left':x, 'top':y});
		$(objectName).toggle('slow');
	}
	else{
		//set delay to prevent "slowness" of function toggle
		setTimeout(function(){
			$(objectName).css({'left':x, 'top':y});
		}, 350);
	}
};