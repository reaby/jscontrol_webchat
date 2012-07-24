
var io = require('socket.io').listen(8080);
var players = require('./webchat/players.js');

exports.Init = function(core) {
		// setup sockets
		core.onPlayerConnect(playerConnect);
		core.onPlayerChat(playerChat);
		core.onPlayerDisconnect(playerDisconnect);

		core.callMethod('GetPlayerList', [-1,0,0], players.parsePlayerList);
		
		io.set("origins = *");

	io.sockets.on('connection', function (socket) {
	
	core.callMethod('GetSystemInfo', [0], serverInfo);	
	socket.on('chatSend', function (data) {
	core.callMethod('ChatSendServerMessage', ['$z$0f0[$z'+data.chat[0]+"$z$0f0] $z"+ data.chat[1] ])
	});

	socket.on('disconnect', function (data) {
	console.log(data);
	core.callMethod('ChatSendServerMessage', ['$z$0f0[$z'+data.chat[0]+"$z$0f0] $z"+ data.chat[1] ])
	});

	socket.on('newConnection', function (data) {
	core.callMethod('ChatSendServerMessage', ['$z$0f0[$z'+data.chat[0]+"$z$0f0] $z"+ data.chat[1] ])
	});
		
});
	
	return true;	

}

function playerChat(core, params) {
	//console.log("["+params[1]+"] " + params[2]);
	// if (params[0] == 0 ) return;

	var login = params[1];
	var chat = params[2];	
	console.log(params);	
	io.sockets.emit('playerChat', { chat: [players.getPlayerObj(login).NickName, chat]});
}

function playerConnect(core, params) {
 	// param[0] = login
 	// param[1] = isSpectator

 	// Get detailed player info, contains player nickname. - Once received, the detailedInfoReceived function is fired.
 	 core.callMethod('GetDetailedPlayerInfo', [params[0]], function(core, params2){
		console.log(params2);
		players.addPlayer(params[0], params2[0]);
	 });	
}

function playerDisconnect(core, params) {
 	// param[0] = login
 	// param[1] = isSpectator

 	// Get detailed player info, contains player nickname. - Once received, the detailedInfoReceived function is fired.
 	console.log("["+params[0]+"] Disconnects!");
	players.removePlayer(params[0]);
}



function detailedInfoReceived(core, params) {
	// param[0] = struct with detailed player info	
	console.log("["+params[0]['login']+"] Connects!");
	core.callMethod('ChatSendServerMessage', ['$z$o$fff» $z'+params[0]['NickName']+"$z$i$s$08f$o connected/disconnected to the server."])
	
}

function serverInfo(core, params) {
	console.log(params);
	
	var login = params[0].ServerLogin; 	
	io.sockets.emit('setServerLogin', { login: login});
}