import React from 'react';

import Navigation from './Navigation.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'main'
    };

    window.spacecolony = {
      navigateTo: this.navigateTo.bind(this)
    };
  }

  navigateTo(page) {
    this.state.page = page;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="container">
        <Navigation page={ this.state.page }/>
      </div>
    );
  }
}
