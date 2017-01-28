var $Board = require('../../app/view/board');
var Game = require('../../app/model/game');

var _p1Fn, _p2Fn;

var spyDom = {
  $p1Name: { textContent: '' },
  $p2Name: { textContent: '' },
  $p1Score: { textContent: '' },
  $p2Score: { textContent: '' },
  $gameScore: { textContent: '' },
  $p1AddScore: { click: function() { _p1Fn(); }, addEventListener: function(_, fn) { _p1Fn = fn; } },
  $p2AddScore: { click: function() { _p2Fn(); }, addEventListener: function(_, fn) { _p2Fn = fn;  } }
};

describe('Tennis Score Board', function() {
  var INITIAL_SCORE = 0;
  var name1 = 'player1';
  var name2 = 'player2';
  var game;

  beforeEach(function() {
    game = Object.create(Game).init(name1, name2);
    Object.create($Board).render(game, spyDom);
  });

  it('should render players names', function() {
    expect(spyDom.$p1Name.textContent).toBe(name1);
    expect(spyDom.$p2Name.textContent).toBe(name2);
  });

  it('should render players initial scores', function() {
    expect(spyDom.$p1Score.textContent).toBe(INITIAL_SCORE);
    expect(spyDom.$p2Score.textContent).toBe(INITIAL_SCORE);
  });

  it('should increments player\'s score when addScore fn is called', function() {
    spyDom.$p1AddScore.click();
    spyDom.$p2AddScore.click();

    expect(spyDom.$p1Score.textContent).toBe(INITIAL_SCORE + 1);
    expect(spyDom.$p2Score.textContent).toBe(INITIAL_SCORE + 1);
  });
});
