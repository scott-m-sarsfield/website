<?php include 'inc/doc_header.php' // Inserts Doctype, Viewport, Stylesheets, etc
?>
<!-- CampusSmartFoods Project -->
<!-- COEN 161 MWF 8.00 - 9.15 -->
<!-- Scott Sarsfield & Stefan Zecevic -->

<!-- review.php 
		This is where users can rate all of the venues that CampusSmartFoods have.
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
	
	// If a review was Submitted, add the review to the venue's reviews.
	if(isset($_POST['reviewSubmitted'])){
		// Ascertain what name to attach to the review ('Anonymous' for
		// guest user or when display name is unchecked, card number
		// otherwise).
		if (isset($currentUser) && $_POST['displayName'] == 'yes')
			$reviewUser = $cardNo;
		else
			$reviewUser = 'Anonymous';
			
		// Give the review a number (+1 from the count)
		$reviewNumber = count($currentVenue->reviews) + 1;
			
		// Create the Review object.
		$review = new Review($reviewNumber,
								$_POST['reviewSubject'],
								$_POST['reviewRating'],
								$_POST['reviewDescription'],
								$reviewUser,
								time());
		
		// Save it to the venue.
		$currentVenue->reviews[trim($reviewNumber)] = $review;
		
		// Save and reload the reviews.
		saveVenues();
		loadVenues();
	}
?>								
	<title>CampusSmartFoods - <?= $currentVenue->name;?> - Reviews</title>

	</head>

<!-- Header and Navigation Bar (shared among all pages) -->

<?php include 'inc/header.php' // Inserts Header and Nav
?>

<!-- Image Slider - displays various pictures of whatever you want it to... -->

<div class="container">
	<div class="row">
		<div class="twelvecol">
			<!-- VENUE BANNER -->
			<img src="img/<?=$vCode;?>_banner.png" alt="<?=$currentVenue->name;?>" />
		</div>
	</div>
</div>

<!-- Miscellanous Content -->

<div class="container">
	<div class="row">
		<div class="threecol" id="venueTitle">
			<h1><?= $currentVenue->name;?></h1>
		</div>
		<div class="ninecol last" id="venueRating">
			<div id="emptystars">
				<div id="receivedstars"></div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
// To allow the page to only show 4 Reviews at a time

var currIndex = 4;  // (initialization - the 4th review is the last
					//  	to show on the page)

// showFour() - Shows the lastIndex review and the 3
//           	before it.
function showFour(lastIndex){
	for(i = lastIndex; i > lastIndex - 4; i--)
		$('#rev'+i).show();
}

// hideFour() - Hides the lastIndex review and the 3 
//           	before it.
function hideFour(lastIndex){
	for(i = lastIndex; i > lastIndex - 4; i--)
		$('#rev'+i).hide();
}

// nextFour() - shows the next 4 reviews.
function nextFour(){
	hideFour(currIndex);
	currIndex += 4;
	showFour(currIndex);
	
	// Display the previous reviews bar.
	// If there are more reviews, display the more reviews bar.
	$('#prevRev').show();
	if (currIndex >= <?php echo count($currentVenue->reviews);?>)
		$('#moreRev').hide();
}


// prevFour - shows the previous 4 reviews.
function prevFour(){
	hideFour(currIndex);
	currIndex -= 4;
	showFour(currIndex);
	
	// Display the more reviews bar.
	// If there are more recent reviews, display the previous reviews bar.
	$('#moreRev').show();
	if (currIndex == 4)
		$('#prevRev').hide();
	
}

// defaultLook() - sets up the initial look of reviews
function defaultLook(){

	// Hide the previous reviews bar (& the more reviews bar if
	// 		the venue has 4 or fewer reviews...)
	$('#prevRev').hide();
	if (<?php echo (count($currentVenue->reviews) <= 4)? 'true' : 'false';?>)
		$('#moreRev').hide();
	$('.review').hide();

	showFour(4);
}



