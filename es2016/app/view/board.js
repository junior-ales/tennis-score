let _game, _domElems;

const _render = () => {
  _domElems.$p1Name.textContent = _game.getPlayer1().getName();
  _domElems.$p1Score.textContent = _game.getPlayer1().getScore();
  _domElems.$p2Name.textContent = _game.getPlayer2().getName();
  _domElems.$p2Score.textContent = _game.getPlayer2().getScore();
  _domElems.$gameScore.textContent = _game.getScore();
};

const _renderGameAfter = fn => () => { fn(); _render(); };

const _bindActions = () => {
  const _onP1Scored = _renderGameAfter(_game.getPlayer1().scored);
  const _onP2Scored = _renderGameAfter(_game.getPlayer2().scored);

  _domElems.$p1AddScore.addEventListener('click', _onP1Scored);
  _domElems.$p2AddScore.addEventListener('click', _onP2Scored);
};

const Board = Object.freeze({
  init(game, domElems) {
    _game = game;
    _domElems = domElems;

    _bindActions();
    _render();
  }
});

export default Board;
