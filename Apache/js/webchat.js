var socket = io.connect(serverLocation);

socket.on('setServerLogin', function (data) {	
	$('#serverLogin').val(data.login);
	
	var login= $('#nickname').val();
	var message = "New connetion";
	
	socket.emit('newConnection', {
		chat: [login, message]
	});	
});
	
socket.on('playerChat', function (data) {
	
	var message = StyleParser.toHTML("$ff0[" + data.chat[0] + "$ff0] " + data.chat[1]);
	if (data.chat[0] == $('#serverLogin').val()) {
		message = StyleParser.toHTML("$ff0" + data.chat[1]);
	}
	$('#chat').append('<div class="chatline">' + message + "</div>\n");
	var element = document.getElementById("chat");
	element.scrollTop = element.scrollHeight;	
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
	
	$('#showNick').html(StyleParser.toHTML($('#nickname').val()));
	//$('#nickname').val(QueryString.nick);
	
	socket.emit('getServerLogin', {
		data: ""
	});				
	
	$('#message').keydown(function(myEvent) {
		if ( myEvent.which == 13 ) {
			var login= $('#nickname').val();
			var message = $('#message').val();	
			socket.emit('chatSend', {
				chat: [login, message]
			});				
			$('#message').val("");
		}
   
	});

});
