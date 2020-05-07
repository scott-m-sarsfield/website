<?php
$venues = array();

class Venue {
		public $vname,$type,$location,$food,$reviews;

		public function __construct($vname,$type,$location,$food,$reviews) {
				$this->name = $vname;
				$this->type = $type;
				$this->location = $location;
				$this->food = $food;
				$this->reviews = $reviews;
			}
	}

class Review {
		public $subject,$rating,$body,$user,$time;

		public function __construct($number,$subject,$rating,$body,$user,$time) {
				$this->number = $number;
				$this->subject = $subject;
				$this->rating = $rating;
				$this->body = $body;
				$this->user = $user;
				$this->time = $time; // Derived from date("r")
			}
	}

class Food {
		public $iname,$thumbnail,$description,$calories,$price,$vegan,$glutenfree;

		public function __construct($iname,$thumbnail,$description,$calories,$price,$vegan = 0,$glutenfree = 0) {
				$this->name = $iname;
				$this->thumbnail = $thumbnail;
				$this->description = $description;
				$this->calories = $calories;
				$this->price = $price;
				$this->vegan = $vegan;
				$this->glutenfree = $glutenfree;
			}
	}
	
function loadVenues() {
   // Parse XML file to load the global array
   $venueXML = simplexml_load_file(__DIR__.DIRECTORY_SEPARATOR."../xml/venues.xml");
   // The global array to hold the info
   global $venues;
   foreach ($venueXML->venue as $venue){	
		$vname = trim($venue->name);
		$vcode = trim($venue['code']);
		$type = trim($venue->type);
		$location = trim($venue->location);
		$food = Array();
		foreach ($venue->food as $item){
			$thumbnail = trim($item->thumbnail);
			$description = trim($item->description);
			$calories = trim($item->calories);
			$price = trim($item->price);
			$vegan = trim($item->vegan);
			$glutenfree = trim($item->glutenfree);
			$iname = trim($item['name']);
			$icode = trim($item['code']);
			
			$obj = new Food($iname,$thumbnail,$description,$calories,$price,$vegan,$glutenfree);

			$key = trim($icode);
			$food[$key] = $obj;
		}
		$reviews = Array();
		foreach ($venue->review as $item){
			$subject = trim($item->subject);
			$rating = trim($item->rating);
			$body = trim($item->body);
			$user = trim($item->user);
			$time = trim($item->time);
			$number = trim($item['number']);
			
			$obj = new Review($number,$subject,$rating,$body,$user,$time);

			$key = trim($number);
			$reviews[$key] = $obj;
		}
		$venues[$vcode] = new Venue($vname,$type,$location,$food,$reviews);
	}
	
		
	}

function saveVenues() {
		// The global array to hold the info
		global $venues;
   
		//create the xml document
		$xmlDoc = new DOMDocument();
		
		//create the root element
		$root = $xmlDoc->appendChild(
				  $xmlDoc->createElement("venues"));
			   
		//make the output pretty
		$xmlDoc->formatOutput = true;

		foreach ($venues as $id=>$venueXML) {
			$venuetag = $root->appendChild(
				$xmlDoc->createElement("venue"));

			$venuetag->appendChild(
				$xmlDoc->createAttribute("code"))->appendChild(
					$xmlDoc->createTextNode($id));

			$venuetag->appendChild(
				$xmlDoc->createElement("name",$venueXML->name));

			$venuetag->appendChild(
				$xmlDoc->createElement("type",$venueXML->type));

			$venuetag->appendChild(
				$xmlDoc->createElement("type",$venueXML->location));


			if (empty($venueXML->food)) continue;
			
			foreach ($venueXML->food as $code => $item) {
				$foodtag = $venuetag->appendChild(
					$xmlDoc->createElement("food"));
				
				$foodtag->appendChild(
					$xmlDoc->createAttribute("name"))->appendChild(
						$xmlDoc->createTextNode($item->name));
						
				$foodtag->appendChild(
					$xmlDoc->createAttribute("code"))->appendChild(
						$xmlDoc->createTextNode($code));

				$foodtag->appendChild(
					$xmlDoc->createElement("description",$item->description));
					
				$foodtag->appendChild(
					$xmlDoc->createElement("thumbnail",$item->thumbnail));

				$foodtag->appendChild(
					$xmlDoc->createElement("calories",$item->calories));

				$foodtag->appendChild(
					$xmlDoc->createElement("price",$item->price));

				$foodtag->appendChild(
					$xmlDoc->createElement("vegan",$item->vegan));

				$foodtag->appendChild(
					$xmlDoc->createElement("glutenfree",$item->glutenfree));

				}

			foreach ($venueXML->reviews as $key => $item) {
				$reviewtag = $venuetag->appendChild(
					$xmlDoc->createElement("review"));
					
				$reviewtag->appendChild(
					$xmlDoc->createAttribute("number"))->appendChild(
						$xmlDoc->createTextNode($item->number));
				
				$reviewtag->appendChild(
					$xmlDoc->createElement("subject",$item->subject));

				$reviewtag->appendChild(
					$xmlDoc->createElement("rating",$item->rating));

				$reviewtag->appendChild(
					$xmlDoc->createElement("body",$item->body));

				$reviewtag->appendChild(
					$xmlDoc->createElement("user",$item->user));

				$reviewtag->appendChild(
					$xmlDoc->createElement("time",$item->time));

				}
		}

		$xmlDoc->save('xml/venues.xml');
	}

?>
