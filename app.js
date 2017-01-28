document.addEventListener('DOMContentLoaded', function() {
  var game = Object.create(Game).init('Serena', 'Kerber');
  Object.create($Board).render(game);
});

