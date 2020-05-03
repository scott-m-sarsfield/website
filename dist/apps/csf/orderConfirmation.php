<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
<!-- CampusSmartFoods Project -->
<!-- COEN 161 MWF 8.00 - 9.15 -->
<!-- Scott Sarsfield & Stefan Zecevic -->

<!-- template.php 
		This would where we would elaborate on the basic function of the page,
	detailing its numerous features and nuances...
-->

	<title>CampusSmartFoods - Order Submitted!</title>

<?php
		// Check if order was passed (from menu.php).
		$orderSuccess = isset($_POST['totalPrice']) && $_POST['totalPrice'] != null;
		
		$orderStatus = $orderSuccess ? 'orderSucceeded' : 'orderFailed';
		
		
		// If it was, load the order details (price, calories,venue, and order #)
		if ($orderSuccess){
			$totalPrice = $_POST['totalPrice'];
			$totalCal = $_POST['totalCal'];
			$vCode = $_POST['venueID'];
			$orderNo = $_POST['orderID'];
		}		

		// Setting the timezone and ready time (for the order).
		date_default_timezone_set("America/Los_Angeles");  
		$readyTime = date("h:i:s A",time() + 1800);
?> 

</head>

<!-- Header and Navigation Bar (shared among all pages) -->

<?php include 'inc/header.php'; // Inserts Header and Nav
	
	// If the user is registered & tracking the budget or calories, add the order
	// to their history.
	if ($orderSuccess && !$newUser){
		if ($currentUser->budget['money'] != 0 || $currentUser->budget['calories'] != 0){
			$newOrder = new Order(date("d"),date("m"),date("Y"),
									$totalPrice,$totalCal,$venues[$vCode]->name);
			// Indexed by order #.
			$currentUser->order[$orderNo] = $newOrder;
			saveUsers();
		}
	}


?>

<!-- Image Slider - displays various pictures of whatever you want it to... -->

<div class="container">
	<div class="row">
		<div class="twocol"></div>
		<div class="eightcol orderSubmittedMessage" id="<?=$orderStatus;?>">
		<?php
			// If the order succeed, display confirmation & ready time.
			if ($orderSuccess)
				echo ('
					<h1>The Order Was Submitted!</h1>
					<h1>Total: $'.($totalPrice).'</h1>
					<h1>It Will Be Ready At '.$readyTime.'</h1>
					<h1> Thank You For Using CampusSmartFoods!</h1>');
			else
			// Else, spit out error.
				echo ('
					<h1>Whoops!</h1>
					<h1>The Order Failed.</h1>
					<h1>Go Back and Try Again</h1>');
		?>
					
		</div>
		<div class="twocol last"></div>
	</div>
	<div class="row" class="threebuffer"></div>
</div>

<!-- Footer -->

<?php include 'inc/footer.php' // Inserts footer
?>

<!--End of Page Content-->

<?php include 'inc/doc_footer.php' // Inserts global JS and closes <body>/<html>
?>
