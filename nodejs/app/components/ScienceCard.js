import React from 'react';

import {Panel} from 'react-bootstrap';

export default class ScienceCard extends React.Component {

  render() {
    return (
      <Panel>
        <h2>{ this.props.science.title }</h2>
        <p>{ this.props.science.text }</p>
      </Panel>
    );
  }
}
