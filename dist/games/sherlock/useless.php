<html>
	<head>
		<title>
			Elementary Deductive Reasoning
		</title>
	</head>

	<body style="background-color:#7a0000">
	<table align="center" style="background-color:black">
	<tr height="500"><td align="center" style="background-color:white" width="900">


























	<?php

		// Initializes Field of 100 Numbers
		function initialize()
			{
			for ($i=0;$i<100;$i++)
				{
				$poss_Num[] = $i+1;
				}
			return $poss_Num;
			}
		// End of function.
		


		// Eliminates Values ("No")
		function eliminate_n($Poss,$Array)
			{
			for ($i=0;$i<25;$i++)
				{
				$similar = array_intersect($Poss,$Array);
				}
			}
		// End of function.



		// Eliminates Values ("Yes")
		function eliminate_y($Poss,$Array)
			{
			//stuff
			}
		// End of function.



		// Fights Duplicates
		function removeDuplicates($x)
			{
			$size = sizeof($x);
			for ($i=0;$i<$size-1;$i++)
				{
				for ($j=$i+1;$j<$size;$j++)
					{
					$duplicate = 1;
					while ($duplicate == 1)
						{
						if ($x[$i] == $x[$j])
							{
							$duplicate = 1;
							$x[$j] = rand(1,20);
							}
						else
							{$duplicate = 0;}
						}
					}
				}
			}
		// End of function



		// Putting Them in Numerical Order
		function numOrder($x)
			{
			$size = sizeof($x);
			$ordered = 0;
			while ($ordered == 0)
				{
				$ordered = 1;
				for ($i=0;$i<$size-1;$i++)
					{
					$value1 = $x[$i];
					$value2 = $x[$i+1];
					if ($value1 > $value2)
						{
						$x[$i] = $value2;
						$x[$i+1] = $value1;
						$ordered = 0;
						}
					}
				}
			}
		// End of function

		// Reaction Function
		function reaction($Poss,$Array)
			{
			$response = $_POST("response");
			if ($response == "Yes")
				{
				$newPoss = eliminate_y($Poss,$Array);
				}
			else
				{
				$newPoss = eliminate_n($Poss,$Array);
				}
			return $newPoss;
			}
		// End of function
	
		// Creating the Display Array
		function create_array($Poss)
			{
			for ($i=0;$i<sizeof($Poss)&&$i<25;$i++)
				{
				$temp = rand(0,sizeof($Poss));
				$Array[] = $Poss[$temp];
				$Array = removeDuplicates($Array);	
				}
			for ($i=sizeof($Array);$i<25;$i++)
				{
				$Array[] = rand(0,100);
				}
			$Array = removeDuplicates($Array);
			$Array = numOrder($Array);
			return $Array;
			}


		// Piecing Things Together
		
		echo $test[0];
		$test2 = create_array($test);
		echo $test2;

			// Acquiring Variable from Previous Form	
			$guess = $_POST["guess"];
	
			// Evaluating the Guess
			for ($i=0;$i<$size;$i++)
				{
				if ($guess == $x[$i])
					{
						$result = '1';
						$slot = $i;
					}
				}

			// Displaying the Result
			if ($result == 1)
				{
				print "<h2>You guessed one of the numbers!</h2>";
				}
			else
				{
				print "<h2>Sorry, that is not one of the numbers.</h2>";
				}		
		
			print "The five numbers were: ";

			for ($i=0;$i<$size;$i++)
				{
				if ($result == 1 && $i == $slot)
					{print "<b><big>$x[$i]</big></b>";}
				else
					{print $x[$i];}

				if ($i != $size - 1)
					print ", ";
				
				else
					print ".";
				}
		?>
		
		<br /><br />
		<a href="guessAlt.html">Replay</a>

	</td></tr>

			<tr>
				<td style="height:15px;padding:0px;background-color:white;text-align:center;">
					||
					<a href="http://www.scottmsarsfield.com/">Return to Home</a>
					||
				</td>
			</tr>
</table>
	<body>

