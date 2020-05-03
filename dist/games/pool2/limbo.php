<?php include 'inc/header.php';?>
<title>
POOLPICKERS
</title>

<?php
	foreach($_POST as $index=>$element)
		$_SESSION[$index] = $element;

	$gameID = $_SESSION['gameID'];
	
	if (isset($_POST['host'])){
		$_SESSION['playID'] = 'player1';
		$balls = Array();
		$balls['player1'] = '';
		
		$player = new Player('player1','');
		$players = Array();
		$players[] = $player;
		$games[$gameID] = new Game($gameID,0,$_SESSION['gametype'],$_SESSION['no_players'],1,$players);
	}
	else{
		$no_active = $games[$gameID]->no_active + 1;
		$games[$gameID]->no_active = $no_active;
		$_SESSION['playID'] = 'player'.($no_active);
		$player = new Player($_SESSION['playID'],'');
		$games[$gameID]->players[$no_active-1] = $player;
	}
	
	saveGames();
	loadGames();
	
	$currGame = $games[$gameID];
	
?>

<script type="text/javascript">
function checkStatus()
{
var xmlhttp;

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    if(xmlhttp.responseText != 'false'){
		cancelPlayer();
		window.location = "balls.php";
    }
  }
  
xmlhttp.open("GET","checkStatus.php?gid=<?= $gameID; ?>&pid=<?= $_SESSION['playID'];?>",true);
xmlhttp.send();
}

window.setInterval(function(){checkStatus();},2000);


function cancelPlayer()
{
var xmlhttp;

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
xmlhttp.open("GET","cancelPlayer.php?gid=<?= $gameID; ?>&pid=<?= $_SESSION['playID'];?>",false);
xmlhttp.send();

return "hi";
}

window.onbeforeunload = function(){cancelPlayer();};

</script>


</head>

<body>
<form action="balls.php" method="post">
<div class="foreground sub">


	<div id="textarea">
		<h1 id="groupName"><?=$gameID;?></h1><br /><h2 style="font-size:200%;">Waiting for Players...</h2><br />
		<img src="img/loading.gif" alt="Loading" />
	</div>
	
	<!-- HOME BUTTON -->
	<div class="bottom_left">
		<a href="index.php"><img src="img/HomeIcon.png" alt="HOME" /></a>
	</div>	
	
	
</div>
</form>
</body>
</html>

