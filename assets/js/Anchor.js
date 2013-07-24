"use strict";
var Anchor = {};
Anchor.animateLinks = function()
{
	$('a[href^="#"]').click(Anchor.handleClick);
};
Anchor.scrollTo = function(idOrTop)
{
	if ( typeof idOrTop === 'number' )
	{
		var $obj = $('html, body'),
			stop = function(){$obj.stop();};
		$window.bind('mousewheel', stop);
		$obj
			.stop()
			.animate({scrollTop: idOrTop}, 1000, function(){
				$window.unbind('mousewheel', stop);
			});
	}
	else if ( typeof idOrTop === 'string' )
	{
		var slide = $(idOrTop).data('slide');
		if (slide)
			slide.scrollIntoView();
	}
	else throw TypeError('Wrong parameter');
};
Anchor.handleClick = function(e)
{
	var m = $(this).attr('href').match(/#\w+/i);
	if ( m && m[0] )
	{
		e.preventDefault();
		Anchor.scrollTo(m[0]);
		if ( history && history.pushState )
			history.pushState(null, null, m[0]);
	}
};