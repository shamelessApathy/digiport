<?php 

// Test to see if the variables got sent through
	if (!empty($_POST['yourIncome'])) {
		$yourIncome = $_POST['yourIncome'];
		$spouseIncome = $_POST['spouseIncome'];
		$marriageLength = $_POST['marriageLength'];
		$children = $_POST['children'];

// Checks how long they've been married		
		if (!empty($marriageLength)) {
			$months = ($marriageLength/2)*12;
		}
		if ($children === '1'){
			$yourPercentage = .28;
			$spousePercentage = .58;
		}
		else { $yourPercentage = .3; $spousePercentage = .5;}
		$yourIncome = $yourIncome*$yourPercentage;
		$spouseIncome = $spouseIncome*$spousePercentage;
		$alimony = $yourIncome - $spouseIncome;
		echo $alimony <= 0 ? "<p style='font-weight:bold;text-align:center;'>No alimony owed</p>" : "<p style='font-weight:bold; text-align:center;'>Alimony:$alimony per month <br> Months to pay:$months</p>";
		}

	
	else { echo "error";}

?>