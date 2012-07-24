<?php

if (!isset($_POST['nickName'])) {
die("Error, nickname is not set!");
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<script> var serverLocation = "http://<?php echo $_SERVER['SERVER_ADDR'].":8080"; ?>"</script>
		<script src="http://<?php echo $_SERVER['SERVER_ADDR'].":8080"; ?>/socket.io/socket.io.js"></script>				
		
		<link rel="stylesheet" href="style.css">
	</head>
	<body> 
		<div id="chat"></div>		
		<div id="input">
			<span id="showNick"></span><input id="message" type="text" />
			<input id="nickname" type="hidden" value="<?php echo $_POST['nickName']; ?>"/><input id="serverLogin" type="hidden" />
		</div>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.js"></script>	
		<script src="js/webchat.js"></script>	
	</body>
</html>