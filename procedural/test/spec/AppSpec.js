describe('Tennis Score', function() {
  var SCORES = {
    // Lower Scores
    'Player 1 ahead with 1-0': { p1: 1, p2: 0, expected: 'Fifteen-Love' },
    'Player 1 ahead with 2-1': { p1: 2, p2: 1, expected: 'Thirty-Fifteen' },
    'Player 1 ahead with 3-2': { p1: 3, p2: 2, expected: 'Forty-Thirty' },

    'Player 2 ahead with 0-1': { p1: 0, p2: 1, expected: 'Love-Fifteen' },
    'Player 2 ahead with 1-2': { p1: 1, p2: 2, expected: 'Fifteen-Thirty' },
    'Player 2 ahead with 2-3': { p1: 2, p2: 3, expected: 'Thirty-Forty' },

    // Advantage
    'Advantage Player 1 with 4-3': { p1: 4, p2: 3, expected: 'Advantage Player 1' },
    'Advantage Player 1 with 5-4': { p1: 5, p2: 4, expected: 'Advantage Player 1' },
    'Advantage Player 1 with 6-5': { p1: 6, p2: 5, expected: 'Advantage Player 1' },
    'Advantage Player 1 with 7-6': { p1: 7, p2: 6, expected: 'Advantage Player 1' },
    'Advantage Player 1 with 8-7': { p1: 8, p2: 7, expected: 'Advantage Player 1' },
    'Advantage Player 1 with 9-8': { p1: 9, p2: 8, expected: 'Advantage Player 1' },

    'Advantage Player 2 with 3-4': { p1: 3, p2: 4, expected: 'Advantage Player 2' },
    'Advantage Player 2 with 4-5': { p1: 4, p2: 5, expected: 'Advantage Player 2' },
    'Advantage Player 2 with 5-6': { p1: 5, p2: 6, expected: 'Advantage Player 2' },
    'Advantage Player 2 with 6-7': { p1: 6, p2: 7, expected: 'Advantage Player 2' },
    'Advantage Player 2 with 7-8': { p1: 7, p2: 8, expected: 'Advantage Player 2' },
    'Advantage Player 2 with 8-9': { p1: 8, p2: 9, expected: 'Advantage Player 2' },

    // Winner
    'Player 1 wins with 4-0': { p1: 4, p2: 0, expected: 'Win for Player 1' },
    'Player 1 wins with 4-1': { p1: 4, p2: 1, expected: 'Win for Player 1' },
    'Player 1 wins with 4-2': { p1: 4, p2: 2, expected: 'Win for Player 1' },
    'Player 1 wins with 5-3': { p1: 5, p2: 3, expected: 'Win for Player 1' },
    'Player 1 wins with 6-4': { p1: 6, p2: 4, expected: 'Win for Player 1' },
    'Player 1 wins with 7-5': { p1: 7, p2: 5, expected: 'Win for Player 1' },

    'Player 2 wins with 0-4': { p1: 0, p2: 4, expected: 'Win for Player 2' },
    'Player 2 wins with 1-4': { p1: 1, p2: 4, expected: 'Win for Player 2' },
    'Player 2 wins with 2-4': { p1: 2, p2: 4, expected: 'Win for Player 2' },
    'Player 2 wins with 3-5': { p1: 3, p2: 5, expected: 'Win for Player 2' },
    'Player 2 wins with 4-6': { p1: 4, p2: 6, expected: 'Win for Player 2' },
    'Player 2 wins with 5-7': { p1: 5, p2: 7, expected: 'Win for Player 2' },

    // Draw
    'Draw with 0-0': { p1: 0, p2: 0, expected: 'Love-All' },
    'Draw with 1-1': { p1: 1, p2: 1, expected: 'Fifteen-All' },
    'Draw with 2-2': { p1: 2, p2: 2, expected: 'Thirty-All' },
    'Draw with 3-3': { p1: 3, p2: 3, expected: 'Deuce' },
    'Draw with 4-4': { p1: 4, p2: 4, expected: 'Deuce' },
    'Draw with 5-5': { p1: 5, p2: 5, expected: 'Deuce' },
    'Draw with 6-6': { p1: 6, p2: 6, expected: 'Deuce' },
    'Draw with 7-7': { p1: 7, p2: 7, expected: 'Deuce' },
    'Draw with 8-8': { p1: 8, p2: 8, expected: 'Deuce' },
    'Draw with 9-9': { p1: 9, p2: 9, expected: 'Deuce' }
  };

  using(SCORES, function(score, description) {
    it(description, function() {
      player1Score = score.p1;
      player2Score = score.p2;

      expect(getScore()).toBe(score.expected);
    });
  });
});
