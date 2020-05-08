<?php include 'inc/header.php';?>
	<title>
	POOLPICKER
	</title>

<?php

	// Retrieves game type from index.php (Can be 3 or 5)
	$game_type = $_POST['gt'];

	// Sets number of balls per player.
	$nBalls = 15 / $game_type;

	// Establishes an array of "end balls".
	for ($i=0;$i<$game_type;$i++)
		$array[$i] = (1+$i)*$nBalls;
?>

</head>

<body>
<form action="balls.php" method="post">
<div class="foreground sub">

	<!-- GAME TYPE -->
	<div id="textarea">
		<h1> You have selected a game of <?php echo $game_type; ?>.</h1>
		<input type="hidden" name="game_type" value="<?= $game_type;?>" />
	</div>
	<div id="play" class="game">

	<?php 
		// sending the array via hidden values...
		
		for ($i=0;$i<$game_type;$i++)
		{
			$name = 'b'.$i;
			echo '
		<input type="hidden" name="'.$name.'" value='.$array[$i].' />';
		}
	

	?>

		<!-- SERIES INITIALIZATION -->
		<input type="hidden" name="nChosen" value=0 />
		
		<!-- BUTTON TO START -->
		<button type="submit" class="game_button">
				<img src="img/play.png" />
		</button>
		
	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" /></a>
	</div>

	
</div>
</form>
</body>
</html>