</script>

<div class="container">
	<div class="row">
		<div class="onecol"></div>
		<!-- PREVIOUS REVIEWS BAR -->
		<div class="tencol"  id="prevRev" onclick="prevFour()">
			<h1 class="center puffed italic">---More Recent Reviews---</h1>
		</div>
		<div class="onecol last"></div>
	</div>
</div>

<div class="container">
	<div class="row">
		<div class='onecol'></div>
		<div class='tencol'>
		<?php 
			// Starting with the most recent review, for all reviews...
			for($number = count($currentVenue->reviews),$i = 1; $number > 0; $number--, $i++){
				$review = $currentVenue->reviews[$number];
			
				// Look up the attached user's name
				if ($review->user != 'Anonymous')
					$userName = $users[$review->user]->fname.' '.$users[$review->user]->lname;
				// ...unless the user attached was 'Anonymous'.
				else
					$userName = 'Anonymous';
					
				// Create the review in HTML...
				echo ('
			<div class="wireframe review" id="rev'.$i.'">
				<div class="eightcol">
					<h2 class="italic reviewSubject">'.$review->subject.'</h2>
				</div>
				<div class="fourcol right-align last">
					<img src="img/'.$review->rating.'stars.png" alt="'.$review->rating.' stars" />
				</div>
				<hr />
				<p class="reviewDescription">'.$review->body.'</p>
				<div class="right right-align italic">
					<span class="reviewUser">'.$userName.'</span>
					<br />
					<span class="timeSubmitted">Submitted: '.date("r",$review->time).'</span>
				</div>
			</div>');}
		?>
		</div>
		<div class='onecol last'></div>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="onecol"></div>
		<!-- MORE REVIEWS BAR -->
		<div class="tencol" id="moreRev" onclick="nextFour()">
			<h1 class="center puffed italic">---More Reviews---</h1>
		</div>
		<div class="onecol last"></div>
	</div>
</div>

<!-- WRITE YOUR OWN REVIEW MODULE -->

<div class="container">
	<div class="row">
		<div class="onecol"></div>
		<div class="tencol wireframe" id="writeOwnReview">
			<form method="post">
			<div class="twelvecol">
				<h1 class="center puffed italic">Write Your Own Review</h1>
			</div>
			<div class="altRow">
				<div class="twocol italic right-align">Subject:</div>
				<div class="sixcol"><input type='text' name="reviewSubject" /></div>
				<div class="fourcol last">
					<div class="altRow">
						<div class="onecol"></div>
						<script type="text/javascript">
							// changeRating() - changes the rating in the review...
							function changeRating(nStars){
								// set the hidden input.
								$('#userRating').val(nStars);
								// turn all stars before it (inclusive) on
								for (i = 0; i < nStars; i++)
									$('#star'+(i+1)+' img').attr('src','img/starOn.png');
								// turn all stars above it (exclusive) off
								for (i = nStars; i < 5; i++)
									$('#star'+(i+1)+' img').attr('src','img/starOff.png');
							}
						
						</script>
						<?php
							// Ratings Module
							for($i=0;$i<5;$i++){
								echo('<div class="twocol" id="star'.($i+1).'" onclick="changeRating('.($i+1).')" ><img src="img/starOff.png" alt="star" /></div>');
							}
						?>
						<div class="onecol last"></div>
						<input type="hidden" id="userRating" name="reviewRating" value="0" />
					</div>
				</div>
			</div>
			<div class="altRow">	
				<div class="twocol italic right-align">Description:</div>
				<div class="sixcol"><textarea rows="4" id="reviewDescription" name="reviewDescription"></textarea></div>
				<div class="fourcol italic last center"><input type="checkbox" name="displayName" value="yes"/>Display Name</div>
				
				<div class="tencol"></div>
				
				<div class="twocol last"><input name="reviewSubmitted" type='submit' value='Submit' /></div>
				
		
				
			</div>
			</form>
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
