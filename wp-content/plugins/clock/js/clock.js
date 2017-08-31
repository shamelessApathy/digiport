(function()
{

	function Clock (el) 
		{
			this.minuteHand = jQuery('#minute');
			this.secondHand = jQuery('#second');
			this.hourHand = jQuery('#hour');
			this.time = new function()
			{
				return new Date();
			}
			this.utc = this.time.getUTCHours();
			this.seconds = this.time.getSeconds();			
			this.minutes = this.time.getMinutes();
			this.logic = function()
			{
				if (this.time.getHours() < 13)
				{
					return this.time.getHours();
				}
				else
				{
				return 	(this.time.getHours()-12);
				}
			};				
			this.hours = this.logic();
			
			
			this.position = function(element,unit)
			{
				if (element === (clock.hourHand))
				{
					var extra = this.minutes*.5
					var expression = "transform:rotate("+((30*unit)+extra)+"deg)";
					element.attr('style', expression);
					return;
				}
				var expression = "transform:rotate("+(6*unit)+"deg)";
				element.attr('style', expression);
				return;
			};			
		};
	var clock = new Clock();

	var presentTime = function()
	{
		var date = new Date();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var logic = function()
			{
				if (date.getHours() < 13)
				{
					return date.getHours();
				}
				else
				{
				return 	(date.getHours()-12);
				}
			};		
		var hours = logic();
		clock.position(clock.minuteHand, minutes);
		clock.position(clock.secondHand, seconds);
		clock.position(clock.hourHand, hours);
	}
	setInterval(presentTime, 1000);

})();