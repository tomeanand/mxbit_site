"use strict";
/**
* @requires ExtendingBlocker
*/
var MouseMove = function(opt)
{
	this.$window = $(window);
	this.$element = null;
	this.blocker = new ExtendingBlocker(1000);

	if ( typeof opt === 'object' )
	{
		if ( opt.element )
		{
			this.$element = $(opt.element);
		}
		else throw ArgumentError('You need to suply an element');
	}
	else throw TypeError('Wrong option parameter');

	this.init();
};

MouseMove.prototype.init = function()
{
	this.$window.bind('mousemove', $.proxy(this.onMove_, this));
	this.$window.bind(this.blocker.EVENT_UNBLOCK, $.proxy(this.clearMoving_, this));
};

// @private
MouseMove.prototype.onMove_ = function(e)
{
	if ( this.blocker.blocking() )
		return;

	this.$element.addClass('mousemove');
};

//@private
MouseMove.prototype.clearMoving_ = function(e)
{
	this.$element.removeClass('mousemove');
};