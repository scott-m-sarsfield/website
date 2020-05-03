<?php

	function ConnectToDB(){
		$dbh = new PDO('mysql:host=localhost;dbname=babypool','babypool','babypool');
		return $dbh;
	}

function getAllGuesses(){
	$dbh = ConnectToDB();
	
	$stmt = $dbh->prepare("
		SELECT * FROM guesses
		"
	);
	//$stmt->execute(array($email));
	$stmt->execute([]);
	
	$arr = array();
	
	while($row = $stmt->fetch()){
		$obj = array(
			"name"=>$row['name'],
			"date"=>$row['date'],
			"time"=>$row['time'],
			"height"=>$row['height'],
			"weight"=>$row['weight']
		);
		//echo $obj;
		$arr[] = $obj;
	}
	return $arr;
}

function submitGuess($name,$date,$time,$height,$weight){
	$dbh = ConnectToDB();
	
	$stmt = $dbh->prepare("
	INSERT INTO guesses(`name`,
		`date`,
		`time`,
		`height`,
		`weight`)
	VALUES(?,?,?,?,?);
		"
	);
	//$stmt->execute(array($email));
	$stmt->execute([$name,$date,$time,$height,$weight]);
	
}


	header('content-type: application/json; charset=utf-8');
	//header('Access-Control-Allow-Origin: *');
	header('Cache-Control:no-cache');
	
	function getParam($key,$default){
		if(isset($_POST[$key])) return $_POST[$key];
		else if(isset($_GET[$key])) return $_GET[$key];
		
		return $default;
	}
	
	function respond($data){
		if(isset($_GET['callback'])) $_GET['callback'] . '('.json_encode($data).')';
		else echo json_encode($data);
	}
	
	//---------------------------------------------------------------------------
	// INTERFACE (essentially)	

	$function = "";
	if(isset($_POST['function'])) $function = $_POST['function'];
	else if(isset($_GET['function'])) $function = $_GET['function'];
	else{  
		echo "hello from babypool server.";
		flush();
		http_response_code(299); 
	}
	if($function == 'get_guesses') 	respond(getAllGuesses());
	if($function == 'submit_guess'){
		$name = getParam('name','');
		$date = getParam('date','');
		$time = getParam('time','');
		$height = getParam('height','');
		$weight = getParam('weight','');;
		submitGuess($name,$date,$time,$height,$weight);
		respond(array("message"=>"Acknowledged."));
	}

?>