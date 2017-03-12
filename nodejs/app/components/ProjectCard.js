import React from 'react';

import {Panel} from 'react-bootstrap';

export default class ProjectCard extends React.Component {

  render() {
    return (
      <Panel>
        <h2>{ this.props.project.title }</h2>
        <p>{ this.props.project.text }</p>
      </Panel>
    );
  }
}
