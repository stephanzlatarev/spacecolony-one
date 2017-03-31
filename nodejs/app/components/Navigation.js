import React from 'react';

import NavigationPage from './NavigationPage.js';
import NavigationPath from './NavigationPath.js';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      path: []
    };

    window.spacecolony = {
      navigateTo: this.navigateTo.bind(this)
    };

    this.navigateTo({
      label: 'Home',
      navigation: 'Home'
    });
  }

  selection() {
    let path = this.state.path;
    return (path.length) ? path[path.length - 1] : '';
  }

  navigateTo(page) {
    if (page) {
      let path = this.state.path;

      this.state.path = [];

      for (let part in path) {
        if (path[part].navigation === page.navigation) {
          break;
        } else {
          this.state.path.push(path[part]);
        }
      }

      this.state.path.push(page);
      this.setState(this.state);

      this.downloadContent(page);
    }
  }

  downloadContent(page) {
    window.$.getJSON('/content/' + page.navigation, function(data) {
      // this if avoids jumping between pages when one download is slower than others
      if (this.selection().navigation === page.navigation) {
        this.state.data = data;
        this.setState(this.state);
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <NavigationPath path={ this.state.path } navigate={ this.navigateTo.bind(this) } />
        <NavigationPage data={ this.state.data } />
      </div>
    );
  }

}
