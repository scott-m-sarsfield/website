<?php include 'inc/header.php';?>

	<title>
	POOLPICKER
	</title>

</head>

<body>

	<form action="newgame.php" method="post">
	<div class="home foreground">
	
		<!-- GAME OF THREE -->
		<div id="g3" class="game">
			<button class="game_button" type="submit" value="3" name="gt">
			<img src="img/g3.png" alt="Game of three" class="game_select"/></button>
		</div>
		
		<!-- GAME OF FIVE -->
		<div id="g5" class="game">
			<button class="game_button" type="submit" value="5" name="gt">
			<img src="img/g5.png" alt="Game of five"  class="game_select"/></button>
		</div>
		
		
	</div>
	</form>
</body>
</html>
