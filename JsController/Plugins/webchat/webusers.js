var _webplayers = new Array();

exports.addPlayer = function(_login, _playerObj) {
	var player = {
		login: _login,
		playerObj: _playerObj
	};
	
	_webplayers.push(player);
}

exports.parsePlayerList = function(core, data) {
	for (key in data[0]) 	
		exports.addPlayer(data[0][key].Login, data[0][key]);
}


exports.removePlayer = function(_login) {
var newPlayers = [];

	for (key in _webplayers)
		if (_webplayers[key].login != _login)
			newPlayers.push(_webplayers[key]);
			
	_webplayers = newPlayers;
}

exports.playerExists = function(_login) {

	for (key in _webplayers)
		if (_webplayers[key].login == _login)
			return true;
			
	return false;
}


exports.getPlayerObj = function(_login) {
var newPlayers = [];

	for (key in _webplayers)
		if (_webplayers[key].login == _login)
			return _webplayers[key].playerObj;
	
	var dummyObj = {
	Login: _login,
	NickName: _login
	}
	
	return dummyObj;
}
