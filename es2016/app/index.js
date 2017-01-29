import Game from './model/game';
import Board from './view/board';

document.addEventListener('DOMContentLoaded', () => {
  const page = {
    $p1Name: document.querySelector('[data-player1-name]'),
    $p2Name: document.querySelector('[data-player2-name]'),
    $p1Score: document.querySelector('[data-player1-score]'),
    $p2Score: document.querySelector('[data-player2-score]'),
    $gameScore: document.querySelector('[data-parsed-score]'),
    $p1AddScore: document.querySelector('[data-player1-add-score]'),
    $p2AddScore: document.querySelector('[data-player2-add-score]')
  };

  const game = Object.create(Game).init('Serena', 'Maria Ester');
  Object.create(Board).init(game, page);
});

