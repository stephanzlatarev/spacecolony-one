import React from 'react';

import {Panel} from 'react-bootstrap';

export default class Mission extends React.Component {

  render() {
    let transformations = [];

    this.props.transformations.forEach(function(transformation) {
      transformations.push(
        <div>{ transformation }</div>
      );
    });

    return (
      <Panel
        header={
          'Launch "' + this.props.mission + '"' + ' in year ' + Math.floor(this.props.launch)
        }>
        { transformations }
      </Panel>
    );
  }
}
