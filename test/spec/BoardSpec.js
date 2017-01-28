var spyDom = {
  $p1Name: { textContent: '' },
  $p2Name: { textContent: '' },
  $p1Score: { textContent: '' },
  $p2Score: { textContent: '' },
  $gameScore: { textContent: '' },
  $p1AddScore: { addEventListener: function(eventName, fn) { fn(); } },
  $p2AddScore: { addEventListener: function(eventName, fn) { fn(); } },
  $resetScore: { addEventListener: function(eventName, fn) { fn(); } },
  resetScore: function() {}
};

describe('Tennis Score Board', function() {
  it('should render players names', function() {
    // Given
    var name1 = 'player1';
    var name2 = 'player2';
    var game = Object.create(Game).init(name1, name2);
    // When
    Object.create($Board).render(game, spyDom);
    // Then
    expect(spyDom.$p1Name.textContent).toBe(name1);
    expect(spyDom.$p2Name.textContent).toBe(name2);
  });
});
