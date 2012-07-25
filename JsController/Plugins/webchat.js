
var io = require('socket.io').listen(8080);
var players = require('./webchat/players.js');
var webusers = require('./webchat/webusers.js');

exports.Init = function(core) {
	// setup plugin callbacks
	core.onPlayerConnect(playerConnect);
	core.onPlayerChat(playerChat);
	core.onPlayerDisconnect(playerDisconnect);
	
	// sync players
	core.callMethod('GetPlayerList', [-1,0,0], players.parsePlayerList);

	//	Recommended settings from Socket.IO homepage
	io.enable('browser client minification');  // send minified client
	io.enable('browser client etag');          // apply etag caching logic based on version number
	io.enable('browser client gzip');          // gzip the file
	io.set('log level', 1);                    // reduce logging
	io.set('transports', [                     // enable all transports (optional if you want flashsocket)
		'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
		]);
	
	// create socket
	io.sockets.on('connection', function (socket) {
	
		// when client connects, send server login to client
		core.callMethod('GetSystemInfo', [0], function (core, params) { 
			var login = params[0].ServerLogin; 	
			io.sockets.emit('setServerLogin', {
				login: login
			});
		});
		
		
		socket.on('newConnection', function (data) {
			// on newConnetion from client, set connection data: nickame
			var name = data.chat[0];
			socket.set('nickname', name, function () {  });
			if (webusers.playerExists(name)) return;
			webusers.addPlayer(name);
			// and send notification to server that a player is joined :)
			core.callMethod('ChatSendServerMessage', ['$z$i$s$08f New Webchat connection:$z$s$ff0 '+ name ])
		});
		socket.on('chatSend', function (data) {
			core.callMethod('ChatSendServerMessage', ['$z$s$0f0[$z$s$ff0'+data.chat[0]+"$z$s$0f0] $z$s$ff0"+ data.chat[1] ])
		});

		socket.on('disconnect', function () {

			socket.get('nickname', function (err, name) {
				webusers.removePlayer(name);
				core.callMethod('ChatSendServerMessage', ['$z$i$s$08f Webchat disconnection: $z$s$ff0' + name   ])
			});
		
		});

	});
	
	return true;	

}

function playerChat(core, params) {	
	var login = params[1];
	var chat = params[2];	
	
	if (chat.substr(0, 1) == "/") return;
	
	// get nickname from player object
	var nickname = players.getPlayerObj(login).NickName;
	
	// if chat comes anywhere else than server, add reset tag after nickname (so the client can parse the chatline correctly)
	if (params[0] != 0 ) 
		nickname = nickname + '$z';
	
	// sendchat
	io.sockets.emit('playerChat', {
		chat: [nickname, chat]
	});
	
}

function playerConnect(core, params) {
	// param[0] = login
	// param[1] = isSpectator

	// console.log(params2);
	core.callMethod('GetDetailedPlayerInfo', [params[0]], function(core, params2){
		players.addPlayer(params[0], params2[0]);		
	});
	
}

function playerDisconnect(core, params) {
	// param[0] = login
	// param[1] = isSpectator
	
	players.removePlayer(params[0]);
}

