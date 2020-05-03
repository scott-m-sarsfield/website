<html>
	<head>
		<title>
			Sherlock Holmes and the Mystery Card
		</title>

		<style type="text/css">
			h1{margin:0;padding:0;font-family:'impact';font-size:75;}
			h2{margin:0;padding:0;font-family:'lucida handwriting';font-size:24;}
			h3{size:16;margin:0;padding:0;}
		</style>
	</head>

	<?php
	$no = 0;
	$answer = $_POST["p".$no];
	?>

	<body style="background-color:#7a0000">
		<table align="center" style="background-color:black" cellpadding="50">
			<tr height="500">
				<td align="center" width="800" style="background-color:white">
				<h1>Sherlock Holmes</h1>
					<?php echo "<table align=\"left\" style=\"background-color:black\"><tr><td><img src=\"cards/$answer.png\" height=200 /></td></tr></table>"; ?>
					<?php echo "<table align=\"right\" style=\"background-color:black\"><tr><td><img src=\"cards/$answer.png\" height=200 /></td></tr></table>"; ?>
				<h2> And the Mystery Card</h2>
				<br />
				<h3>	I believe this is your card.		</h3>
				<br />
				<h3>	It's elementary, my dear Watson.	</h3>
				<br />
				<h3>	(Well, actually <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">divide &amp; conquer</a>...)	</h3>
				<br />
				<?php
				$newGame=1;
				?>
				<form action="index.php" method="post">
					<input type="submit" value="Play Again" />
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
