import Player from '../app/model/player';

describe('Tennis Player', () => {
  it('should expose only init function before initialisation', () => {
    const playerNotInit = Object.create(Player);

    expect(playerNotInit.init).toBeDefined();
    expect(playerNotInit.getName).not.toBeDefined();
    expect(playerNotInit.getScore).not.toBeDefined();
    expect(playerNotInit.scored).not.toBeDefined();
  });

  it('should not allow override of initialisation function', () => {
    const player = Object.create(Player);

    expect(() => { player.init = 'a value'; }).toThrow();
  });

  it('should have a name', () => {
    const playerName = 'A Player';
    const player = Object.create(Player).init(playerName);

    expect(player.getName()).toBe(playerName);
  });

  it('should have initial score', () => {
    const INITIAL_SCORE = 0;
    const player = Object.create(Player).init('any name');

    expect(player.getScore()).toBe(INITIAL_SCORE);
  });

  it('should score points', () => {
    const player = Object.create(Player).init('any name');

    player.scored();
    expect(player.getScore()).toBe(1);
    player.scored();
    expect(player.getScore()).toBe(2);
    player.scored();
    player.scored();
    expect(player.getScore()).toBe(4);
  });
});
