document.addEventListener('DOMContentLoaded', function() {
  var game = Object.create(Game).init('Serena', 'Maria Ester');
  Object.create($Board).render(game);
});

