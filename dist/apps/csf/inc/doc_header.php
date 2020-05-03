<?php
	/*starts session (how user is stored between pages)*/
	if(!headers_sent()){
		session_start();
	}

	// For debugging
	ini_set('display_errors', 'On');
	error_reporting(E_ALL | E_STRICT);



	/*load users*/
	include 'user_functions.php';
	loadUsers();

	/*load venues*/
	include 'venue_functions.php';
	loadVenues();

	// For debugging
	//var_dump($users);
	//var_dump($venues);

	/*searches for previous record of Card No. (User) */
	include 'loginVerification.php';


?>
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link rel="shortcut icon" href="img/favicon.ico">
	<link rel="apple-touch-icon" href="img/favicon.ico" />

	<!-- 1140px Grid styles for IE -->
	<!--[if lte IE 9]><link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" /><![endif]-->

	<!-- The 1140px Grid - http://cssgrid.net/ -->
	<link rel="stylesheet" href="css/1140.css" type="text/css" media="screen" />

	<!-- Scott's Mod for 1140 -->
	<link rel="stylesheet" href="css/scottMod.css" type="text/css">

	<!--Fonts (from Google)-->
	<link href='http://fonts.googleapis.com/css?family=Arbutus+Slab|Homenaje' rel='stylesheet' type='text/css' />

	<!-- Our styles -->
	<link rel="stylesheet" href="css/styles.css" type="text/css" media="screen" />

	<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
	<script type="text/javascript" src="js/css3-mediaqueries.js"></script>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

	<script type="text/javascript" src="js/venueMenuFunctions.js"></script>

	<!--For the menu.php and review.php pages [THE STAR REVIEWS]-->
	<style type='text/css'>
			#emptystars,#receivedstars{
				height:40px;
			}

			#emptystars{
				width: 200px;
				background: url('img/0stars.png');
				background-size: 200px 40px;
				background-repeat:no-repeat;
			}

			#receivedstars{
				background: url('img/5stars.png');
				background-size: 200px 40px;
				background-repeat:no-repeat;
			}
	</style>
