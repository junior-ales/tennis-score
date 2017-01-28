var $Board = (function() {
  var DEFAULT_DOM_ELEMS = {
    $p1Name: document.querySelector('[data-player1-name]'),
    $p2Name: document.querySelector('[data-player2-name]'),
    $p1Score: document.querySelector('[data-player1-score]'),
    $p2Score: document.querySelector('[data-player2-score]'),
    $gameScore: document.querySelector('[data-parsed-score]'),
    $p1AddScore: document.querySelector('[data-player1-add-score]'),
    $p2AddScore: document.querySelector('[data-player2-add-score]')
  };

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

