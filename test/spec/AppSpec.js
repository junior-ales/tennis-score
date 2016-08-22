describe('Tennis Score', function() {
  describe('Lower Scores', function() {
    describe('Player 1 ahead', function() {
      it('should be fifteen-love when 1-0', function() {
        player1Score = 1;
        player2Score = 0;

        expect(getScore()).toBe('Fifteen-Love');
      });

      it('should be thirty-fifteen when 2-1', function() {
        player1Score = 2;
        player2Score = 1;

        expect(getScore()).toBe('Thirty-Fifteen');
      });

      it('should be forty-thirty when 3-2', function() {
        player1Score = 3;
        player2Score = 2;

        expect(getScore()).toBe('Forty-Thirty');
      });
    });

    describe('Player 2 ahead', function() {
      it('should be love-fifteen when 0-1', function() {
        player1Score = 0;
        player2Score = 1;

        expect(getScore()).toBe('Love-Fifteen');
      });

      it('should be fifteen-thirty when 1-2', function() {
        player1Score = 1;
        player2Score = 2;

        expect(getScore()).toBe('Fifteen-Thirty');
      });

      it('should be thirty-forty when 2-3', function() {
        player1Score = 2;
        player2Score = 3;

        expect(getScore()).toBe('Thirty-Forty');
      });
    });
  });

  describe('Advantage', function() {
    var advantageScores = {
      'Player 1 ahead with 4-3': { p1: 4, p2: 3, expected: 'Advantage Player 1' },
      'Player 1 ahead with 5-4': { p1: 5, p2: 4, expected: 'Advantage Player 1' },
      'Player 1 ahead with 6-5': { p1: 6, p2: 5, expected: 'Advantage Player 1' },
      'Player 1 ahead with 7-6': { p1: 7, p2: 6, expected: 'Advantage Player 1' },
      'Player 1 ahead with 8-7': { p1: 8, p2: 7, expected: 'Advantage Player 1' },
      'Player 1 ahead with 9-8': { p1: 9, p2: 8, expected: 'Advantage Player 1' },

      'Player 2 ahead with 3-4': { p1: 3, p2: 4, expected: 'Advantage Player 2' },
      'Player 2 ahead with 4-5': { p1: 4, p2: 5, expected: 'Advantage Player 2' },
      'Player 2 ahead with 5-6': { p1: 5, p2: 6, expected: 'Advantage Player 2' },
      'Player 2 ahead with 6-7': { p1: 6, p2: 7, expected: 'Advantage Player 2' },
      'Player 2 ahead with 7-8': { p1: 7, p2: 8, expected: 'Advantage Player 2' },
      'Player 2 ahead with 8-9': { p1: 8, p2: 9, expected: 'Advantage Player 2' }
    };

    using(advantageScores, function(score, description) {
      it(description, function() {
        player1Score = score.p1;
        player2Score = score.p2;

        expect(getScore()).toBe(score.expected);
      });
    });
  });

  describe('Win', function() {
    describe('Player 1', function() {
      for (var i = 4; i < 10; i++) {
        it('when ' + i + '-' + (i-2), function() {
          player1Score = i;
          player2Score = i-2;

          expect(getScore()).toBe('Win for Player 1');
        });
      }
    });

    describe('Player 2', function() {
      for (var i = 4; i < 10; i++) {
        it('when ' + (i-2) + '-' + i, function() {
          player1Score = i-2;
          player2Score = i;

          expect(getScore()).toBe('Win for Player 2');
        });
      }
    });
  });

  describe('Draw', function() {
    var DRAW_SCORES = ['Love-All', 'Fifteen-All', 'Thirty-All'];
    var expectedScore;

    for(var i = 0; i < 10; i++) {
      expectedScore = DRAW_SCORES[i] || 'Deuce';

      it('should be ' + expectedScore + ' when ' + i + '-' + i, function() {
        player1Score = i;
        player2Score = i;

        expect(getScore()).toBe(expectedScore);
      });
    }
  });
});
