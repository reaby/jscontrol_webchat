var socket = io.connect(serverLocation);
	
socket.on('setServerLogin', function (data) {	
	$('#serverLogin').val(data.login);
});
	
socket.on('playerChat', function (data) {
	var message = parseColors("$ff0[" + data.chat[0] + "$ff0] " + data.chat[1]);
	if (data.chat[0] == $('#serverLogin').val()) {
		message = parseColors("$ff0" + data.chat[1]);
	}
	$('#chat').append(message + "<br/>")
	console.log(data);
});
	
$(function() {

	$('#showNick').html(parseColors(QueryString.nick));
	//$('#nickname').val(QueryString.nick);
	
	socket.emit('getServerLogin', {
		data: ""
	});	
	
	var login= $('#nickname').val();
	var message = "New connetion";
	socket.emit('newConnection', {
		chat: [login, message]
		});	
	
	
	$('#message').keydown(function(myEvent) {
		if ( myEvent.which == 13 ) {
			var login= $('#nickname').val();
			var message = $('#message').val();	
			socket.emit('chatSend', {
				chat: [login, message]
				});	
			//var message = parseColors("[" + login + "] " + message);
			//$('#chat').append(message + "<br/>")
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
					if (endtag['w'] != 0) {
						output = output + '</span>'+str2[a].substr(1);
					}
					else 
					{
						output = output + '</span>'+str2[a].substr(1);
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

var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
		// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	} 
	return query_string;
} ();
