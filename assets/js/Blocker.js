"use strict";
//TODO: treshhold refactoring
/**
* Blocks user selected action for a given period of time
* @requires jQuery
*/
var Blocker = function(timeout, threshold)
{
	this.$window = $(window);
	this.timeout = typeof timeout === 'number' ? timeout : 1000;
	this.blocked = false;
	this.disabled = false;
	this.hits = 0;
	this.threshold = threshold ? threshold : Blocker.TRESHOLD;
	this.EVENT_UNBLOCK = Blocker.EVENT_UNBLOCK + Blocker.counter ++;

	this.init();
};
Blocker.counter = 0;
Blocker.EVENT_UNBLOCK = 'BLOCKER_UNBLOCK';
Blocker.TRESHOLD = 1;

Blocker.prototype.init = function()
{
	if ( this.timeout < 1 )
		this.disabled = true;
};
/**
* @returns bool True in blocked state
*/
Blocker.prototype.blocking = function()
{
	if ( !this.disabled && this.blocked )
		return true;

	if ( ++ this.hits >= this.threshold )
	{
		this.hits = 0;
		this.blocked = true;
		this.setTimeout_();
	}

	return false;
};
Blocker.prototype.setTimeout_ = function()
{
	setTimeout($.proxy(this.unblock_, this), this.timeout);
};
Blocker.prototype.unblock_ = function()
{
	this.blocked = false;
	// For instance subscribers
	this.$window.triggerHandler(this.EVENT_UNBLOCK);
	// For general subscribers
	this.$window.triggerHandler(Blocker.EVENT_UNBLOCK);
};