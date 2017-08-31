jQuery(function (){
	var Weather = function(el,city)
	{
		this.initialize = function()
		{
			this.element = jQuery(el);
			this.container = this.element.find('.weather-container');
			this.city = city;
			this.url = 'http://api.openweathermap.org/data/2.5/weather?q='+this.city+'&units=imperial&APPID=704b017353e988c5e469b0e9491d6898';
			this.temp = this.element.find('#temp');
			this.weather = this.element.find('#weather');
			this.humidity = this.element.find('#humidity');
			this.cityTitle = this.element.find('#cityTitle');
			jQuery.ajax({
				type:'POST',
				url: this.url,
				success: function (response)
				{
					console.log(response);
					var result = response;
					var icon = '<img src="http://openweathermap.org/img/w/'+result.weather[0].icon+'.png"/>'
					var temp = result['main']['temp'];
					var humidity = result['main']['humidity']+'%';
					var weather = result['weather'][0]['description'];
					this.temp.html(temp);
					this.weather.html(weather);
					this.humidity.html(humidity);
					this.cityTitle.html(icon);

				}.bind(this)
			});
		};

		this.initialize();
	}

/*
*
* Gets all the Weather plugins that are on the page, loops through them, gets the data-city attribute, and passes it
* to the Weather() function
*/
	jQuery(document).ready(function($) 
	{
		var els = jQuery('.weather-container');
		for (var i=0; i < els.length; ++i) 
			{
				var city = els[i].getAttribute('data-city');
				new Weather(els[i],city);
			};
	});

})

