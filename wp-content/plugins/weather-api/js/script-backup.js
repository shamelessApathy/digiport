var result;
jQuery(function (){
	console.log('ready');
	var container = document.getElementsByClassName('weather-container')[0];
	var city = container.getAttribute('data-city');
	var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&APPID=704b017353e988c5e469b0e9491d6898';
	$.ajax({
    type: 'POST',
    url: url,
    success: function (response) {
	result = response;
	console.log(result);
	var temp = result['main']['temp'];
	var humidity = result['main']['humidity'] + '%';
	var weather = result['weather'][0]['description'];
	$('#temp').html(temp);
	$('#weather').html(weather);
	$('#humidity').html(humidity);
	
	}

});
	

})