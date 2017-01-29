var Game = require('../app/model/game');

describe('Tennis Game', function() {
  describe('Score', function() {
    var game, p1, p2;
    var p1Name = 'player 1';
    var p2Name = 'player 2';

    beforeEach(function() {
      game = Object.create(Game).init(p1Name, p2Name);
      p1 = game.getPlayer1();
      p2 = game.getPlayer2();
    });

    it('should start as love-all (0-0)', function() {
      expect(game.getScore()).toBe('Love-All');
    });

    describe('Lower Scores', function() {
      describe('Player1 ahead', function() {
        it('should be fifteen-love when 1-0', function() {
          p1.scored();

          expect(game.getScore()).toBe('Fifteen-Love');
        });

        it('should be thirty-fifteen when 2-1', function() {
          p1.scored(); p1.scored();
          p2.scored();

          expect(game.getScore()).toBe('Thirty-Fifteen');
        });

        it('should be forty-thirty when 3-2', function() {
          p1.scored(); p1.scored(); p1.scored();
          p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Forty-Thirty');
        });
      });

      describe('Player2 ahead', function() {
        it('should be love-fifteen when 0-1', function() {
          p2.scored();

          expect(game.getScore()).toBe('Love-Fifteen');
        });

        it('should be fifteen-thirty when 1-2', function() {
          p1.scored();
          p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Fifteen-Thirty');
        });

        it('should be thirty-forty when 2-3', function() {
          p1.scored(); p1.scored();
          p2.scored(); p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Thirty-Forty');
        });
      });
    });

    describe('Advantage', function() {
      it('should be player 1 advantage when 4-3', function() {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Advantage ' + p1Name);
      });

      it('should be player 2 advantage when 3-4', function() {
        p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Advantage ' + p2Name);
      });
    });

    describe('Win', function() {
      it('should player 1 win when 4-0', function() {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();

        expect(game.getScore()).toBe('Win for ' + p1Name);
      });

      it('should player 2 win when 0-4', function() {
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Win for ' + p2Name);
      });
    });

    describe('Draw', function() {
      it('should be fifteen-all when 1-1', function() {
        p1.scored();
        p2.scored();

        expect(game.getScore()).toBe('Fifteen-All');
      });

      it('should be thirty-all when 2-2', function() {
        p1.scored(); p1.scored();
        p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Thirty-All');
      });

      it('should be deuce when 3-3', function() {
        p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Deuce');
      });

      it('should be deuce when 4-4', function() {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Deuce');
      });
    });
  });
});
