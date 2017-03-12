import React from 'react';

import MainPage from './MainPage.js';
import ExperiencePage from './ExperiencePage.js';
import ProjectsPage from './ProjectsPage.js';
import SciencePage from './SciencePage.js';

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
    let page;

    if (this.state.page === 'experience') {
      page = (<ExperiencePage />);
    } else if (this.state.page === 'projects') {
      page = (<ProjectsPage />);
    } else if (this.state.page === 'science') {
      page = (<SciencePage />);
    } else {
      page = (<MainPage />);
    }

    return page;
  }
}
