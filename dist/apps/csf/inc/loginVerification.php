<?php
	// cookieTest.php
	// This file, included before the <html> tag controls the usage of
	// cookies in the CampusSmartFoods website.  These cookies are used in
	// the log-in pane.


	//If a card number has been sent through a from with a 'post' method.
	//		[Just creating a test condition...]
	$postValid =isset($_POST['cardNo']) && $_POST['cardNo'] != null;
	
	//If a card number has been stored as a cookie on the user's computer.
	//  	[Just creating a test condition...]
	$cookieValid =isset($_COOKIE['cardNo']) && $_COOKIE['cardNo'] != null;
	
	//If a card number has been stored as a cookie on the user's computer.
	//  	[Just creating a test condition...]
	$sessionValid =isset($_SESSION['cardNo']) && $_SESSION['cardNo'] != null;
	
	
	
	//If the card number is stored in a cookie, this copies the value to
	// $_SESSION, which would prevent the user from logging out unexpectantly
	// mid-session.
	if ($cookieValid && !$sessionValid){
		$_SESSION['cardNo'] = $_COOKIE['cardNo'];
		$sessionValid = true;
	}

	//If a card number was passed through the $_POST array, this creates
	// a cookie which is put on the users computer for later reference.
	if(isset($_GET['login']) && $postValid && isset($users[trim($_POST['cardNo'])])){
		$_SESSION['cardNo'] = $_POST['cardNo'];
		$expireTime = 60*60*24*7;
		setcookie("cardNo",$_POST['cardNo'],time()+$expireTime);
		$sessionValid = true;
		$cookieValid = true;
	}
	
	// If the logout button is pressed (which adds '?logout' to the URL),
	// this effectively expires the cookie placed on the user's computer.
	if (isset($_GET['logout'])){
		setcookie("cardNo",null,time()-5000);
		session_destroy();
		$sessionValid = false;
		$cookieValid = false;
	}
	
	// This actually looks up and logs in the user (by using the 'cardNo') 
	// variable as an index.
	if ($sessionValid) {
		$cardNo = trim($_SESSION['cardNo']);
		$currentUser = $users[$cardNo];
	}
	
	$newUser = !isset($currentUser);  // Indicates if the user is not logged in.
?>
