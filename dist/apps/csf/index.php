<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
	<title>CampusSmartFoods - Welcome!</title>
	
	<!--Slider Stylesheets-->
	<link rel="stylesheet" href="js/nivo-slider/themes/default/default.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="js/nivo-slider/nivo-slider.css" type="text/css" media="screen" />

</head>

<?php include 'inc/header.php' // Inserts Header and Nav
?>

<!-- Slider with Venue Images -->
<div class="container">
	<div class="row">
		<div class="twelvecol">
			<div class="slider-wrapper theme-default">
					<div id="slider" class="nivoSlider">
						<img src="img/venue_ex1.png"  alt="Example Venue" />
						<a href="menu.php?venue=hc"><img src="img/hc_banner.png"  alt="Holy Crepe Cafe" title="Holy Crepe Cafe" /></a>
						<a href="menu.php?venue=ht"><img src="img/ht_banner.png"  alt="Hog-Tied BBQ" title="Hog-Tied BBQ" /></a>
					</div>
					<div id="htmlcaption" class="nivo-html-caption">
						<strong>This</strong> is an example of a <em>HTML</em> caption with <a href="#">a link</a>. 
					</div>
				</div>
		</div>
	</div>
</div>
<!-- Our Goals -->
<div class="container">
	<div class="row">
		<div class="sevencol" id='goals'>
			<h1>Our Mission</h1>
			<p>In this current world of obesity and unhealthy lifestyles, we at CampusSmartFoods want to provide you with the most information possible to ensure that you start living a healthier life today.  In this site you will be able to :</p>
			<ul>
				<li>Order food from one of our venues online.</li>
				<li>Track your budget.</li>
				<li>Track you caloric consumption</li>
				<li>Communicate with other members</li>
				<li>Discover healthier alternatives.</li>
			</ul>
			<p>And,if you have any suggestions, tell us in the forum.  Let us help you turn into a better, healthier you. </p>
		</div>
		<div class="fivecol last">
		<img src="img/hppic.png" alt="Our Excellent Team / Our Exemplary Food" />
		</div>
	</div>
</div>

<!-- Our Venues -->
<div class="container" style='margin-top:30px;'>
	<div class="row">
		
		<div class="sixcol ">
		<img src="img/campusmap.png" alt="Campus Map with Venues" />
		</div>
		<div class="sixcol last">
			<h1>Our Venues</h1>
			<p>We have many great venues on campus, offering a wide range of cuisines in order to satisfy everyone.  Just click on one of the links below to learn more about each location and their menus.</p>
			<ul id="venue_list">
				<?php
					// For each venue
					foreach ($venues as $code=>$item) {
						// display a link, the venue's title and a brief description of the type of venue.
						echo "<li><hr /><a href='menu.php?venue=".$code."'><h3>$item->name</h3></a>$item->type<br/>";
						
						// indicate if any items on the menu is vegan or glutenfree.
						$vegan = $glutenfree = false;
						foreach($item->food as $menuItem){
							if($menuItem->vegan == 1)
								$vegan = true;
							if ($menuItem->glutenfree == 1)
								$glutenfree = true;
						}
						if ($vegan)
							echo "<span class='green'>*Vegan Options Available*&nbsp;</span>";
						if ($glutenfree)
							echo "<span class='green'>*Gluten-Free Options Available*&nbsp;</span>";
					}
				?>
			</ul>
			<hr />
			<div id="dietLegend">
			</div>
		</div>
	</div>
</div>

<?php include 'inc/footer.php' // Inserts footer
?>

<script type="text/javascript" src="js/nivo-slider/jquery.nivo.slider.js"></script>
<script type="text/javascript">
	$(window).load(function() {
		$('#slider').nivoSlider();
	});
</script>

<?php include 'inc/doc_footer.php' // Inserts global JS and closes <body>/<html>
?>
