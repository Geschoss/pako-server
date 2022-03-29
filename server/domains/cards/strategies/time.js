'use strict';

const BaseStrategy = require('./base.js');
const array = require('../lib/array.js');

const PLAY_TIME_SEC = 30;

class TimeStrategy extends BaseStrategy {
  name = 'time';
  description = `training random cards wiht time limits (${PLAY_TIME_SEC} sec)`;
  index = -1;
  game = null;
  cards = [];
  gameover = false;

  hasNext() {
    return !this.gameover;
  }

  start(game) {
    this.game = game;
    this.cards = array.shuffle([
      ...this.game.getCards(),
    ]);
    this.timer = setTimeout(() => {
      this.gameover = true;
    }, PLAY_TIME_SEC * 1000);
  }

  next() {
    this.index = this.index + 1;
    this.game.card = this.cards[this.index];
  }

  end() {
    this.index = -1;
    clearTimeout(this.timer);
  }
}

module.exports = TimeStrategy;
