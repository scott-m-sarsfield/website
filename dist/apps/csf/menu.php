<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
<!-- CampusSmartFoods Project -->
<!-- COEN 161 MWF 8.00 - 9.15 -->
<!-- Scott Sarsfield & Stefan Zecevic -->

<!-- menu.php 
		This is where the user can view the menu and order online...
-->



<?php 

	// if a venue code was provided.
	$venueSelected = isset($_GET['venue']);
	
	//setting a default menu. (if not selected from the navigation bar.
	if (!$venueSelected){
		$_GET['venue'] = 'hc';
		$venueSelected = true;
	}
	
	// Determines which venue is selected and loads it.
	if ($venueSelected){
		$vCode = trim($_GET['venue']);
		if (isset($venues[$vCode]))
			$currentVenue = $venues[$vCode];
	}

	// ifBuilding() - Checks Default Building (from user preferences)
	// ---> returns 'selected' when $building matches.
	function ifBuilding($building){
		global $newUser;
		
		if (!$newUser){
			global $currentUser;
			if ($currentUser->settings['building'] == $building)
				echo 'selected';
		}
	}
	
	
	// loadMenuJavascript() - Spews out Javascript code to transfer the PHP
	//    Menu data into a Javascript Array.
	function loadMenuJavascript($venue){
		echo "venue = new Array(); \n\t\t\t";
		
		foreach($venue->food as $code=>$item)
			echo "venue['".$code."'] = new menuItem('".$code."','".$item->name
											."',".$item->calories.",".$item->price.",0);\n\t\t\t";
	
	}
	
