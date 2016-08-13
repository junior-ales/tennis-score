describe('Tennis Score', function() {
  describe('Lower Scores', function() {
    describe('Player1 ahead', function() {
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

    describe('Player2 ahead', function() {
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
    describe('Player1', function() {
      for (var i = 4; i < 10; i++) {
        it('when ' + i + '-' + (i-1), function() {
          player1Score = i;
          player2Score = i-1;

          expect(getScore()).toBe('Advantage Player 1');
        });
      }
    });

    describe('Player2', function() {
      for (var i = 4; i < 10; i++) {
        it('when ' + (i-1) + '-' + i, function() {
          player1Score = i-1;
          player2Score = i;

          expect(getScore()).toBe('Advantage Player 2');
        });
      }
    });
  });

  describe('Win', function() {
    describe('Player1', function() {
      for (var i = 4; i < 10; i++) {
        it('when ' + i + '-' + (i-2), function() {
          player1Score = i;
          player2Score = i-2;

          expect(getScore()).toBe('Win for Player 1');
        });
      }
    });

    describe('Player2', function() {
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
