const player1Name = 'Player 1';
const player2Name = 'Player 2';
let player1Score = 0;
let player2Score = 0;

const getScore = function() {
  let s;
  if ((player1Score < 4 && player2Score < 4) && (player1Score + player2Score < 6)) {
    var p = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    s = p[player1Score];
    return (player1Score === player2Score) ? s + '-All' : s + '-' + p[player2Score];
  } else {
    if (player1Score === player2Score)
      return 'Deuce';
    s = player1Score > player2Score ? player1Name : player2Name;
    return ((player1Score - player2Score) * (player1Score - player2Score) === 1) ? 'Advantage ' + s : 'Win for ' + s;
  }
};

document.querySelector('[data-player1-name]').textContent = player1Name;
document.querySelector('[data-player1-score]').textContent = player1Score;
document.querySelector('[data-player2-name]').textContent = player2Name;
document.querySelector('[data-player2-score]').textContent = player2Score;
document.querySelector('[data-parsed-score]').textContent = getScore();

document.querySelector('[data-player1-add-score]').addEventListener('click', () => {
  player1Score++;
  document.querySelector('[data-parsed-score]').textContent = getScore();
  document.querySelector('[data-player1-score]').textContent = player1Score;
});

document.querySelector('[data-player2-add-score]').addEventListener('click', () => {
  player2Score++;
  document.querySelector('[data-parsed-score]').textContent = getScore();
  document.querySelector('[data-player2-score]').textContent = player2Score;
});

document.querySelector('[data-score-reset]').addEventListener('click', () => {
  player1Score = 0;
  player2Score = 0;

  document.querySelector('[data-parsed-score]').textContent = getScore();
  document.querySelector('[data-player1-score]').textContent = player1Score;
  document.querySelector('[data-player2-score]').textContent = player2Score;
});
