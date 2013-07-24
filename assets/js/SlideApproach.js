// "use strict";
var SlideApproach = function(opt)
{
	base(this, opt);

	if ( Modernizr.interactive )
	this.parallax = new ScrollParallax({
		container: this.$container,
		layers: [
			 {selector: '.icon_bg', ratio: .02, moveBg: false}

		]
	});
};

inherits(SlideApproach, Slide);

SlideProblem.prototype.init = function()
{
	base(this, 'init');

	var self = this,
		end = null;
};

