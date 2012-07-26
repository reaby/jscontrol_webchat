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

		<title>Maniaplanet webchat</title>
		<meta name="description" content="">
		<meta name="author" content="Reaby">

		<meta name="viewport" content="width=device-width">

		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/sitestyle.css">
		<link rel="stylesheet" href="css/redmond/jquery-ui-1.8.22.custom.css">
		<script src="js/libs/modernizr-2.5.3.min.js"></script>
		<script> var serverLocation = "http://<?php echo $_SERVER['SERVER_ADDR'] . ":8081"; ?>"</script>
		<script src="http://<?php echo $_SERVER['SERVER_ADDR'] . ":8081"; ?>/socket.io/socket.io.js"></script>	
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"></script>
		<!-- https://raw.github.com/magnetik/maniaplanet-style-js-parser/master/bin/mp-style-parser.js -->
		<script src="js/libs/styleparser.js"></script>	
		<script src="js/webchat.js"></script>	
	</head>
	<body>
		<header>
			<h1>Maniaplanet Webchat</h1>
		</header>
		<div role="main" id="main">			
			<div id="chat">

			</div>
			<div id="players">

				<div id="accordion">
					<h3><a href="#">Ingame <span id="gamecount"></span></a></h3>
					<div id="game"></div>
					<h3><a href="#">Webchat <span id="webcount"></span></a></h3>
					<div id="web"></div>
				</div>


			</div>

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
	</body>
</html>