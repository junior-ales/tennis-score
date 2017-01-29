import Game from '../app/model/game';

describe('Tennis Game', () => {
  describe('not initialised', () => {
    it('should expose only init function', () => {
      const game = Object.create(Game);
      expect(game.init).toBeDefined();
      expect(game.getPlayer1).not.toBeDefined();
      expect(game.getPlayer2).not.toBeDefined();
      expect(game.getScore).not.toBeDefined();
    });

    it('should not allow override of initialisation function', () => {
      const game = Object.create(Game);
      expect(() => { game.init = 'a value'; }).toThrow();
    });
  });

  describe('Score', () => {
    let game, p1, p2;
    const p1Name = 'player 1';
    const p2Name = 'player 2';

    beforeEach(() => {
      game = Object.create(Game).init(p1Name, p2Name);
      p1 = game.getPlayer1();
      p2 = game.getPlayer2();
    });

    describe('Lower Scores', () => {
      it('should start as love-all (0-0)', () => {
        expect(game.getScore()).toBe('Love-All');
      });

      describe('Player1 ahead', () => {
        it('should be fifteen-love when 1-0', () => {
          p1.scored();

          expect(game.getScore()).toBe('Fifteen-Love');
        });

        it('should be thirty-fifteen when 2-1', () => {
          p1.scored(); p1.scored();
          p2.scored();

          expect(game.getScore()).toBe('Thirty-Fifteen');
        });

        it('should be forty-thirty when 3-2', () => {
          p1.scored(); p1.scored(); p1.scored();
          p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Forty-Thirty');
        });
      });

      describe('Player2 ahead', () => {
        it('should be love-fifteen when 0-1', () => {
          p2.scored();

          expect(game.getScore()).toBe('Love-Fifteen');
        });

        it('should be fifteen-thirty when 1-2', () => {
          p1.scored();
          p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Fifteen-Thirty');
        });

        it('should be thirty-forty when 2-3', () => {
          p1.scored(); p1.scored();
          p2.scored(); p2.scored(); p2.scored();

          expect(game.getScore()).toBe('Thirty-Forty');
        });
      });
    });

    describe('Advantage', () => {
      it('should be player 1 advantage when 4-3', () => {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Advantage ' + p1Name);
      });

      it('should be player 2 advantage when 3-4', () => {
        p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Advantage ' + p2Name);
      });
    });

    describe('Win', () => {
      it('should player 1 win when 4-0', () => {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();

        expect(game.getScore()).toBe('Win for ' + p1Name);
      });

      it('should player 2 win when 0-4', () => {
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Win for ' + p2Name);
      });
    });

    describe('Draw', () => {
      it('should be fifteen-all when 1-1', () => {
        p1.scored();
        p2.scored();

        expect(game.getScore()).toBe('Fifteen-All');
      });

      it('should be thirty-all when 2-2', () => {
        p1.scored(); p1.scored();
        p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Thirty-All');
      });

      it('should be deuce when 3-3', () => {
        p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Deuce');
      });

      it('should be deuce when 4-4', () => {
        p1.scored(); p1.scored(); p1.scored(); p1.scored();
        p2.scored(); p2.scored(); p2.scored(); p2.scored();

        expect(game.getScore()).toBe('Deuce');
      });
    });
  });
});
