import React from 'react';

import * as app from './app.js';

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
    let cards = [];

    if (this.props.data) {
      let data = this.props.data;
      let find = this.find.bind(this);

      data.forEach(function(card) {
        card.page = data;
        cards.push(
          React.createElement(find(card.type), card)
        );
      });
    }

    return (
      <div>
        { cards }
      </div>
    );
  }
}
