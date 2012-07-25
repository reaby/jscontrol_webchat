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
	
	var message = parseColors("$ff0[" + data.chat[0] + "$ff0] " + data.chat[1]);
	if (data.chat[0] == $('#serverLogin').val()) {
		message = parseColors("$ff0" + data.chat[1]);
	}
	$('#chat').append('<div class="chatline">' + message + "</div>\n");
	var element = document.getElementById("chat");
	element.scrollTop = element.scrollHeight;	
	
	console.log(element.scrollHeight);
	
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
	
	$('#showNick').html(parseColors($('#nickname').val()));
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

function parseColors(string){
	if (string == undefined) return "";
	var str2 = string.split("$");
	var output = "";
	var endtag = Array();
	endtag['w'] = 0;
	endtag['o'] = 0;
	endtag['i'] = 0;

	if (str2.length == 1) return string;
	for (var a in str2) {
		var ctl = str2[a].substr(0,1)
		if ( ctl.search("/|i|o|w|s|t|w|n|m|g|z|o/") != -1) {
  	
			switch (ctl) {
				case "z":	
					for (var b in endtag) {
						if (endtag[b] != 0) {
							output = output + '</span>'+str2[a].substr(1);
							endtag[b] = 0;
						}
					}			
					break;
				case "w":
					if (endtag['w'] != 0) {
						endtag['w']--;
						output = output + '</span>'+str2[a].substr(1);
					} else {
						output = output + '<span style="font-weight: bold;">'+str2[a].substr(1);
						endtag['w']++;
					}
					break;
	
				case "o":
					if (endtag['o'] != 0) {
						endtag['o']--;
						output = output + '</span>'+str2[a].substr(1);
					} else {
						output = output + '<span style="font-weight: bold;">'+str2[a].substr(1);
						endtag['o']++;
					}
					break;
	
				case "i":
					if (endtag['i'] != 0) {
						endtag['i']--;
						output = output + '</span>'+str2[a].substr(1);
					} else {
						output = output + '<span style="font-style: italic;">'+str2[a].substr(1);
						endtag['i']++;
					}
					break;
	
			}
	
		} else {
			var ctl = str2[a].substr(0,3);
			var msg = str2[a].substr(3);
			output = output + '<span style="color: #'+ctl+';">'+msg+'</span>';
		}
	}  
	for (a in endtag) {
		if (endtag[a] > 0) {
			output = output + '</span>';
		}
	}
	return output;
}