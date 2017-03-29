import React from 'react';

import {Panel} from 'react-bootstrap';

import NavigationPage from './NavigationPage.js';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      path: []
    };

    window.spacecolony = {
      navigateTo: this.navigateTo.bind(this)
    };

    this.navigateTo('Home');
  }

  selection() {
    let path = this.state.path;
    return (path.length) ? path[path.length - 1] : '';
  }

  navigateTo(page) {
    if (page) {
      let path = this.state.path;

      this.state.path = [];
      this.state.data = null;

      for (let part in path) {
        if (path[part] === page) {
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
    window.$.getJSON('/content/' + page, function(data) {
      // this if avoids jumping between pages when one download is slower than others
      if (this.selection() === page) {
        this.state.data = data;
        this.setState(this.state);
      }
    }.bind(this));
  }

  render() {
    let path;
    if (this.state.path.length > 1) {
      let navigateTo = this.navigateTo.bind(this);

      let parts = [];
      this.state.path.forEach(function(part) {
        let click = function() {
          navigateTo(part);
        };
  
        parts.push(
          <span className="navpath" onClick={ click }>
            { part } :
          </span>
        );
      });

      path = (
        <Panel>
          { parts }
        </Panel>
      );
    }

    return (
      <div>
        { path }
        <NavigationPage data={ this.state.data } />
      </div>
    );
  }

}
