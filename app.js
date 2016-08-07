(function() {
  var $Board = {
    player1: {
      name: document.querySelector('[data-player1-name]'),
      score: document.querySelector('[data-player1-score]')
    },

    player2: {
      name: document.querySelector('[data-player2-name]'),
      score: document.querySelector('[data-player2-score]')
    },

    gameScore: document.querySelector('[data-parsed-score]'),

    render: function(game) {
      this.player1.name.textContent = game.player1.name;
      this.player1.score.textContent = game.player1.score;
      this.player2.name.textContent = game.player2.name;
      this.player2.score.textContent = game.player2.score;
      this.gameScore.textContent = game.gameScore;
    }
  };

  var Player = {
    init: function(name) {
      this.name = name;
      this.score = 0;
      return this;
    },

    scored: function() { this.score++; }
  };

  var init = function() {
    var $board = Object.create($Board);

    var game = {
      player1: Object.create(Player).init('Federer'),
      player2: Object.create(Player).init('Wawrinka'),
      gameScore: 'Love-All'
    };

    $board.render(game);
  };

  document.addEventListener('DOMContentLoaded', init);
})();
