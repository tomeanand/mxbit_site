$(document).ready(function() {
	console.log("------------------>  "+$(window).scrollTop());
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });

    

	/* Next/prev and primary nav btn click handlers */
	$('a.clientList').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
	$('a.manned-flight').click(function(){
    	$('html, body').animate({
    		scrollTop:1500
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
    $('a.frameless-parachute').click(function(){
    	$('html, body').animate({
    		scrollTop:3000
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.english-channel').click(function(){
    	$('html, body').animate({
    		scrollTop:4600
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.about').click(function(){
    	$('html, body').animate({
    		scrollTop:6000
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.cenablers').click(function(){
    	$('html, body').animate({
    		scrollTop:7100
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#content').css('left',(0-(scrolled*.9))+'px');
	$('#parallax-bg1').css('left',(0-(scrolled*.25))+'px');
	$('#parallax-bg2').css('left',(0-(scrolled*.5))+'px');
	$('#parallax-bg3').css('left',(0-(scrolled*.9))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section0Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section1Top =  $('#clientList').offset().left + 1000;
	var section2Top =  $('#frameless-parachute').offset().left + 1000;
	var section3Top =  $('#english-channel').offset().left +3000;
	var section4Top =  $('#about').offset().left +4000;
	var section5Top =  $('#cenablers').offset().left + 5000;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section0Top && $(document).scrollTop() < section1Top){
		$('nav#primary a.clientList').addClass('active');
	}	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.manned-flight').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.frameless-parachute').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.english-channel').addClass('active');
	} else if ($(document).scrollTop() >= section4Top   && $(document).scrollTop() < section5Top){
		$('nav#primary a.about').addClass('active');
	}else{}
	
}
