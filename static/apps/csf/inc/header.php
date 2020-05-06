<body>

<div class="container"><div id="headerContainer">
	<div class="row" id="headerRow">
		<div id="header" class="twelvecol">
			<span id="powered-by">Powered by Campus SmartFoods Inc.</span>
			<?php include 'login.php';?>
			<a href="../csf">
			<img id="logo" alt="logo" src="img/logo.png"/>
			</a>
			<ul id="nav">
				<li class="left navNormal"><a href="health.php">Health &amp; Wellness</a></li>
				
				<li class="left">
				<div class="navNormal navWithSub" id="venues_nav">
					<div class="nav_source"><a href=''>Venues</a></div>
					<div class="nav_sub" id="venueLinks">
						<ul>
							<?php
								// For each venue, add a link to it's menu page.
								foreach($venues as $code=>$venue){
									echo ('
							<li><a href="menu.php?venue='.$code.'">'.$venue->name.'</a></li>');}
							?>
						</ul>
					</div>
				</div>
				</li>
				
				<li class="right">
				<div class="navWithSub" id="tools_nav">
					<div class="nav_source"><a href=''>Tracking Tools</a></div>
					<div class="nav_sub">
						<ul>
							<li><a href="myAccount.php">Register For Tracking</a></li>
							<li><a href="budgetTracking.php">Budget Tracker</a></li>
							<li><a href="calorieTracking.php">Calorie Tracker</a></li>
						</ul>
					</div>
				</div>
				</li>
				
				<li class="right">
				<div class="navWithSub" id="forum_nav">
					<div class="nav_source"><a href=''>Reviews</a></div>
					<div class="nav_sub">
						<ul>
							<?php
								// For each venue, add a link to it's review page.
								foreach($venues as $code=>$venue){
									echo ('
							<li><a href="review.php?venue='.$code.'">'.$venue->name.'</a></li>');}
							?>
						</ul>
					</div>
				</div>
				</li>

			</ul>
			
		</div>
	</div>
</div></div>
