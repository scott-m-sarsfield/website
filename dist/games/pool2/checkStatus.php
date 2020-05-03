<?php
	session_start();
	include 'inc/loading.php';
	loadGames();
	
	$gameID = $_GET['gid'];
	$currGame = $games[$gameID];
	$playerID = $_GET['pid'];

	if($currGame->no_players == $currGame->no_active){
		$nBalls = 15 / $currGame->gametype;

		for($i = 1; $i <= $currGame->gametype; $i++)
			$setBalls[$i-1] = $i * $nBalls;

		$nChosen = 0;
		



		foreach($currGame->players as $index=>$player){
			$lastSlot = $currGame->gametype - $nChosen - 1;
			$slot = rand(0,$lastSlot);

			$ball = $setBalls[$slot];
			$player->balls = $ball;

			$setBalls[$slot] = $setBalls[$lastSlot];
			$nChosen++;

		}
		$currGame->status = 1;

	}

	if($currGame->no_active == 0)
		$currGame->status = 0;

	saveGames();
	loadGames();

	if($currGame->status == 1){
		foreach($currGame->players as $index=>$player){		
			if ($player->id == $playerID){
				$_SESSION['endBall'] = $player->balls;
				$currGame->no_active--;
				if ($currGame->no_active == 0)
					$currGame->status = 0;
				saveGames();
			}	
		}

		echo 'true';
	}
	else 
		echo 'false';
?>
