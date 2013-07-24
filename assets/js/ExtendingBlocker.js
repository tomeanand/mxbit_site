// "use strict";
// @constructor
var ExtendingBlocker = function(timeout, threshold)
{
	base(this, timeout, threshold);

	this.timeoutId_ = null;
};
inherits(ExtendingBlocker, Blocker);

ExtendingBlocker.prototype.blocking = function()
{
	var ret = base(this, 'blocking');
	if ( ret )
	{
		clearTimeout(this.timeoutId_);
		this.setTimeout_();
	}
	return ret;
}

ExtendingBlocker.prototype.setTimeout_ = function()
{
	this.timeoutId_ = setTimeout($.proxy(this.unblock_, this), this.timeout);
};