<svg xmlns="http://www.w3.org/2000/svg" version="1.1">

<?php
	//Preliminary PHP
	$dailySpent =  Array(); // create the array...
	
	// for each order...
	foreach($currentUser->order as $purchase){
		// ...ascertain the day of the year (0 - 365) if relevant
		
		$purchaseTimeStamp = mktime(0,0,0,$purchase->month,$purchase->day,$purchase->year);
		
		$MonthDuration = 60*60*24*31;  // length of a month
		
		// If the purchase has been longer than a month ago, ignore it.
		if (time() - $purchaseTimeStamp > $MonthDuration)
			continue;
		
		// Else, continue and store the day of the year.
		$relDay = date("z",$purchaseTimeStamp);
		
		// ...add the purchase to an array (create it if it doesn't exist)
		//  --> indexed by the day.
		
		if (!isset($dailySpent[$relDay])) $dailySpent[$relDay] = 0;
		$dailySpent[$relDay] += $purchase->calories;
	}
	
	// upperBound is used in determining the # of measures along the y-axis.
	$upperBound = max(max($dailySpent),$currentUser->budget['calories']);
	
	$today = date("z");
	
	$one_day = 60*60*24; // length of a day

?>



<!--X-AXIS-->
	<line x1="65" y1="300" x2="540" y2="300" style="stroke:rgb(0,0,0);stroke-width:2" />

<!--X-AXIS LABEL-->

	<text x="465" y="340" fill="black" style="font-size:14pt;font-weight:bold;">DATE</text>

<!--X-AXIS MARKERS-->
<?php
	$hspace = 475 / 30; // horizontal space of each marker
	
	// For 30 markers...
	for($i = 1; $i <= 30; $i++){
		// ...draw the marker...
		echo ('
	<line x1="'.(65 + $i*$hspace).'" y1="295" x2="'.(65 + $i*$hspace).'" y2="305" style="stroke:rgb(0,0,0);stroke-width:1" />');
		// ...and for every fifth marker, write the date.
		if ($i % 5 == 0) {
			$theDateTS = time()-(30-$i)*$one_day;  //timestamp for the date.
			$month = date("m",$theDateTS);
			$day = date("d",$theDateTS);
			echo ('
	<text x="'.(50 + $i*$hspace).'" y="320" fill="black" style="font-size:10pt;">'.$month.'/'.$day.'</text>');		}
	}
?>

<!--Y-AXIS-->
	<line x1="65" y1="300" x2="65" y2="25" style="stroke:rgb(0,0,0);stroke-width:2" />
<!--Y-AXIS LABEL-->
	<text x="-40" y="210" fill="black" style="font-size:14pt;font-weight:bold;" transform="rotate(-90 20,210)">DAILY CALORIC INTAKE</text>
<!--Y-AXIS MARKERS-->

<?php
	$nSegments = (int)($upperBound / 300) + 1; //number of measures
	$vSegmentSize = 300;  // the size of the increment

	$vspace = 275 / $nSegments;  // the vertical space between each measure
	
	//for each measure, draw the line and mark the value.
	for($i = 1; $i <= $nSegments; $i++)
		echo ('
	<line x1="60" y1="'.(300 - $i*$vspace).'" x2="70" y2="'.(300 - $i*$vspace).'" style="stroke:rgb(0,0,0);stroke-width:1" />
	<text x="30" y="'.(305 - $i*$vspace).'" fill="black" style="font-size:8pt;">'.($i*$vSegmentSize).'</text>');
?>



<!--DATA POINTS-->
<?php
	// dataPoint - stores coordinates...
	class dataPoint {
			public $x,$y;
			public function __construct($x,$y) {
				$this->x = $x;
				$this->y = $y;
			}
		}

	$trackingPoints = Array(); // an array of points to plot.
	$pointID = 0; 			   // (initialization)

	// For thirty days (this one and the 29 before)...
	for($date = $today - 29, $i = 1; $date <= $today;$date++,$i++)
		// if there's an order, make a point.
		if (isset($dailySpent[$date])){
			$x = 50 + $i*$hspace;
			$y = 300 - ($dailySpent[$date] / $vSegmentSize)*$vspace;
			
			// save the point in the array...
			$trackingPoints[$pointID] = new dataPoint($x,$y);
			// increment for next iteration.
			$pointID++;
		}
	
	
	// Plot each point in the array.
	foreach($trackingPoints as $point){
		echo ('
		<circle cx="'.$point->x.'" cy="'.$point->y.'" r="3" fill="black" />');
	}
	
?>

<!--LINES-->
	<!--LIMIT LINE-->
	<?php $boundLineY = 300 - ($currentUser->budget['calories'] / $vSegmentSize)*$vspace;?>
	<line x1="65" y1="<?=$boundLineY;?>" x2="540" y2="<?=$boundLineY;?>" style="stroke:rgb(255,0,0);stroke-width:2" />
<?php
	// If there is more than 1 point, connect them with a line.
	foreach($trackingPoints as $index=>$point){
		if ($index > 0)
			echo ('
			<line x1="'.$prevPoint->x.'" y1="'.$prevPoint->y.'" x2="'.$point->x.'" y2="'.$point->y.'" style="stroke:rgb(0,0,255);stroke-width:2" />');
		// save the point for the next iteration.
		$prevPoint = $point;
	}
?>


</svg>
