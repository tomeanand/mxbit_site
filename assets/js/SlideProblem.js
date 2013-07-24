// "use strict";
var SlideProblem = function(opt)
{
	base(this, opt);

	if ( Modernizr.interactive )
	this.parallax = new ScrollParallax({
		container: this.$container,
		layers: [
			 {selector: '.icon_bg', ratio: .05, moveBg: true},
			 {selector: '.icon_fg', ratio: .25, moveBg: true}

		]
	});
};
inherits(SlideProblem, Slide);

SlideProblem.prototype.init = function()
{
	base(this, 'init');

	var self = this,
		end = null;
};

