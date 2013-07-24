/* Author: *le Zuse
	Random shit
	Classes:
	Slide - one scene,
	VerticalParallaxSlide? - secene with vertical parallax (children moving),
	HorizontalParallaxSlide? - scene with mouse parallax (children moving on mouse move),
	MouseParallax - mouse handling,
	ScrollParallax - scroll handling,
	Anchor - animated scroll to anchors,
	Menu - navigation and UI, bottom bar
*/

"use strict";

var $window = $(window),
	$document = $(document),
	$body = null;
$document.ready(function()
{
	Modernizr.addTest('ie', function(){
		return !!navigator.userAgent.match(/MSIE/i);
	});
	Modernizr.addTest('ipad', function(){
		return !!navigator.userAgent.match(/iPad/i);
	});
	Modernizr.addTest('iphone', function(){
		return !!navigator.userAgent.match(/iPhone/i);
	});
	Modernizr.addTest('ios4', function(){
    	return !!navigator.userAgent.match(/iPad.+4_[0-9]/i);
	});
	Modernizr.addTest('interactive', function(){
		return !Modernizr.ipad && !Modernizr.iphone/*&& !Modernizr.ie*/
		// .mq('@media only screen and (max-device-width: 1024px) and (orientation:landscape)');
	});
	console.log('ios4: ' +Modernizr.ios4);
});
$window.on('load', function()
{
	$body = $(document.body);

	new Menu({
		container: '#navigation'
	});
	new Footer({
		container: '#footer'
	});

	var slides = [
		{id: 'about', 'class': 'SlideIntro'},
		{id: 'weare', 'class': 'SlideWe'},
		{id: 'service', 'class': 'SlideProblem'},
		//'allservice',
		{id: 'approach', 'class': 'SlideApproach'},
		// 'approach',
		{id: 'work', 'class': 'SlideUseCases'},
		'team'
		/*{id: 'business', 'class': 'SlideBusiness'},
		{id: 'market', 'class': 'SlideMarket'},
		{id: 'timeline', 'class': 'SlideTimeline'}
		,{id: 'contact', 'class': 'SlideContact'}*/
	];
	// TODO: check for anchor and slide there
	// Deactivate loader
	// setTimeout(function(){
	// 	document.body.className += ' active';
	// }, 1);
	$body.addClass('active');

	 //$.backstretch("../img/firstBg.jpg");


	// Setup slides
	for ( var k = 0, l = slides.length; k < l; ++ k )
	{
		var slide = typeof slides[k] === 'string'
			? {'class': 'Slide', id: slides[k], container: '#' + slides[k]}
			: slides[k];
		
		try
		{
			window[slide.id] = new window[slide['class']]({
				container: slide.container ? slide.container : '#' + slide.id,
				id: slide.id
			});
		}
		catch (e)
		{
			console.log('Error during slide "' + slide.id + '" setup', e);
		}
	}

	// Disable Mac OS top bounce effect
	navigator.appVersion.match(/mac/i) && $(window).bind('mousewheel', function(e){
		var x = e.originalEvent.wheelDeltaX || 0,
			y = e.originalEvent.wheelDeltaY || 0;
		var top = $(this).scrollTop();
		// console.log(y, top)
		if ( y > 0 && top <= 0 )
			e.preventDefault();
		
		// var left = $(this).scrollLeft();
		// if ( x > y && x > 0 && left <= 0 )
		// 	e.preventDefault();
	})

	// return;

	// TODO: remove
	// Disable inactive links
	$('a[href="#"], a:not([href])').click(function(e){
		e.preventDefault();
	});

	Anchor.animateLinks();
	

	new Scrolling({
		element: document.body
	});

	if ( !Modernizr.ipad )
	new MouseMove({
		element: document.body
	});

	initializeMap() ;
	intialiseGoogleAnalytics();
	$("form").bind("submit",contactbusiness);
});

function hellothere()	{
	alert("Hllo")
}


function initializeMap() {
        var hsr = new google.maps.LatLng(12.9192, 77.6534);

        var mapOptions = {
          zoom: 16,
          center: hsr,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

		var image = 'assets/img/mxbit_marker.png';

        var hsrmarker = new google.maps.Marker({ position: hsr,map: map,title: 'MXBIT TECHNOLOGY INNOVATIONS PVT. LTD.',icon:image});

	var contentHsr = "<div><b>MXBIT TECHNOLOGY INNOVATIONS PVT. LTD.</b><br> #525, I Floor,<br>8th Cross,30th Main Road,<br>Sector I, HSR Layout,<br>Bangalore 560102 India </div>";

	// var infowindowHsr = new google.maps.InfoWindow({ content: contentHsr, maxWidth: 300 });

	// 	google.maps.event.addListener(hsrmarker, 'click', function() {
	// 		infowindowHsr.open(map,hsrmarker);
	// 	});
      }

function intialiseGoogleAnalytics()	{
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29621914-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();	
}


function contactbusiness(){
		  var requestData = {
			  mailMessage : $("#mailMessage").val(),
			  personName : $("#personName").val(),
			  fromEmail : $("#fromEmail").val(),
			  company : $("#company").val(),
			  phone : $("#phone").val()

			  }


			var request = $.ajax({url: "sendmail.php",type: "POST",data: requestData,dataType: "html"});
			request.done(function(msg)	{
				alert(msg)
				resetForm()
			})
		return false;

	  }

	  function resetForm()	{
		$("#mailMessage").val("");
		$("#personName").val("");
		$("#fromEmail").val("");
		$("#company").val("");
		$("#phone").val("")

	  }
