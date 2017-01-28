var publicApi = {
  init: function(name) {
    var _name = name;
    var _score = 0;

    this.getName = function() {
      return _name;
    };

    this.getScore = function() {
      return _score;
    };

    this.scored = function() { _score++; };

    return this;
  }
};

module.exports = Object.freeze(publicApi);
