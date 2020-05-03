<!-- login.php
			Contains the layout necessary for the proper login module.
-->


<div id='log-in'>
	<div id="start">
<?php
	
	// If a user is logged in (card # stored in $_SESSION), fetch additional user
	// information and display the user's name in the box.
	if ($sessionValid) {
		echo ($currentUser->fname." ".$currentUser->lname);
		}
	// Otherwise prompt to Log In or Sign Up.
	else
		echo ('Log In / Sign Up');
?>
	
	<img src='img/arrow_down.png' alt='' />

	</div>
<?php

	// If logged in, display a link to myAccount.php (to adjust settings)
	// as well as an option to log out.
	if ($sessionValid)
		echo ('

		<div class="login_sub" id="logged">
			<ul>
				<li><a href="myAccount.php">My Account</a></li>
				<li><a href="?logout">Log Out</a></li>
			</ul>
		</div>
		');
	// If not logged in, display a link to myAccount (to register) as well
	// as an option to log in if their account has already been made.
	else
		echo ('
		<div class="login_sub" id="unknown">
			<ul>
				<li><a href="myAccount.php">Register</a></li>
				<li>
					<p style="font-size:90%;font-weight:bold;background-color:#000;color:white;">LOG IN</p>
					<form method="post" action="?login">Card #: <input type="text" name="cardNo" />
					<input type="submit" value="Go" /></form>
				</li>
			</ul>
		</div>');
?>
</div>
