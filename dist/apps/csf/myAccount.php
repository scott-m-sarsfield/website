<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
<!-- CampusSmartFoods Project -->
<!-- COEN 161 MWF 8.00 - 9.15 -->
<!-- Scott Sarsfield & Stefan Zecevic -->

<!-- myAccount.php 
		This is where users can register and save their preferences.
-->

	<title>CampusSmartFoods - Account Management</title>

</head>

<!-- Header and Navigation Bar (shared among all pages) -->

<?php

	// isChecked() - determines if $boxName was checked. (in a checkbox input type)
	function isChecked($boxName,$value){
		if (!empty($_POST[$boxName]))
			foreach($_POST[$boxName] as $selected)
				if ($value == $selected)
					return true;
		return false;
	}

	// saveChanges()  - saves changes to users preferences / creates a new user.
	function saveChanges(){
		global $users,$currentUser,$_SESSION, $sessionValid, $cookieValid, $cardNo;
		
		// Figure out what are all of the users settings...
		$budget['money'] = trim($_POST['budgetLimit']);
		$budget['calories'] = trim($_POST['calorieLimit']);
		$settings['vegan'] = (isChecked('dietPref','vegan'))? 1:0;
		$settings['glutenfree'] = (isChecked('dietPref','g-free'))? 1:0;
		$settings['building'] = trim($_POST['building']);
		$settings['room'] = trim($_POST['roomNo']);
		
		// If new user, create a new User from scratch.
		if ($_POST['new_user'] == true){
			$changedUser = new User($_POST['fname'],
									$_POST['lname'],
									$budget,$settings,'');
			$cardNo = $_POST['cardNo'];
			
			// New Users may not have existing card numbers...
			if (isset($users[(string) $cardNo])) return;

			// Logs the user into the log-in module.
			$_SESSION['cardNo'] = $cardNo;
			$expireTime = 60*60*24*7;
			setcookie("cardNo",$_POST['cardNo'],time()+$expireTime);
			$sessionValid = true;
			$cookieValid = true;

		}
		// Otherwise look up, load, and update the user.
		else {
			$changedUser = $currentUser;
			$changedUser->budget = $budget;
			$changedUser->settings = $settings;
		}
		
		// Load the user into the $users array.
		$users[(string) $cardNo] = $changedUser;

		// Load the user as $currentUser.
		$currentUser = $changedUser;
		$newUser = false;
	}

	// Only save if the 'Register / Update' button was pressed.
	if (isset($_POST['save_changes'])){
		saveChanges();
		saveUsers();
	}
	
	
	// Determine if the user is tracking their budget or calories.
	$moneyTrack = $calorieTrack = false;
	if (!$newUser){
		if($currentUser->budget['money'] != '') $moneyTrack = true;
		if($currentUser->budget['calories'] != '') $calorieTrack = true;
	}
	
	// ifBuilding() - determines if the input in question has the
	//  			same value as the default building.
	function ifBuilding($building){
		global $newUser;
		
		if (!$newUser){
			global $currentUser;
			if ($currentUser->settings['building'] == $building)
				echo 'selected';
		}
	}
	
?>

<?php include 'inc/header.php'; // Inserts Header and Nav
?>
<!-- Miscellanous Content -->

<div class="container">
	<div class="row">
		<div class="twelvecol noImageBuffer center">
			<h1>My Account</h1>
		</div>
	</div>
	<form method='post' <?php if($newUser) echo 'action="?login"';?>>
	<div class="row">
		<div class="onecol"></div>
		<div class="fivecol">
			<fieldset>
				<!-- BASIC INFO -->
				<legend>Basic Info:</legend>
				<input type='hidden' name='new_user' value="<?=$newUser;?>" />
				First Name: <?php if($newUser) {echo "<input type='text' name='fname' />";} else echo $currentUser->fname; ?><br />
				Last Name: <?php if($newUser) echo "<input type='text' name='lname' />"; else echo $currentUser->lname; ?><br />
				Card #: <?php if($newUser) echo "<input type='text' name='cardNo' />"; else echo $cardNo; ?>
			</fieldset>
		
		</div>
		<div class="fivecol">
			<fieldset>
				<!-- DEFAULT ADDRESS -->
				<legend>Default Address:</legend>
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
				<br />
				Room: <input type="text" name="roomNo" <?php if(!$newUser) echo 'value="'.$currentUser->settings['room'].'"'?>/>
			</fieldset>	
		</div>
		<div class="onecol"></div>
	</div>
	<div class="row">
		<div class="onecol"></div>
		<div class="tencol">
			<fieldset>
				<!-- DIETARY PREFERENCES -->
				<legend>Dietary Preferences</legend>
				<div class="altRow">
					<div class="sixcol">
					Gluten Free <input type='checkbox' name='dietPref[]' value='g-free' <?php if(!$newUser) if($currentUser->settings['glutenfree']) echo 'checked'?>/>
					</div><div class="sixcol last">
					Vegan <input type='checkbox' name='dietPref[]' value='vegan' <?php if(!$newUser) if($currentUser->settings['vegan']) echo 'checked'?>/>
					</div>
				</div>
			</fieldset>
		
		</div>
		<div class="onecol last"></div>
	</div>
	<div class="row">
		<div class="onecol"></div>
		<div class="tencol">
			<fieldset>
				<!-- BUDGET TRACKING -->
				<legend>Budget Tracking</legend>
				<div class="altRow">
					<div class="sixcol">
					Track Budget?<br />
					<input type='radio' name='budgetTrack' value='yes' <?php if($moneyTrack) echo 'checked';?>/>Yes
					<input type='radio' name='budgetTrack' value='no' <?php if(!$moneyTrack) echo 'checked';?>/>No
					</div><div class="sixcol last">
					Monthly Budget <input type='text' name='budgetLimit' <?php if(!$newUser) echo 'value="'.$currentUser->budget['money'].'"' ?>/>
					</div>
				</div>
			</fieldset>		
		
		</div>
		<div class="onecol last"></div>
	</div>	
	<div class="row">
		<div class="onecol"></div>
		<div class="tencol">
			<fieldset>
				<!-- CALORIE TRACKING -->
				<legend>Calorie Tracking</legend>
				<div class="altRow">
					<div class="sixcol">
					Track Calories?<br />
					<input type='radio' name='calorieTrack' value='yes' <?php if($calorieTrack) echo 'checked';?>/>Yes
					<input type='radio' name='calorieTrack' value='no' <?php if(!$calorieTrack) echo 'checked';?>/>No
					</div><div class="sixcol last">
					Daily Caloric Limit <input type='text' name='calorieLimit' <?php if(!$newUser) echo 'value="'.$currentUser->budget['calories'].'"' ?>/>
					</div>
				</div>
			</fieldset>		
		
		</div>
		<div class="onecol last"></div>
	</div>
	<div class="row">
		<div class="eightcol"></div>
		<div class="threecol">
			<button id="registerButton" name='save_changes'>REGISTER / UPDATE</button>
		</div>
		<div class="onecol"></div>
	</div>
	</form>
</div>

<!-- Footer -->

<?php include 'inc/footer.php' // Inserts footer
?>

<!--End of Page Content-->

<?php include 'inc/doc_footer.php' // Inserts global JS and closes <body>/<html>
?>
