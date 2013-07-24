"use strict";
var Challenge = function(opt)
{
	this.$window = $(window);
	this.$container = null;
	this.year = 2012;
	this.start = 2012;
	this.goal = 3000;
	if ( typeof opt === 'object' )
	{
		if ( opt.container )
		{
			this.$container = $(opt.container);
		}
		else throw ArgumentError('You need to suply a container element');
	}
	else throw TypeError('Wrong option parameter');

	this.init();
};
Challenge.prototype.init = function()
{
	var self = this,
		windowHeight = this.$window.height(),
		bodyHeight = $body.height(),
		$yearContainer = $('#challenge .year'),
		$meter = $('#challenge .meter'),
		cb,
		t;
	// TODO: fix scrolling up
	// TODO: normalize delta across browsers
	// TODO: window.pageYOffset: test in IE&old FX
	this.$window.bind('mousewheel', cb=function(e)
	{
		// console.log(this, e, self.$window.scrollTop() + windowHeight, bodyHeight)
		// console.log('mouse', e.originalEvent.wheelDeltaY / 10)
		// var diff = self.$window.scrollTop() + windowHeight - bodyHeight;
		// console.log('diff', diff)


		// TODO: refactoring
		if ( !t )
		t=setInterval(function(){
			if ( self.year >= self.goal )
			{
				clearInterval(t);
				return;
			}
			var x = 150 * (1 - (self.goal - self.year) / 988)
			// console.log(x)
			self.year -= parseInt(Math.ceil(x));
			if ( self.year < self.start ) self.year = self.start;
			$yearContainer.text(self.year);
		}, 50);

		var diff = - parseInt(e.originalEvent.wheelDeltaY / 10);
		if ( self.$window.scrollTop() + windowHeight >= bodyHeight )
		{
			self.year += diff;

			if ( self.year >= self.goal )
			{
				clearInterval(t);
				self.$window.unbind('mousewheel', cb);
				self.$container.addClass('active');
				$yearContainer.text(self.goal);
			}
			else
			{
				$yearContainer.text(self.year);
				// 100% 200px
				$meter.height((self.year - 2012) / 988 * 200);
			}
		}
		else
			$yearContainer.text(self.start);
	});
};
