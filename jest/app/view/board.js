var _game, _domElems;

var _render = function() {
  _domElems.$p1Name.textContent = _game.getPlayer1().getName();
  _domElems.$p1Score.textContent = _game.getPlayer1().getScore();
  _domElems.$p2Name.textContent = _game.getPlayer2().getName();
  _domElems.$p2Score.textContent = _game.getPlayer2().getScore();
  _domElems.$gameScore.textContent = _game.getScore();
};

var _renderGameAfter = function(fn) {
  return function() {
    fn();
    _render();
  };
};

var _bindActions = function() {
  var _onP1Scored = _renderGameAfter(_game.getPlayer1().scored);
  var _onP2Scored = _renderGameAfter(_game.getPlayer2().scored);

  _domElems.$p1AddScore.addEventListener('click', _onP1Scored);
  _domElems.$p2AddScore.addEventListener('click', _onP2Scored);
};

var _init = function(game, domElems) {
  _game = game;
  _domElems = domElems;

  _bindActions();
  _render();
};

module.exports = Object.freeze({ init: _init });
