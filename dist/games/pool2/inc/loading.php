<?php

class Game {
	public $name,$status,$gametype,$no_players,$no_active,$players;
	
	public function __construct($name,$status,$gametype,$no_players,$no_active,$players){
		$this->name = $name;
		$this->status = $status;
		$this->gametype = $gametype;
		$this->no_players = $no_players;
		$this->no_active = $no_active;
		$this->players = $players;
	}
}

class Player {
	public $id, $balls;
	
	public function __construct($id,$balls){
		$this->id = $id;
		$this->balls = $balls;
	}
}



function loadGames() {
   // Parse XML file to load the global array
   $gamesXML = simplexml_load_file("xml/data.xml");
   // The global array to hold the info
   global $games;
   foreach ($gamesXML as $game){	
		$name = trim($game['name']);
		$status = trim($game->status);
		$gametype = trim($game->gametype);
		$no_players = trim($game->no_players);
		$no_active = trim($game->no_active);
		
		$i = 0;
		
		$players = Array();
		$balls = Array();
		
		foreach($game->roster->player as $player){
			$id = trim($player['id']);
			$balls = trim($player['balls']);
			$players[$i] = new Player($id,$balls);
			$i++;
		}
		
		$games[$name] = new Game($name,$status,$gametype,$no_players,$no_active,$players,$balls);
	}
}


function saveGames() {
	// The global array to hold the info
	global $games;

	//create the xml document
	$xmlDoc = new DOMDocument();
	
	//create the root element
	$root = $xmlDoc->appendChild(
			  $xmlDoc->createElement("games"));
		   
	//make the output pretty
	$xmlDoc->formatOutput = true;

	foreach ($games as $name=>$gameXML) {
		$gametag = $root->appendChild(
			$xmlDoc->createElement("game"));
			
		$gametag->appendChild(
			$xmlDoc->createAttribute("name"))->appendChild(
				$xmlDoc->createTextNode($name));
				
		$gametag->appendChild(
			$xmlDoc->createElement("status",$gameXML->status));

		$gametag->appendChild(
			$xmlDoc->createElement("gametype",$gameXML->gametype));
			
		$gametag->appendChild(
			$xmlDoc->createElement("no_players",$gameXML->no_players));
			
		$gametag->appendChild(
			$xmlDoc->createElement("no_active",$gameXML->no_active));
		
		$rostertag = $gametag->appendChild(
			$xmlDoc->createElement("roster"));
		
		foreach ($gameXML->players as $player) {	
			$playertag = $rostertag->appendChild(
				$xmlDoc->createElement("player"));
		
			$playertag->appendChild(
				$xmlDoc->createAttribute("id"))->appendChild(
					$xmlDoc->createTextNode($player->id));
			$playertag->appendChild(
				$xmlDoc->createAttribute("balls"))->appendChild(
					$xmlDoc->createTextNode($player->balls));
		}
	}
		
	$xmlDoc->save('xml/data.xml');

}
?>
