import Board from '../app/view/board';
import Game from '../app/model/game';

let _p1Fn, _p2Fn;

const $spyDom = {
  $p1Name: { textContent: '' },
  $p2Name: { textContent: '' },
  $p1Score: { textContent: '' },
  $p2Score: { textContent: '' },
  $gameScore: { textContent: '' },
  $p1AddScore: { click() { _p1Fn(); }, addEventListener(_, fn) { _p1Fn = fn; } },
  $p2AddScore: { click() { _p2Fn(); }, addEventListener(_, fn) { _p2Fn = fn; } }
};

describe('Tennis Score Board', () => {
  describe('not initialised', () => {
    it('should expose init function', () => {
      const board = Object.create(Board);
      expect(board.init).toBeDefined();
    });

    it('should not allow override of initialisation function', () => {
      const board = Object.create(Board);
      expect(() => { board.init = 'a value'; }).toThrow();
    });
  });

  describe('initialised', () => {
    const INITIAL_SCORE = 0;
    const name1 = 'player1';
    const name2 = 'player2';
    let game;

    beforeEach(() => {
      game = Object.create(Game).init(name1, name2);
      Object.create(Board).init(game, $spyDom);
    });

    it('should render players names', () => {
      expect($spyDom.$p1Name.textContent).toBe(name1);
      expect($spyDom.$p2Name.textContent).toBe(name2);
    });

    it('should render players initial scores', () => {
      expect($spyDom.$p1Score.textContent).toBe(INITIAL_SCORE);
      expect($spyDom.$p2Score.textContent).toBe(INITIAL_SCORE);
    });

    it('should increments player\'s score when addScore fn is called', () => {
      $spyDom.$p1AddScore.click();
      $spyDom.$p2AddScore.click();

      expect($spyDom.$p1Score.textContent).toBe(INITIAL_SCORE + 1);
      expect($spyDom.$p2Score.textContent).toBe(INITIAL_SCORE + 1);
    });
  });
});
