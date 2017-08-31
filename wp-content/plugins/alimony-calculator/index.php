<html>
<head>

</head>
<body>
<div class='wrapper'>
	<div class='calculator-container'>
		<h1 style='text-align:center;'>Utah Alimony Calculator</h1>
		<p style='text-align:center; font-size:1.2em;'> This calculator is to be used as a basic estimate for determining alimony payments, 
		Utah does not have an exact formula and is a subjective state when it comes to determining alimony.</p>
		<table class='table-style'>
		<tr><td class='gray'><p class='form-label'>Payor's monthly income:</p></td><td><input class='fields' type='text' id='your-income'></td></tr>
		<tr><td><p class='form-label'>Payee's monthly income:</td><td><input class='fields' type='text' id='spouse-income'></input></p></td></tr>
		<tr><td class='gray'><p class='form-label'>Marriage Length (years):</td><td><input class='fields' type='text' id='marriage-length'></input></p></td></tr>
		<tr><td colspan='2'><input type='checkbox' id='children'>Do you have children you will be receiving child support for?</input></td></tr><br>
		<br>
		<tr><td colspan='2' class='gray'><button type='button' id='submit'>Submit</button></td></tr>
		</table>
		<br><br>
		<div class='answer'></div>
	</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src='aplaceformyhead.org/alimony/js/script.js'></script>