	var Calculator = function(data) {
		this.data = data;
		this.pluginUrl = jQuery('.calc-wrapper').attr('data-plugin-dir-url');
		this.sendData = function() {
			var data = this.data;
			
		    jQuery.ajax({
            type: 'POST',
            url: this.pluginUrl + "/phpcalc.php",
            data: data,
            success: function (response) {
				var result = response;
				var answer = document.getElementsByClassName('answer')[0];
				answer.innerHTML = result;
				
	  }})
		};
	}

document.addEventListener('DOMContentLoaded', function() {
	// Listens for Submit click, defines varibles, stores them in an object, and passes them to the Calculator function
var submit = document.getElementById('submit');
if (submit)
{
	submit.addEventListener('click', function() {
		var yourIncome = document.getElementsByTagName('input')[0].value;
		var spouseIncome = document.getElementsByTagName('input')[1].value;
		var marriageLength = document.getElementsByTagName('input')[2].value;
		var children = document.getElementsByTagName('input')[3]
		if (children.checked){
			var children = 1;
		}
		else { var children = 0;}
		var pass = {yourIncome:yourIncome, spouseIncome:spouseIncome, marriageLength:marriageLength, children:children};
		var calculator = new Calculator(pass);
		calculator.sendData();
	})

}
})
	
