(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("index.js", function(exports, require, module) {
'use strict';

var _game = require('./model/game');

var _game2 = _interopRequireDefault(_game);

var _board = require('./view/board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var page = {
    $p1Name: document.querySelector('[data-player1-name]'),
    $p2Name: document.querySelector('[data-player2-name]'),
    $p1Score: document.querySelector('[data-player1-score]'),
    $p2Score: document.querySelector('[data-player2-score]'),
    $gameScore: document.querySelector('[data-parsed-score]'),
    $p1AddScore: document.querySelector('[data-player1-add-score]'),
    $p2AddScore: document.querySelector('[data-player2-add-score]')
  };

  var game = Object.create(_game2.default).init('Serena', 'Maria Ester');
  Object.create(_board2.default).init(game, page);
});

});

require.register("model/game.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

var _player3 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
var DRAW_SCORES = ['Love-All', 'Fifteen-All', 'Thirty-All'];

var _player1 = void 0,
    _player2 = void 0;

var _getScore = function _getScore() {
  var scoreDiff = _player1.getScore() - _player2.getScore();

  var isDraw = scoreDiff === 0;
  if (isDraw) {
    return DRAW_SCORES[_player1.getScore()] || 'Deuce';
  }

  var isHighScore = _player1.getScore() > 3 || _player2.getScore() > 3;
  if (isHighScore) {
    if (scoreDiff === 1) return 'Advantage ' + _player1.getName();
    if (scoreDiff === -1) return 'Advantage ' + _player2.getName();

    return 'Win for ' + (scoreDiff > 1 ? _player1.getName() : _player2.getName());
  }

  return SCORES[_player1.getScore()] + '-' + SCORES[_player2.getScore()];
};

var Game = Object.freeze({
  init: function init(player1name, player2name) {
    _player1 = Object.create(_player3.default).init(player1name);
    _player2 = Object.create(_player3.default).init(player2name);

    this.getPlayer1 = function () {
      return _player1;
    };
    this.getPlayer2 = function () {
      return _player2;
    };
    this.getScore = _getScore;

    return this;
  }
});

exports.default = Game;

});

require.register("model/player.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Player = Object.freeze({
  init: function init(name) {
    var _name = name;
    var _score = 0;

    this.getName = function () {
      return _name;
    };
    this.getScore = function () {
      return _score;
    };
    this.scored = function () {
      _score++;
    };

    return this;
  }
});

exports.default = Player;

});

require.register("view/board.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _game = void 0,
    _domElems = void 0;

var _render = function _render() {
  _domElems.$p1Name.textContent = _game.getPlayer1().getName();
  _domElems.$p1Score.textContent = _game.getPlayer1().getScore();
  _domElems.$p2Name.textContent = _game.getPlayer2().getName();
  _domElems.$p2Score.textContent = _game.getPlayer2().getScore();
  _domElems.$gameScore.textContent = _game.getScore();
};

var _renderGameAfter = function _renderGameAfter(fn) {
  return function () {
    fn();_render();
  };
};

var _bindActions = function _bindActions() {
  var _onP1Scored = _renderGameAfter(_game.getPlayer1().scored);
  var _onP2Scored = _renderGameAfter(_game.getPlayer2().scored);

  _domElems.$p1AddScore.addEventListener('click', _onP1Scored);
  _domElems.$p2AddScore.addEventListener('click', _onP2Scored);
};

var Board = Object.freeze({
  init: function init(game, domElems) {
    _game = game;
    _domElems = domElems;

    _bindActions();
    _render();
  }
});

exports.default = Board;

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map