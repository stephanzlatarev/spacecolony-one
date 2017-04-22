import React from 'react';

import NavigationPage from './NavigationPage.js';
import NavigationPath from './NavigationPath.js';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };

    window.spacecolony.navigateHome = this.navigateHome.bind(this);
    window.spacecolony.navigateTo = this.navigateTo.bind(this);

    window.onpopstate = function(e) {
      if (e.state) {
        this.setState(e.state);
      }
    }.bind(this);
  }

  navigateHome() {
    this.navigateTo({
      label: 'Home',
      navigation: ''
    });
  }

  navigateTo(page) {
    if (page) {
      this.state.selection = page.navigation;

      window.$.getJSON('/content/' + page.navigation, function(data) {
        // this if avoids jumping between pages when one download is slower than others
        if (this.state.selection === page.navigation) {
          this.state.data = data;
          this.setState(this.state);

          window.history.pushState(this.state, null, '/' + page.navigation);
        }
      }.bind(this));

      if (window.ga) {
        window.ga('send', 'pageview', '/' + page.navigation);
      }
    }
  }

  path() {
    if (this.state.data && this.state.data[0] && this.state.data[0].type === 'Meta') {
      return this.state.data[0].path;
    }
  }

  render() {
    return (
      <div>
        <NavigationPath path={ this.path() } navigate={ this.navigateTo.bind(this) } />
        <NavigationPage data={ this.state.data } />
      </div>
    );
  }

}
