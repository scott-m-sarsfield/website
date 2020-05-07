<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
<!-- CampusSmartFoods Project -->
<!-- COEN 161 MWF 8.00 - 9.15 -->
<!-- Scott Sarsfield & Stefan Zecevic -->

<!-- calorieTracking.php 
		This is where users can track their calories and see a visualization of whatever...
-->

	<title>CampusSmartFoods - Calorie Tracker</title>

</head>

<!-- Header and Navigation Bar (shared among all pages) -->

<?php include 'inc/header.php'; // Inserts Header and Nav

	$newUser = !isset($currentUser);   // whether or not there is a user logged in
										// ($currentUser is defined in 'header.php'
?>

<div class="container">
	<div class="row">
		<div class="twelverow noImageBuffer center">
			<h1>My Calorie Tracker</h1>
		</div>
	</div>
	<div class="row">
		<div class="onecol"></div>
		<div class="threecol">
			<div class="wireframe center">
				<?php 
					// Determine if tracking is wanted & possible
					$trackingActive = !$newUser && $currentUser->budget['calories'] != 0;
					// (When money budget is 0, there is no budget...)
					$trackingPossible = (!$newUser)?($currentUser->order != null):false;
					
					// If not active, indicate they are not signed up.
					if (!$trackingActive)
						echo ('<br /><h2>You are not signed up for Calorie Tracking...</h2>');
					// Otherwise indicate how much of their monthly budget is left as well as their limit.
					else 
						echo ('
				<h2>Daily<br />Caloric Limit:<br />
				<span id="calorieLimit">'.$currentUser->budget['calories'].'<br />calories</span></h2>');
				?>
				<br />
				<span class='right'><a href="myAccount.php">change - &gt; </a></span>	
			</div>
		</div>
		<div class="sevencol">
			<div class="wireframe" id="tracking_visualization">
				<?php
					// Only show the visualization if there is data to visualize...
					if ($trackingActive && $trackingPossible)
						include 'inc/calorieTrackVis.php';
					// Otherwise, just display some picture.
					else
						echo '<img src="img/hlpic2.png" alt="Happy Picture" />';
				?>
			</div>
		
		</div>
		<div class="onecol last"></div>
	</div>
	<div class="row">
		<div class="twelvecol last center underline">
			<h2>Record</h2>
		</div>
	</div>
	<div class="row">
		<div class="onecol"></div>
		<div class="tencol ">
			<table class="recordTable">
				<tr><th>Date</th><th>Item</th><th>Calories</th></tr>
				<?php caloriestracking();  //found in 'inc/user_functions.php' ?>
			</table>		
		</div>
		<div class="onecol last"></div>
	</div>
</div>
<!-- Footer -->

<?php include 'inc/footer.php' // Inserts footer
?>

<!--End of Page Content-->

<?php include 'inc/doc_footer.php' // Inserts global JS and closes <body>/<html>
?>
