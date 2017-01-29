const Player = Object.freeze({
  init(name) {
    const _name = name;
    let _score = 0;

    this.getName = () => _name;
    this.getScore = () => _score;
    this.scored = () => { _score++; };

    return this;
  }
});

export default Player;