?>
	<title>CampusSmartFoods - Venue Menus</title>
	<script type='text/javascript'>
	
	// menuItem() - creates a menuItem object with each piece of
	//    valuable menu item information.
	function menuItem(code,name,cal,price,quantity){
		this.code = code;
		this.name = name;
		this.cal = cal;
		this.price = price;
		this.quantity = quantity;
	}
	
	// userPref() - creates a userPref object with each piece
	//    of valuable user preferences.
	function userPref(glutenFree,vegan,calLimit,budgetLimit){
		this.glutenFree = glutenFree;
		this.vegan = vegan;
		this.calLimit = calLimit;
		this.budgetLimit = budgetLimit;
	}
	
	<?php 
		
		// ifValid() - Only returns input if input is valid (!= null).
		function ifValid($var){
			if ($var == null) return 0;
			else return $var;
		}
	
	// If the user is a member, load their preferences into a Javascript userPref object.
	if (!$newUser) print( 'var currJavaUser = new userPref('.$currentUser->settings['glutenfree'].',
								'.$currentUser->settings['vegan'].',
								'.ifValid($currentUser->budget['calories']).',
								'.ifValid($currentUser->budget['money']).');
								
	var caloriesConsumed = '.caloriesbudget().';
	var budgetSpent = '.moneybudget().';');
	
	// Else, make a userPref object with all values = 0 (everything is turned off).
		else echo('
	var currJavaUser = new userPref(0,0,0,0);');
	?>
	
	// prepareOverloadError() - Done at the beginning to prepare the warning in case
	//							the user goes over their tracking limits.
	function prepareOverloadError(){
		if (currJavaUser.budgetLimit != 0)
			$('#budgetOverdrawn').html("<h2>You're going over your Monthly Budget Limit of $"+currJavaUser.budgetLimit+"</h2>");
		if (currJavaUser.calLimit != 0)
			$('#caloriesOverdrawn').html("<h2>You're going over your Daily Caloric Limit of "+currJavaUser.calLimit+" calories.</h2>");
			
		$('#caloriesOverdrawn').hide();
		$('#budgetOverdrawn').hide();
		$('#budgetWarning').hide();
	}
	
	// checkLimits() - Evaluates once the 'Confirm' button is confirmed.  
	//  Returns false if limit is exceeded (delays form submission) and displays warning.
	function checkLimits(){
		// Determine order's calorie count and cost.
		var orderCalories = $('#totalCal').val();
		var orderCost = $('#totalPrice').val();
		
		// Compare order's data with amount of data left before exceeding limits.
		// Shows error & returns false if limit exceeded.
		var orderStatus = true;
		if (currJavaUser.calLimit - caloriesConsumed < orderCalories){
			$('#caloriesOverdrawn').show();
			$('#caloriesOverdrawn').append('<h2>(Order: '+orderCalories+' calories)</h2><br />');
			$('#budgetWarning').show();
			orderStatus = false;
		}
		if (currJavaUser.budgetLimit - budgetSpent < orderCost){
			$('#budgetOverdrawn').show();
			$('#budgetOverdrawn').append('<h2>(Order: $'+orderCost+')</h2><br />');
			$('#budgetWarning').show();
			orderStatus = false;
		}
		return orderStatus;
	}
	
	
	// hideWarning() - Executes once 'Cancel' button is clicked on warning.
	//  This resets the warning (hiding it again) and returns false (to cancel form submission)
	function hideWarning(){
		prepareOverloadError();
		
		return false;
	}
	
	// loads the menu.
	<?php loadMenuJavascript($currentVenue);?>
	
	</script>
	
</head>

<!-- Header and Navigation Bar (shared among all pages) -->

<?php include 'inc/header.php' // Inserts Header and Nav
?>

<!-- Image of Venue-->

<div class="container">
	<div class="row">
		<div class="twelvecol">
			<img src="img/<?=$vCode;?>_banner.png" alt="<?=$currentVenue->name;?>" />
		</div>
	</div>
</div>

<!-- Miscellanous Content -->

<div class="container">
	<div class="row">
		<div class="sevencol" id="venueTitle">
			<?= (!$venueSelected) ? '<h1>Our Venues</h1>' : '<h1>'.$currentVenue->name.'</h1>'; ?>
		</div>
		<div class="threecol" id="venueRating">
			<div id="emptystars">
				<div id="receivedstars"></div>
			</div>
		</div>
		<div class="twocol last" id="reviewsLink">
			<a href='review.php?venue=<?=$vCode;?>'><br />See Reviews</a>
		</div>
	</div>

	<div class="row">
		<div class="sevencol" id="menuList">
			<h1 id="menuHeader" >Menu</h1>
			<?php 
				// displayMenuItem() - adds html code to display the menu item.
				function displayMenuItem($item,$code){
					// whether the menu item is vegan or gluten free is indicated in its class
					echo ('
			<div class="container menuItem ');
					if($item->vegan) echo 'vegan ';
					if ($item->glutenfree) echo 'glutenfree';
					
					// image
					echo ('">
				<div class="altRow">
					<div class="threecol itemImage">');
					echo ('
						<img src="img/'.$item->thumbnail.'" alt="'.$item->name.'" />
					</div>
					<div class="ninecol last">
						<div class="container">
							<div class="altRow">
								<div class="twelvecol itemName">');
					// name
					echo ('
									<h2>'.$item->name.'</h2>
								</div>
							</div>
							<div style="width:100%">
								<div class="twelvecol itemDescription">');
					// description
					echo ('
									<p>'.$item->description.'</p>
								</div>
							</div>
							<div class="altRow">');
					// number of calories
					echo ('
								<div class="fivecol itemCalories">
									'.$item->calories.' calories
								</div>');
					// cost & button to add item to order.
					echo ('
								<div class="threecol itemPrice">
									$'.$item->price.'
								</div>
								<div class="fourcol last">
									<button class="addButton" id="'.$code.'"> +ADD </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><br />');
			}
				// Displays each menu item.
				foreach($currentVenue->food as $code=>$item)
					displayMenuItem($item,$code);
			?>
		</div>

	<form action="orderConfirmation.php" method="post">	
		<div class="fivecol last">
			<div id="orderPane" class="container">
				<div class="altRow">
					<h1>Your Order:</h1>
					<hr />
				</div>
				<?php
					// for each item, include a div for it on the order pane (to hide and show later)
					 foreach($currentVenue->food as $code=>$item){echo '
				<div class="altRow foodCartItem" id="'.$code.'_ordered">
					<div class="onecol" id="'.$code.'_cancel"><img src="img/cancel.png" alt="Remove" /></div>
					<div class="sevencol orderedItemName" id="'.$code.'_ordered-name">'.$item->name.'</div>
					<div class="threecol right-align itemCost" id="'.$code.'_cost"></div>
					<div class="onecol last"></div>
				</div>
				';}
				
				?>
				<div class="altRow" id="costCalculator">
					
					
					<hr />
					<div class="altRow">
						<div class="eightcol">SUBTOTAL:</div>
						<div class="threecol right-align" id="orderSubTotal">$0.00<?php //subtotal ?></div>
						<div class="onecol last"></div>
					</div>
					
					<?php 
					 // If the person is a member, they get a discount.
					if (!$newUser)
					echo('
					<div class="altRow">
						<div class="eightcol">10% DISCOUNT:</div>
						<div class="threecol right-align" id="orderDiscount">$0.00</div>
						<div class="onecol last"></div>
					</div>');
					?>
					
					<div class="altRow">
						<div class="eightcol">TAX:</div>
						<div class="threecol right-align" id='orderTax'>$0.00<?php //tax ?></div>
						<div class="onecol last"></div>
					</div>
				
					<div class="altRow">
						<div class="eightcol">FOOD TOTAL:</div>
						<div class="threecol right-align" id='orderFoodTotal'>$0.00<?php //food total ?></div>
						<div class="onecol last"></div>
					</div>
				
					<hr />
				
					<div class="sixcol center">
						<input id='transPU' type="radio" name='transit' value='pickup' checked />
						<span>Pick Up</span>
					</div>
					<div class="sixcol center last">
						<input id='transD' type="radio" name='transit' value='delivery' />
						<span>Delivery</span>
					</div>
					
					<div id="delOnly">
						<div class="sixcol padded center">
							Building:
							<select name='building'>
								<option value='none' <?= ifBuilding('none');?> >--</option>
								<option value='1' <?= ifBuilding('1');?> >1</option>
								<option value='2' <?= ifBuilding('2');?> >2</option>
								<option value='3' <?= ifBuilding('3');?> >3</option>
								<option value='4' <?= ifBuilding('4');?> >4</option>
								<option value='5' <?= ifBuilding('5');?> >5</option>
								<option value='6' <?= ifBuilding('6');?> >6</option>
								<option value='7' <?= ifBuilding('7');?> >7</option>
								<option value='8' <?= ifBuilding('8');?> >8</option>
								<option value='9' <?= ifBuilding('9');?> >9</option>
								<option value='10' <?= ifBuilding('10');?> >10</option>
							</select>
						</div>
						<div class="sixcol padded center last">
							Room:
							<input type="text" name='roomNo' size="5" value="<?= (!$newUser)? $currentUser->settings['room']:'';?>" />
						</div>
						
						<div class="altRow">
							<div class="eightcol ">FOOD TOTAL:</div>
							<div class="threecol right-align" id='orderFoodTotalCopy'>$0.00</div>
							<div class="onecol last"></div>
						</div>
						
						<div class="altRow">
							<input type='hidden' id='forDelivery' value='false' />
							<div class="eightcol">Delivery Fee:</div>
							<div class="threecol right-align" id='orderDeliveryFee'>$5.00</div>
							<div class="onecol last"></div>
						</div>
					</div>
						
					<div class="altRow">
						<div class="eightcol ">TOTAL:</div>
						<div class="threecol right-align" id='orderTotal'>$0.00</div>
						<div class="onecol last"></div>
					</div>

					<!--Variables to pass to orderConfirmation.php-->
					<input type="hidden" id = "totalPrice" name="totalPrice" value="0.00" />
					<input type="hidden" id = "totalCal" name="totalCal" value="0" />
					<input type="hidden" name="venueID" value="<?= $vCode;?>" />
					<?php 
						//
						if (!$newUser && isset($currentUser->order))
								$orderNo = count($currentUser->order) + 1;
						else
								$orderNo = 1;
					?>
					<input type="hidden" name="orderID" value="<?=$orderNo;?>" />
						<button id='confirmButton' class='wireframe' onclick="return checkLimits()">CONFIRM</button>
						<?php
							// If a logged-in user is tracking their budget or calories, include a warning box
							//  (in case they exceed the limit).
							if(!$newUser)
								if($currentUser->budget['money'] != 0 || $currentUser->budget['calories'] != 0)
									echo ('<div id="budgetWarning">
												<h1 class="center">Warning!</h1>
												<div id="budgetOverdrawn"></div>
												<div id="caloriesOverdrawn"></div>
												<button id="cancelButton" class="left" onclick="return hideWarning();">Cancel</button>
												<button id="continueButton" class="right" onclick="true">OK</button>
										</div>');

						?>
				</div>
			</div>
		</div>
	</form>

	
	</div>
</div>


<!-- Footer -->

<?php include 'inc/footer.php' // Inserts footer
?>

<!--End of Page Content-->

<?php include 'inc/doc_footer.php' // Inserts global JS and closes <body>/<html>
?>
