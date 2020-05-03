<?php include 'inc/header.php';?>
	<title>
	POOLPICKER
	</title>

<?php
	$gameID = $_SESSION['gameID'];
	$playerID = $_SESSION['playID'];
	
	$currGame = $games[$gameID];
	$endBall = $_SESSION['endBall'];
	saveGames();
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
		$nBalls = 15 / $currGame->gametype;
		// displays the balls
		for ($i = $endBall - $nBalls + 1; $i <= $endBall; $i++)
			echo ('
			<img src="img/'.$i.'.png" alt="'.$i.'" />
			');
				
	?>
		</div>
		<input type="hidden" name="nChosen" value="<?= $nChosen;?>" />

	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" /></a>
	</div>
	
	<!-- AGAIN BUTTON -->
	<div class="bottom_right">
		<a href="limbo.php"><img src="img/NextIcon.png" /></a>
	</div>


	
</div>
</form>
</body>
</html>
