(function() {
  var $Board = (function() {
    var DEFAULT_DOM_ELEMS = {
      $p1Name: document.querySelector('[data-player1-name]'),
      $p2Name: document.querySelector('[data-player2-name]'),
      $p1Score: document.querySelector('[data-player1-score]'),
      $p2Score: document.querySelector('[data-player2-score]'),
      $p1AddScore: document.querySelector('[data-player1-add-score]'),
      $p2AddScore: document.querySelector('[data-player2-add-score]'),
      $gameScore: document.querySelector('[data-parsed-score]'),
      $resetScore: document.querySelector('[data-score-reset]')
    };

    return {
      init: function(game, domElems) {
        this.game = game;
        this.domElems = domElems || DEFAULT_DOM_ELEMS;

        this.bindActions();
        this.render();
      },

      p1Scored: function() {
        this.game.player1.scored();
        this.render();
      },

      p2Scored: function() {
        this.game.player2.scored();
        this.render();
      },

      resetScore: function() {
        this.game.player1.score = 0;
        this.game.player2.score = 0;
        this.render();
      },

      bindActions: function() {
        this.domElems.$p1AddScore.addEventListener('click', this.p1Scored.bind(this));
        this.domElems.$p2AddScore.addEventListener('click', this.p2Scored.bind(this));
        this.domElems.$resetScore.addEventListener('click', this.resetScore.bind(this));
      },

      render: function() {
        this.domElems.$p1Name.textContent = this.game.player1.name;
        this.domElems.$p1Score.textContent = this.game.player1.score;
        this.domElems.$p2Name.textContent = this.game.player2.name;
        this.domElems.$p2Score.textContent = this.game.player2.score;
        this.domElems.$gameScore.textContent = this.game.getScore();
      }
    };
  })();

  var Player = {
    init: function(name) {
      this.name = name;
      this.score = 0;
      return this;
    },

    scored: function() {
      this.score++;
    }
  };

  var Game = {
    init: function(player1name, player2name) {
      this.player1 = Object.create(Player).init(player1name);
      this.player2 = Object.create(Player).init(player2name);
      return this;
    },

    wonPoint: function(playerName) {
      if (this.player1.name === playerName) this.player1.scored();
      if (this.player2.name === playerName) this.player2.scored();
    },

    getScore: function() {
      var SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
      var DRAW_SCORES = ['Love-All', 'Fifteen-All', 'Thirty-All'];
      var scoreDiff = this.player1.score - this.player2.score;

      var isDraw = scoreDiff === 0;
      if (isDraw) {
        return DRAW_SCORES[this.player1.score] || 'Deuce';
      }

      var isHighScore = this.player1.score > 3 || this.player2.score > 3;
      if (isHighScore) {
        if (scoreDiff ===  1) return 'Advantage ' + this.player1.name;
        if (scoreDiff === -1) return 'Advantage ' + this.player2.name;

        return 'Win for ' + (scoreDiff > 1 ? this.player1.name : this.player2.name);
      }

      return SCORES[this.player1.score] + '-' + SCORES[this.player2.score];
    }
  };

  var init = function() {
    var game = Object.create(Game).init('Serena', 'Kerber');
    Object.create($Board).init(game);
  };

  document.addEventListener('DOMContentLoaded', init);
})();
