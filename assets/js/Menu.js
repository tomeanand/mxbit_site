"use strict";
var Menu = function(opt)
{
	this.$window = $(window);
	this.$menu = null;
	this.active = null;

	if ( typeof opt === 'object' )
	{
		if ( opt.container )
		{
			this.$menu = $(opt.container);
		}
		else throw ArgumentError('You need to suply a container element');

	}
	else throw TypeError('Wrong option parameter');

	this.init();
};
Menu.TOP_TRESHOLD = 400;
Menu.prototype.init = function()
{
	var self = this;
	this.$window.bind(Slide.EVENT_VIEW, function(e, id)
	{
		self.setActive(id);
	});
	this.$window.bind(Slide.EVENT_EXIT, function(e, id)
	{
		self.setInactive(id);
	});
	this.$menu.on('click touchstart', 'a', function(e){
		console.log($(this).attr('href'));
		// (?:intro|problem|solution|demo|use_cases|team)
		Anchor.handleClick.apply(this, arguments);
	});
	this.$window.bind('scroll', function (e) {
		var top = self.$window.scrollTop();
		
		self.$menu
			.toggleClass('active', top <= Menu.TOP_TRESHOLD);
	});

};
Menu.prototype.setInactive = function(id)
{
	this.active = null;
	this.$menu.find(id ? 'a[href="#' + id + '"]' : 'a.active')
		.removeClass('active');
};
Menu.prototype.setActive = function(id)
{
	if ( this.active === id )
		return;
	
	this.active = id;
	this.$menu.find('a[href="#' + id + '"]')
		.addClass('active')
		.siblings()
			.removeClass('active');
};