<?php
if (!isset($_POST['nickName'])) {
	die("Error, nickname is not set!");
}
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>ManiaPlanet webchat</title>
		<meta name="description" content="">
		<meta name="author" content="Reaby">

		<meta name="viewport" content="width=device-width">

		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/sitestyle.css">

		<script src="js/libs/modernizr-2.5.3.min.js"></script>
		<script> var serverLocation = "http://<?php echo $_SERVER['SERVER_ADDR'] . ":8080"; ?>"</script>
		<script src="http://<?php echo $_SERVER['SERVER_ADDR'] . ":8080"; ?>/socket.io/socket.io.js"></script>	
	</head>
	<body>
		<header></header>
		<div role="main">
			<div id="chat"></div>		
			<div id="input">
				<span id="showNick"></span><input id="message" type="text" />
				<input id="nickname" type="hidden" value="<?php echo $_POST['nickName']; ?>"/><input id="serverLogin" type="hidden" />
			</div>
		</div>
		<footer>
			All rights Reserved. ManiaPlanet, TrackMania logo, ShootMania, 
			QuestMania, Nadeo, the Nadeo logo, Ubisoft, Ubi.com and 
			the Ubisoft logo are trademarks of Ubisoft Entertainment 
			in the US and/or other countries.
		</footer>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>

		<script src="js/plugins.js"></script>
		<script src="js/script.js"></script>
		<script src="js/webchat.js"></script>	
	</body>
</html>