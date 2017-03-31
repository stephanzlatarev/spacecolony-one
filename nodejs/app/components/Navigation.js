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
    window.onpopstate = function(e) {
      if (e.state) {
        this.setState(e.state);
      }
    }.bind(this);

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
      let path = [];
      for (let part in this.state.path) {
        if (this.state.path[part].navigation === page.navigation) {
          break;
        } else {
          path.push(this.state.path[part]);
        }
      }
      path.push(page);

      window.$.getJSON('/content/' + page.navigation, function(data) {
        // this if avoids jumping between pages when one download is slower than others
        let selection = path[path.length - 1];
        if (selection.navigation === page.navigation) {
          this.state.path = path;
          this.state.data = data;
          this.setState(this.state);

          window.history.pushState(this.state, null, page.navigation);
        }
      }.bind(this));
    }
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
