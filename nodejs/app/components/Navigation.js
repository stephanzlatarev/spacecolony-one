import React from 'react';

import MainPage from './MainPage.js';
import ExperiencePage from './ExperiencePage.js';
import ProjectsPage from './ProjectsPage.js';
import SciencePage from './SciencePage.js';
import TopicPage from './TopicPage.js';

export default class Navigation extends React.Component {

  render() {
    let page;

    if (this.props.page === 'experience') {
      page = (<ExperiencePage />);
    } else if (this.props.page === 'projects') {
      page = (<ProjectsPage />);
    } else if (this.props.page === 'science') {
      page = (<SciencePage />);
    } else if (this.props.page === 'topic') {
      page = (<TopicPage />);
    } else {
      page = (<MainPage />);
    }

    return page;
  }

}
