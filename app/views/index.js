const greetingView = require('./components/greetingView');

const init = function() {
  document.getElementById('content').innerHTML = greetingView.render();
};

document.addEventListener('DOMContentLoaded', init);
