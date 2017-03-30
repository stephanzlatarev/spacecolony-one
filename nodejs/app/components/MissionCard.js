import React from 'react';

import {Panel} from 'react-bootstrap';

export default class MissionCard extends React.Component {

  render() {
    let transformations = [];

    this.props.transformations.forEach(function(transformation) {
      transformations.push(
        <div>{ transformation }</div>
      );
    });

    return (
      <Panel header={ 'Year ' + Math.floor(this.props.time) + ': ' + this.props.mission }>
        { transformations }
      </Panel>
    );
  }
}
