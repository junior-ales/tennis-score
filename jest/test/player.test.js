var Player = require('../app/model/player');

describe('Tennis Player', function() {
  it('should expose only init function before initialisation', function() {
    var playerNotInit = Object.create(Player);

    expect(playerNotInit.init).toBeDefined();
    expect(playerNotInit.getName).not.toBeDefined();
    expect(playerNotInit.getScore).not.toBeDefined();
    expect(playerNotInit.scored).not.toBeDefined();
  });

  it('should not allow override of initialisation function', function() {
    var player = Object.create(Player);

    player.init = 'a value';

    expect(player.init).not.toBe('a value');
  });

  it('should have a name', function() {
    var playerName = 'A Player';
    var player = Object.create(Player).init(playerName);

    expect(player.getName()).toBe(playerName);
  });

  it('should have initial score', function() {
    var INITIAL_SCORE = 0;
    var player = Object.create(Player).init('any name');

    expect(player.getScore()).toBe(INITIAL_SCORE);
  });

  it('should score points', function() {
    var player = Object.create(Player).init('any name');

    player.scored();
    expect(player.getScore()).toBe(1);
    player.scored();
    expect(player.getScore()).toBe(2);
    player.scored();
    player.scored();
    expect(player.getScore()).toBe(4);
  });
});
