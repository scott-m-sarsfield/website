<?php include 'inc/header.php';?>
	<title>
	POOLPICKER
	</title>

</head>

<body>
<form action="limbo.php" method="post">
<div class="foreground sub">

	<!-- GAME TYPE -->
	<div id="textarea">
		<h1> New Game </h1>
	</div>
	<div id="play" class="game">

		<span class="spec">Name:</span><br />
		<input type="text" name="gameID" /><br />
		
		<span class="spec"># of Players:</span><br />
		<select name="no_players">
		<?php
			$gametype = $_SESSION['gametype'];
			
			for($i = 1;$i <= $gametype; $i++)
				echo ('<option value="'.$i.'">'.$i.'</option>');
		?>
		</select><br /><br />
		
		<button class="game_button">
			<img src="img/play.png" />
		</button>
		
		<input type="hidden" name="host" value="1"/>
		
		
	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" /></a>
	</div>

	
</div>
</form>
</body>
</html>
