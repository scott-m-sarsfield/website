<?php include 'inc/header.php';?>
	<title>
	POOLPICKER
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
	
	//Defines upper limit
	$last_slot = $game_type - $nChosen - 1;
	
	// Selects the balls.
	$slotChosen = rand(0,$last_slot);
	$ballsChosen = $array[$slotChosen];
	
	// Reorganizes the array.
	$array[$slotChosen] = $array[$last_slot];
	$nChosen++;

?>

</head>

<body>
<form action="limbo.php" method="post">
<div class="foreground sub">

	<!-- TEXT -->
	<div id="textarea">
		<h2> Here are your balls:</h2>
		<input type="hidden" name="game_type" value="<?= $game_type;?>" />
	</div>
	<div class="game">
		<div class="balls">
	
	<?php 
		// displays the balls
		for ($i = $ballsChosen - $nBalls + 1; $i <= $ballsChosen; $i++)
			echo ('
			<img src="img/'.$i.'.png" alt="'.$i.'" />
			');
				
		// sending the array via hidden values...
		for ($i=0;$i<$game_type;$i++)
		{
			$name = 'b'.$i;
			echo '
		<input type="hidden" name="'.$name.'" value='.$array[$i].' />';
	}
	?>
		</div>
		<input type="hidden" name="nChosen" value="<?= $nChosen;?>" />

	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" /></a>
	</div>
	<div class="bottom_right">
	<?php
		if ($nChosen < $game_type)
			echo ('
		<button type="submit" class="game_button"><img src="img/NextIcon.png" /></a>
		');
	?>
	</div>

	
</div>
</form>
</body>
</html>
