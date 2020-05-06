<?php
date_default_timezone_set('America/Los_Angeles');

$users = array();
class Order {
		public $day,$month,$year,$money,$calories,$venue;

		public function __construct($day,$month,$year,$money,$calories,$venue) {
			$this->day = $day;
			$this->month = $month;
			$this->year = $year;
			$this->money = $money;
			$this->calories = $calories;
			$this->venue = $venue;
		}
	}

class User {
		public $cardId,$fname,$lname,$budget,$settings,$order;

		public function __construct($fname,$lname,$budget,$settings,$order) {
			$this->fname = $fname;
			$this->lname = $lname;
			$this->budget = $budget;
			$this->settings = $settings;
			$this->order = $order;
		}
	}
	
/* loadUsers()
		Loads users from 'xml/data.xml' into the global variable $users. $users
	is an array of 'User' objects, as defined above.
*/
function loadUsers() {
   // Parse XML file to load the global array
   $userXML = simplexml_load_file(realpath(__DIR__.DIRECTORY_SEPARATOR."../xml/data.xml"));
   // The global array to hold the info
   global $users;
   
   foreach ($userXML->user as $user){	
		$cardId = trim($user['cardId']);
		$fname = trim($user->fname);
		$lname = trim($user->lname);
		$budget['money'] = trim($user->budget->money);
		$budget['calories'] = trim($user->budget->calories);
		$settings['vegan'] = trim($user->settings->vegan);
		$settings['glutenfree'] = trim($user->settings->glutenfree);
		$settings['building'] = trim($user->settings->building);
		$settings['room'] = trim($user->settings->room);
		
		if (isset($user->history->order)){
			$order = Array();
			foreach ($user->history->order as $item){
				$day = trim($item->day);
				$month = trim($item->month);
				$year = trim($item->year);
				$money = trim($item->money);
				$calories = trim($item->calories);
				$venue = trim($item->venue);
				
				$obj = new Order($day,$month,$year,$money,$calories,$venue);

				$key = trim($item['id']);
				$order[$key] = $obj;
			}
		}
		else
			$order = '';

		$users[(string) $cardId] = new User($fname,$lname,$budget,$settings,$order);
	}
	
		
	}

function saveUsers() {
		// The global array to hold the info
		global $users;
   
		//create the xml document
		$xmlDoc = new DOMDocument();
		
		//create the root element
		$root = $xmlDoc->appendChild(
				  $xmlDoc->createElement("users"));
			   
		//make the output pretty
		$xmlDoc->formatOutput = true;

		foreach ($users as $id=>$userXML) {
			$usertag = $root->appendChild(
				$xmlDoc->createElement("user"));

			$usertag->appendChild(
				$xmlDoc->createAttribute("cardId"))->appendChild(
					$xmlDoc->createTextNode($id));

			$usertag->appendChild(
				$xmlDoc->createElement("fname",$userXML->fname));

			$usertag->appendChild(
				$xmlDoc->createElement("lname",$userXML->lname));

			$budgettag = $usertag->appendChild(
				$xmlDoc->createElement("budget"));

			$budgettag->appendChild(
				$xmlDoc->createElement("money",$userXML->budget['money']));

			$budgettag->appendChild(
				$xmlDoc->createElement("calories",$userXML->budget['calories']));

			$settingstag = $usertag->appendChild(
				$xmlDoc->createElement("settings"));

			$settingstag->appendChild(
				$xmlDoc->createElement("vegan",$userXML->settings['vegan']));

			$settingstag->appendChild(
				$xmlDoc->createElement("glutenfree",$userXML->settings['glutenfree']));

			$settingstag->appendChild(
				$xmlDoc->createElement("building",$userXML->settings['building']));

			$settingstag->appendChild(
				$xmlDoc->createElement("room",$userXML->settings['room']));


			$historytag = $usertag->appendChild(
				$xmlDoc->createElement("history"));

			if (empty($userXML->order)) continue;
			
			foreach ($userXML->order as $key => $item) {
				$ordertag = $historytag->appendChild(
					$xmlDoc->createElement("order"));
				
				$ordertag->appendChild(
					$xmlDoc->createAttribute("id"))->appendChild(
						$xmlDoc->createTextNode($key));

				$ordertag->appendChild(
					$xmlDoc->createElement("day",$item->day));

				$ordertag->appendChild(
					$xmlDoc->createElement("month",$item->month));

				$ordertag->appendChild(
					$xmlDoc->createElement("year",$item->year));

				$ordertag->appendChild(
					$xmlDoc->createElement("money",$item->money));

				$ordertag->appendChild(
					$xmlDoc->createElement("calories",$item->calories));

				$ordertag->appendChild(
					$xmlDoc->createElement("venue",$item->venue));
				}
		}

		$xmlDoc->save('xml/data.xml');
	}
function moneybudget($month = 0 , $year = 0) {
	// Return money spent on given month / year. Defaults to current time

	if (!$month) $month = date("n");
	if (!$year) $year = date("Y");
	
	global $currentUser;
	$money = 0.00;

	// Before anything, verify that there is a history. If not, return 0.
	if (!isset($currentUser->order) || $currentUser->order == null)
		return 0;

	foreach ($currentUser->order as $item) {
		if ($item->year == $year && $item->month == $month)
			$money += $item->money;
		}

	return $money;
	}

function caloriesbudget($day = 0,$month = 0 , $year = 0) {
	// Return calories spent on given day / month / year. Defaults to current time

	if (!$day) $day = date("d");
	if (!$month) $month = date("n");
	if (!$year) $year = date("Y");
	
	global $currentUser;
	$calories = 0;

	// Before anything, verify that there is a history. If not, return 0.
	if (!isset($currentUser->order) || $currentUser->order == null)
		return 0;

	foreach ($currentUser->order as $item) {
		if ($item->year == $year && $item->month == $month && $item->day == $day)
			$calories += $item->calories;
		}

	return $calories;
	}

function monthlytracking($month = 0 , $year = 0) {
	// Output purchases on given month. Defaults to current time

	if (!$month) $month = date("n");
	if (!$year) $year = date("Y");
	
	global $currentUser;

	// Before anything, verify that there is a history. If not, return.
	if (!isset($currentUser->order) || $currentUser->order == null)
		return;
		
	foreach ($currentUser->order as $item) {
		if ($item->year == $year && $item->month == $month)
			echo "<tr>
					<td>$item->month-$item->day-$item->year</td>
					<td>$item->venue</td>
					<td>$item->money</td>
				</tr>";
		}

	}

function caloriestracking($month = 0 , $year = 0) {
	// Output purchases on given month. Defaults to current time

	if (!$month) $month = date("n");
	if (!$year) $year = date("Y");
	
	global $currentUser;

	// Before anything, verify that there is a history. If not, return.
	if (!isset($currentUser->order) || $currentUser->order == null)
		return;
	
	foreach ($currentUser->order as $item) {
		if ($item->year == $year && $item->month == $month)
			echo "<tr>
					<td>$item->month-$item->day-$item->year</td>
					<td>$item->venue</td>
					<td>$item->calories</td>
				</tr>";
		}

	}
?>
