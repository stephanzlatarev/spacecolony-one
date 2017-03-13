import React from 'react';

import {Panel} from 'react-bootstrap';

import MainPage from './MainPage.js';
import ExperiencePage from './ExperiencePage.js';
import ProjectsPage from './ProjectsPage.js';
import SciencePage from './SciencePage.js';
import TopicPage from './TopicPage.js';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      path: [ 'Home' ]
    };

    window.spacecolony = {
      navigateTo: this.navigateTo.bind(this)
    };
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
        if (path[part] === page) {
          break;
        } else {
          this.state.path.push(path[part]);
        }
      }

      this.state.path.push(page);

      this.setState(this.state);
    }
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

    let page;
    let selection = this.selection();
    if (selection === 'Experience') {
      page = (<ExperiencePage />);
    } else if (selection === 'Blueprints') {
      page = (<ProjectsPage />);
    } else if (selection === 'Science') {
      page = (<SciencePage />);
    } else if (selection === 'Topic') {
      page = (<TopicPage />);
    } else {
      page = (<MainPage />);
    }

    return (
      <div>
        { path }
        { page }
      </div>
    );
  }

}
