var Player = require('./player');

var SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
var DRAW_SCORES = ['Love-All', 'Fifteen-All', 'Thirty-All'];

var _player1, _player2;

var _getScore = function() {
  var scoreDiff = _player1.getScore() - _player2.getScore();

  var isDraw = scoreDiff === 0;
  if (isDraw) {
    return DRAW_SCORES[_player1.getScore()] || 'Deuce';
  }

  var isHighScore = _player1.getScore() > 3 || _player2.getScore() > 3;
  if (isHighScore) {
    if (scoreDiff ===  1) return 'Advantage ' + _player1.getName();
    if (scoreDiff === -1) return 'Advantage ' + _player2.getName();

    return 'Win for ' + (scoreDiff > 1 ? _player1.getName() : _player2.getName());
  }

  return SCORES[_player1.getScore()] + '-' + SCORES[_player2.getScore()];
};

var _wonPoint = function(playerName) {
  if (_player1.getName() === playerName) _player1.scored();
  if (_player2.getName() === playerName) _player2.scored();
};

var publicApi = {
  init: function(player1name, player2name) {
    _player1 = Object.create(Player).init(player1name);
    _player2 = Object.create(Player).init(player2name);

    this.getPlayer1 = function() { return _player1; };
    this.getPlayer2 = function() { return _player2; };
    this.getScore = _getScore;
    this.wonPoint = _wonPoint;

    return this;
  }
};

module.exports = Object.freeze(publicApi);
