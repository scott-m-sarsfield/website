<!DOCTYPE html>
<!--PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

	<!--EXTERNAL STYLE SHEET-->
	<link rel="stylesheet" href="css/lib/global.css" type="text/css" media="screen" />

	<!--META TAGS FOR WEBAPP-->
	<meta name="apple-mobile-web-app-capable" content="yes">

	<!--ICON FOR GENERAL WEB PAGE-->
	<link rel="icon" href="img/favicon.png" />

	<!--ICON FOR IPHONE BOOKMARKS-->
	<link rel="apple-touch-icon" href="img/favicon.png" />

	<!--GOOGLE FONTS-->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

	<script type="text/javascript" src="js/lib/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/lib/utils.js"></script>

	<script type="text/javascript">
	function fixBG(){
		var asp = $(document).width() / $(document).height();
		if(asp > 1.87) $("body").css("background-size","100% auto");
		else $("body").css("background-size","auto 100%");
	}

	$(document).ready(function(){
		//$(".content-area").animate({opacity:1},1200);

		$("a").click(function(){
			window.location = this.getAttribute("href");
			return false;
		});

		fixBG();
		$(window).resize(fixBG);
	});
	</script>

	<link rel="stylesheet" href="css/gs_styles.css">

	<link rel="icon" href="img/favicon.png">
	<link rel="apple-touch-icon" href="img/favicon.png">

	<title> Scott Mathias Sarsfield's Web Site </title>
</head>
<body>
	<div id="main_nav_bar">

		<div class="page-logo">
			<a href="http://scottmsarsfield.com">
				<img src="img/favicon.png" alt="Scott M Sarsfield's Website" />
				<span>Scott Mathias Sarsfield's Website</span>
			</a>
		</div>
	</div>

	<div style="overflow:auto;position:absolute;top:3em;bottom:0;left:0;right:0;">

<!--GAME SCRIPT-->
<!--
<script src="js/t_piece.js"></script>
<script src="js/t_variety.js"></script>
<script src="js/mobile.js"></script>
<script src="js/tetris.js"></script>
-->
<script src="js/app.js"></script>
<!--
<script src="js/gameplay.js"></script>
-->
<!--?php include 'lb.php';?>
< ?php addJava();? -->

<!--GAME LAYOUT-->
<div id="gamescreen">

	<!--TITLE PANEL-->
	<div id="gs_title">
		<h2 class="classy">Tetris</h2>
	</div>

	<!--LAUNCH PANEL-->
	<div id="gs_launch">
		<input id="restart" type="button" value="RESTART" />
	</div>

	<!--DISPLAY PANEL-->
	<div id="gs_display">
	</div>

	<!--CONTROL PANEL-->
	<div id="gs_control">
	</div>

	<!--HELP PANEL [DEVELOPING-->
	<div id="game_helper"></div>

	<div id="counter"></div>
</div>

<!--
<br /><p style="margin:auto;text-align:center;background:rgba(255,255,255,0.7);font-weight:bold;">**Please keep usernames appropriate**</p><br />
<div id="leaderboard">
	<h3 class="classy">Leaderboard</h3>
	<div id="rankings">
		< ?php printTable();? >
	</div>
</div>
-->
<!--END GAME-->
</div>
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-41039160-1', 'scu.edu');
	ga('send', 'pageview');

	</script>
</body>
</html>
