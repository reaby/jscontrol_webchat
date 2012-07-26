if (window.io == undefined) {
	location.replace("offline.php");
}
else {
	var socket = io.connect(serverLocation);
}

socket.on('setServerLogin', function (data) {	
	$('#serverLogin').val(data.login);
	
	var login= $('#nickname').val();
	var message = "New connetion";
	
	socket.emit('newConnection', {
		chat: [login, message]
	});	
});
socket.on('disconnect', function () {
	location.replace("disconnect.php");
});

socket.on('playerChat', function (data) {	
	var message = MPStyle.Parser.toHTML("$s$ff0[" + data.chat[0] + "$ff0] " + data.chat[1]);
	if (data.chat[0] == $('#serverLogin').val()) {
		message = MPStyle.Parser.toHTML("$s$ff0" + data.chat[1]);
	}
	$('#chat').append('<div class="chatline">' + message + "</div>\n");
	var element = document.getElementById("chat");
	element.scrollTop = element.scrollHeight;	
});

socket.on('setPlayerList', function (data) { 
	updatePlayerList(data);
});

// jQuery startup
$(function() {
	try{
		// http://www.opera.com/support/kb/view/827/
		opera.setOverrideHistoryNavigationMode('compatible');
		history.navigationMode = 'compatible';
	}catch(e) {}
	
	// Bind Disconnect event to all browsers (mainly for ie) 
	$(window).bind('beforeunload', function() {
		socket.disconnect();
	});
	
	$('#showNick').html(MPStyle.Parser.toHTML($('#nickname').val()));
	//$('#nickname').val(QueryString.nick);
	
	socket.emit('getServerLogin', {
		data: ""
	});				
	
	$('#message').keydown(function(myEvent) {
		if ( myEvent.which == 13 ) {
			sendChatMessage();
		}
   
	});

});

jQuery(document).ready(function(){
	$( "#accordion" ).accordion({
			
		});
	$('.accordion .head').click(function() {
		$(this).next().toggle('slow');
		return false;
	}).next().hide();
});

function sendChatMessage() {
	var login= $('#nickname').val();
	var message = $('#message').val();	
	socket.emit('chatSend', {
		chat: [login, message]
	});				
	$('#message').val("");
}

function updatePlayerList(data) 
{
	var players = data.playerlist;
	var ingame = players[0];
	var webchat = players[1];
	
	$('#game').html('');
	var count = 0;
	for (var i in ingame) {
		var nick = ingame[i].playerObj.NickName;
		count++;
		$('#game').append('<div class="player disableSelect">'+MPStyle.Parser.toHTML(nick)+'</div>'+"\n");		
	}
	$('#gamecount').html("("+count+")");
		
	count = 0;
	$('#web').html('');
	for (var i in webchat) {		
		var nick = webchat[i].login;
		count++;
		$('#web').append('<div class="player disableSelect">'+MPStyle.Parser.toHTML(nick)+'</div>'+"\n");		
	}
	$('#webcount').html("("+count+")");
}