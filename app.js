var $Board = (function() {
  var DEFAULT_DOM_ELEMS = {
    $p1Name: document.querySelector('[data-player1-name]'),
    $p2Name: document.querySelector('[data-player2-name]'),
    $p1Score: document.querySelector('[data-player1-score]'),
    $p2Score: document.querySelector('[data-player2-score]'),
    $gameScore: document.querySelector('[data-parsed-score]'),
    $p1AddScore: document.querySelector('[data-player1-add-score]'),
    $p2AddScore: document.querySelector('[data-player2-add-score]'),
    $resetScore: document.querySelector('[data-score-reset]'),
    resetScore: function() { document.location.reload(); }
  };

  var _game, _domElems;

  var _render = function() {
    _domElems.$p1Name.textContent = _game.getPlayer1().getName();
    _domElems.$p1Score.textContent = _game.getPlayer1().getScore();
    _domElems.$p2Name.textContent = _game.getPlayer2().getName();
    _domElems.$p2Score.textContent = _game.getPlayer2().getScore();
    _domElems.$gameScore.textContent = _game.getScore();
  };

  var _p1Scored = function() {
    _game.getPlayer1().scored();
    _render();
  };

  var _p2Scored = function() {
    _game.getPlayer2().scored();
    _render();
  };

  var _bindActions = function() {
    _domElems.$p1AddScore.addEventListener('click', _p1Scored);
    _domElems.$p2AddScore.addEventListener('click', _p2Scored);
    _domElems.$resetScore.addEventListener('click', _domElems.resetScore);
  };

  var publicApi = {
    render: function(game, domElems) {
      _game = game;
      _domElems = domElems || DEFAULT_DOM_ELEMS;

      _bindActions();
      _render();
    }
  };

  return Object.freeze(publicApi);
})();

var Player = (function() {
  var publicApi = {
    init: function(name) {
      var _name = name;
      var _score = 0;

      this.getName = function() {
        return _name;
      };

      this.getScore = function() {
        return _score;
      };

      this.scored = function() { _score++; };

      return this;
    }
  };

  return Object.freeze(publicApi);
})();

var Game = (function() {
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

  return Object.freeze(publicApi);
})();

document.addEventListener('DOMContentLoaded', function() {
  var game = Object.create(Game).init('Serena', 'Kerber');
  Object.create($Board).render(game);
});
