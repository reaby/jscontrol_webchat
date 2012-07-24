var _players = new Array();

exports.addPlayer = function(_login, _playerObj) {
	var player = {};
	player.login = _login;	
	player.playerObj = _playerObj;	
	_players.push(player);
}

exports.parsePlayerList = function(core, data) {
	for (key in data[0]) 	
		exports.addPlayer(data[0][key].Login, data[0][key]);
}


exports.removePlayer = function(_login) {
var newPlayers = [];

	for (key in _players)
		if (_players[key].login != _login)
			newPlayers.push(_players[key]);
			
	_players = newPlayers;
}

exports.getPlayerObj = function(_login) {
var newPlayers = [];

	for (key in _players)
		if (_players[key].login == _login)
			return _players[key].playerObj;
	
	var dummyObj = {
	Login: _login,
	NickName: _login
	}
	
	return dummyObj;
}
