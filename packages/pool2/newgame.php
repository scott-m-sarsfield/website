<?php include 'inc/header.php';?>
	<title>
	POOLPICKER
	</title>

<?php

	// Retrieves game type from index.php (Can be 3 or 5)
	if (isset($_POST['linkValid'])){
		$gametype = $_POST['gt'];
		$_SESSION['gametype'] = $gametype;
	}
	$gametype = $_SESSION['gametype'];


?>

</head>

<body>
<form action="limbo.php" method="post">
<div class="foreground sub">

	<!-- GAME TYPE -->
	<div id="textarea">
		<h1> You have selected <?php echo (15 / $gametype); ?> balls.</h1>
		<input type="hidden" name="gametype" value="<?= $gametype;?>" />
	</div>
	<div id="play" class="game">


		<!-- SERIES INITIALIZATION -->
		<input type="hidden" name="nChosen" value=0 />
		
		<!-- BUTTON TO START -->
		<a href="createGame.php"><img src="img/new.png" /></a>
		<br /><br /><br />
		
		
		<!-- TO JOIN A GAME -->
		
		<?php
		function gamesApplicable(){
			global $games;
			global $gametype;

			foreach($games as $game)
				if($game->gametype == $gametype)
					if($game->no_active < $game->no_players)
						return true;
			
			return false;
		}

		if (gamesApplicable()){
		
			echo ('<select name="gameID">');
		
			foreach($games as $name=>$game)
				if($game->gametype == $gametype)
				if($game->no_active < $game->no_players)
					echo ('<option value="'.$name.'">'.$name.' ('.$game->no_active.'/'.$game->no_players.')</option>');
					
			echo ('	</select>
						<br />
						<button type="submit" class="game_button">
							<img src="img/join.png" />
						</button>
				');
		}
		?>

		
		
	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" /></a>
	</div>

	
</div>
</form>
</body>
</html>
