<?php include 'inc/header.php';?>
<title>
POOLPICKERS
</title>

<?php
	// Retreiving information from sender
	$game_type = $_POST['game_type'];
	$nBalls = 15 / $game_type;
	
	$nChosen = $_POST['nChosen'];
	
	
	// Loads array of balls.
	$array = Array();
	for($i = 0; $i < $game_type; $i++)
		$array[] = $_POST['b'.$i];
?>

</head>

<body>
<form action="balls.php" method="post">
<div class="foreground sub">


	<div id="textarea">
		<h1>Ready?</h1>


	<?php 
	// Creates hidden inputs for next array.
		for($i=0;$i<$game_type;$i++)
		{
		$name = "b".$i;
		echo "
			<input type=\"hidden\" name=".$name." value=".$array[$i]." />";}
	?>
		<input type="hidden" name="nChosen" value="<?= $nChosen;?>" />
		<input type="hidden" name="game_type" value="<?= $game_type;?>" />
	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" alt="HOME" /></a>
	</div>	
	
	<!-- NEXT BUTTON -->
	<div class="bottom_right">
			<button type="submit" class="game_button">
				<img src="img/NextIcon.png" alt="NEXT" />
			</button>
	</div>

	
</div>
</form>
</body>
</html>

