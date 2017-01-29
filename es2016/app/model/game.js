import Player from './player';

const SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const DRAW_SCORES = ['Love-All', 'Fifteen-All', 'Thirty-All'];

let _player1, _player2;

const _getScore = () => {
  const scoreDiff = _player1.getScore() - _player2.getScore();

  const isDraw = scoreDiff === 0;
  if (isDraw) {
    return DRAW_SCORES[_player1.getScore()] || 'Deuce';
  }

  const isHighScore = _player1.getScore() > 3 || _player2.getScore() > 3;
  if (isHighScore) {
    if (scoreDiff ===  1) return `Advantage ${_player1.getName()}`;
    if (scoreDiff === -1) return `Advantage ${_player2.getName()}`;

    return `Win for ${scoreDiff > 1 ? _player1.getName() : _player2.getName()}`;
  }

  return `${SCORES[_player1.getScore()]}-${SCORES[_player2.getScore()]}`;
};

const Game = Object.freeze({
  init(player1name, player2name) {
    _player1 = Object.create(Player).init(player1name);
    _player2 = Object.create(Player).init(player2name);

    this.getPlayer1 = () => _player1;
    this.getPlayer2 = () => _player2;
    this.getScore = _getScore;

    return this;
  }
});

export default Game;
