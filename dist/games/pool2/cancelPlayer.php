<?php
	session_start();
	include 'inc/loading.php';
	loadGames();
	
	$gameID = $_GET['gid'];
	$currGame = $games[$gameID];
	$playerID = $_GET['pid'];
	

	foreach($currGame->players as $index=>$player){
		if ($player->id == $playerID){
			$_SESSION['endBall'] = $player->balls;	
			unset ($currGame->players[$index]);
			$currGame->no_active--;
			if ($currGame->no_active == 0)
				$currGame->status = 0;
		}
	}
	
	saveGames();

?>
