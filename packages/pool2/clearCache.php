<?php

// Clear Groups - clears all groups catched in the xml file.

include "inc/header.php";

if (isset($_POST['keycode'])){
	if(trim($_POST['keycode']) == 'jedimaster'){
		foreach($games as $index=>$game)
			unset ($games[$index]);
		saveGames();
	}
}
	
?>
<title>Clear Groups</title>
</head>
<body>
<form action='' method="post">
	Hi there.
	<input type="password" name="keycode" />
	<input type="submit" />
</form>
</body>
</html>
