const Player = Object.freeze({
  init(name) {
    let _score = 0;

    this.getName = () => name;
    this.getScore = () => _score;
    this.scored = () => { _score++; };

    return this;
  }
});

export default Player;
