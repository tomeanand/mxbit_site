"use strict";
var Footer = function(opt)
{
	this.$window = $(window);
	this.$footer = null;
	if ( typeof opt === 'object' )
	{
		if ( opt.container )
		{
			this.$footer = $(opt.container);
		}
		else throw ArgumentError('You need to suply a container element');
	}
	else throw TypeError('Wrong option parameter');

	this.init();
};
Footer.SIGN_TRESHOLD = 70;
Footer.BAR_TRESHOLD = 400;
Footer.prototype.init = function()
{
	var self = this;
	this.$window.bind('scroll', function (e) {
		var top = self.$window.scrollTop(),
			windowHeight = self.$window.height(),
			docHeight = $(document).height();
		
		// console.log(top, windowHeight, docHeight);
		self.$footer
			.toggleClass('active', top + windowHeight >= docHeight - Footer.BAR_TRESHOLD)
			.find('.scroll')
				.toggleClass('inactive', top + windowHeight >= docHeight - Footer.SIGN_TRESHOLD);
	});

	this.$footer.find('.top').click(function(e){
		// TODO: dependecy inject?
		about.scrollIntoView();
	});

	this.$footer.find('.scroll').click(function(e){
		$('section.active').next().data().slide.scrollIntoView();
	});
};