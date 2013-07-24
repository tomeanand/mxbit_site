"use strict";
/**
* TODO: Show placeholder when focused with no value
*/
var PlaceholderTextInput = function(opt)
{
	this.$window = $(window);
	this.$input = null;
	this.placeholder = '';

	if ( typeof opt === 'object' )
	{
		if ( opt.window )
		{
			this.$window = $(opt.window);
		}
		if ( opt.input )
		{
			this.$input = $(opt.input);
		}
		else throw new Error('You have to suply the input element');
		if ( opt.placeholder )
		{
			this.placeholder = opt.placeholder;
		}
		//else throw new Error('You have to suply the placeholder text');
	}
	else throw TypeError('Wrong option parameter');

	this.init();
}
PlaceholderTextInput.EMPTY_CLASS = 'empty';
PlaceholderTextInput.prototype.init = function()
{
	this.placeholder = this.$input.attr('placeholder');
	var val = this.$input.val();
	this.$input.toggleClass(PlaceholderTextInput.EMPTY_CLASS, val === '' || val === this.placeholder );
	

	var self = this;
	this.$input
		.val(this.placeholder)
		.focus(function(e){
			console.log('focus', e.target.value, this.value)
			if ( this.value === self.placeholder )
			{
				self.$input
					.val('');
			}
		})
		.blur(function(e){
			console.log('blur', e.target.value, this.value)
			if ( this.value === '' )
			{
				self.$input
					.val(self.placeholder)
			}
		})
		.keyup(function(e){
			self.$input.toggleClass(PlaceholderTextInput.EMPTY_CLASS, self.$input.val() === '');
		});
};