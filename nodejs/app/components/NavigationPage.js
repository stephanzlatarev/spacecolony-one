import React from 'react';

import * as app from './app.js';

import Loading from './Loading.js';

export default class NavigationPage extends React.Component {

  constructor(props) {
    super(props);
    this.registry = {};
    for (let o in app) {
      if (app[o]) {
        this.registry[o] = app[o];
      }
    }
  }

  find(classs) {
    return (this.registry[classs]) ? this.registry[classs] : classs;
  }

  render() {
    let find = this.find.bind(this);
    let cards = [];

    if (this.props.data) {
      this.props.data.forEach(function(card) {
        cards.push(
          React.createElement(find(card.type), card)
        );
      });
    } else {
      cards.push(
        <Loading />
      );
    }

    return (
      <div>
        { cards }
      </div>
    );
  }
}
