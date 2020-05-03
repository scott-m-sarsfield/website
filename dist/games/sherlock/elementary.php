<html>
	<head>
		<title>
			Sherlock Holmes and the Random Number
		</title>

		<style type="text/css">
			h1{margin:0;padding:0;font-family:'impact';font-size:75;}
			h2{margin:0;padding:0;font-family:'lucida handwriting';font-size:24;}
			h3{size:16;}
		</style>
	</head>

	<!-- PHP Code (Heavy Duty) -->

	<?php

		function arrayDisplay($leArray)
			{
			echo "leArray <br />";
			for ($i=0;$i<sizeof($leArray);$i++)
				{
				echo $leArray[$i]."<br />";
				}
			}

		function initialize()
			{
			for ($i=1;$i<=100;$i++)
				{
				$Possible[] = $i;
				}
			return $Possible;
			}

		$newgame = isset($_POST['newgame']) ? $_POST['newgame'] : 0;
		$response = isset($_POST['response']) ? $_POST['response'] : NULL;

		$p_size = isset($_POST['sizePossible']) ? $_POST['sizePossible'] : NULL;
		$a_size = isset($_POST['sizeArray']) ? $_POST['sizeArray'] : NULL;

		$Possible[0] = 'fill';
		$Array[0] = 'fill';


		for ($i=0;$i<$p_size;$i++)
			{
			$name = "p".$i;
			$Possible[] = $_POST[$name];
			}

		for ($i=0;$i<$a_size;$i++)
			{
			$name = "a".$i;
			$Array[] = $_POST[$name];
			}

		function searchParty($A,$B)
			{
			for ($i=0;$i<sizeof($A);$i++)
				{
				$location = array_search($A[$i],$B);
				if ($location != 0)
					{$Venn[] = $B[$location];}
				}
			return $Venn;
			}

		function childAbandonment($A,$B)
			{
			for ($i=0;$i<sizeof($A);$i++)
				{
				$location = array_search($A[$i],$B);
				if ($location == 0 && $A[$i] != 'fill')
					{$Loner[] = $A[$i];}
				}
			return $Loner;
			}

		function analysis($newgame,$response,$Possible,$Array)
			{
			if ($newgame == 1)
				{
				$Possible = initialize();
				$newgame = 0;
				}
			else
				{
				if ($response == "Yes")
					{$Possible = searchParty($Possible,$Array);}
				else
					{$Possible = childAbandonment($Possible,$Array);}
				}
			return $Possible;
			}

		function create_array($Possible)
			{
			$Array[0] = 'fill';
			$slot = 0;
			while (sizeof($Array) < 25)
				{
				if (sizeof($Array)<sizeof($Possible)/2)
					{
					$r_select = rand(0,sizeof($Possible)-1);
					$r_value = $Possible[$r_select];
					$duplicate = array_search($r_value,$Array);
					if ($duplicate == 0 && $r_value != $Array[0])
						{
						$Array[$slot] = $r_value;
						$slot++;
						}
					}
				else
					{
					$r_value = rand(1,100);
					$duplicate = array_search($r_value,$Array);
					if ($duplicate == 0 && $r_value != $Array[0])
						{
						$Array[$slot] = $r_value;
						$slot++;
						}
					}
				$excuse = 0;
				}
			$ordered = 0;
			sort($Array);
			return $Array;
			}

		function end_game($Possible)
			{
			if (sizeof($Possible)==1)
				{
				$answer = $Possible[0];
				$location = "watson.php";
				}
			else
				{
				$answer = 0;
				$location = "elementary.php";
				}
			return array($answer,$location);
			}
		// What get's executed

		$Possible = analysis($newgame,$response,$Possible,$Array);

		$Array = create_array($Possible);

		$temp = end_game($Possible);
		$answer = $temp[0];
		$location = $temp[1];

		$newgame=0;
	?>


	<!-- Displaying Stuff (So Much Easier) -->

	<body style="background-color:#7a0000">

		<!--?php
			arrayDisplay($Possible);
			arrayDisplay($Array);
		?-->

		<table align="center" style="background-color:black" cellpadding="50">
			<tr height="500">
				<td align="center" width="800" style="background-color:white"
				<h1>Sherlock Holmes</h1>
				<h2> And the Random Number</h2>
				<br />
				<table style="background-color:black">
					<?php
						for ($i=0;$i<5;$i++)
							{
							echo "<tr height=\"30\">";
							for ($j=0;$j<5;$j++)
								{
								$slot = $i*5 + $j;
								echo "<td align=\"center\" width=\"50\" style=\"background-color:white\">".$Array[$slot]."</td>";
								}
							}
					?>
				</table>
				<h3>
					Is your number present in the array above?
				</h3>
				<?php
				$newGame=1;
				?>
			<form action=<?php echo $location;?> method="post">
					<input type="hidden" name="newGame" value=<?php echo $newGame; ?> />
			<?php
				for ($i=0;$i<sizeof($Possible);$i++)
					{
					$name = "p".$i;
					echo "<input type=\"hidden\" name=".$name." value=".$Possible[$i]." />";
					}

				for ($i=0;$i<sizeof($Array);$i++)
					{
					$name = "a".$i;
					echo "<input type=\"hidden\" name=".$name." value=".$Array[$i]." />";
					}
			?>
					<input type="hidden" name='sizePossible' value=<?php echo sizeof($Possible);?>>
					<input type="hidden" name='sizeArray' value=<?php echo sizeof($Array);?>>

					<input type="submit" name="response" value="Yes" />
					<input type="submit" name="response" value="No" />
				</form>
				</td>
			</tr>

			<tr>
				<td style="height:15px;padding:0px;background-color:white;text-align:center;">
					||
					<a href="http://www.scottmsarsfield.com/">Return to Home</a>
					||
				</td>
			</tr>
		</table>
	</body>
</html>
