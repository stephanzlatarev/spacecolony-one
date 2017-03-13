import React from 'react';

import {Panel} from 'react-bootstrap';

export default class ScienceCard extends React.Component {

  onClick() {
    window.spacecolony.navigateTo('topic');
  }

  render() {
    return (
      <Panel className="navigable" onClick={ this.onClick.bind(this) }>
        <h2>{ this.props.science.title }</h2>
        <p>{ this.props.science.text }</p>
      </Panel>
    );
  }
}
