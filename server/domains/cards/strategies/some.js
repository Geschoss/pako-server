'use strict';

const BaseStrategy = require('./base.js');
const array = require('../lib/array.js');

class SomeStrategy extends BaseStrategy {
  name = 'some';
  description = 'training random 10 card';
  index = -1;
  game = null;
  cards = [];

  hasNext() {
    return this.index + 1 < this.cards.length;
  }

  start(game) {
    this.game = game;
    this.cards = array
      .shuffle([...this.game.getCards()])
      .slice(0, 10);
  }

  next() {
    this.index = this.index + 1;
    this.game.card = this.cards[this.index];
  }

  end() {
    this.index = -1;
  }
}

module.exports = SomeStrategy;
