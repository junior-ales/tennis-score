const init = function() {
  const $page = Object.freeze({
    player1: {
      name: document.querySelector('[data-player1-name]'),
      score: document.querySelector('[data-player1-score]')
    },
    player2: {
      name: document.querySelector('[data-player2-name]'),
      score: document.querySelector('[data-player2-score]')
    },
    gameScore: document.querySelector('[data-parsed-score]'),

    render(game) {
      this.player1.name.textContent = game.player1.name;
      this.player1.score.textContent = game.player1.score;
      this.player2.name.textContent = game.player2.name;
      this.player2.score.textContent = game.player2.score;
      this.gameScore.textContent = game.gameScore;
    }
  });

  const game = {
    player1: {
      name: 'Djokovic',
      score: 2
    },
    player2: {
      name: 'Nadal',
      score: 1
    },
    gameScore: 'Thirty-Fifteen'
  };

  $page.render(game);
};

document.addEventListener('DOMContentLoaded', init);
