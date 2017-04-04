import React from 'react';

import {Panel} from 'react-bootstrap';

export default class Mission extends React.Component {

  describeYield(key, value) {
    let description;
    if (key === 'cash') {
      if (value > 1000) {
        description = ' generates ' + (value / 1000) + ' billion USD;';
      } else if (value > 0) {
        description = ' generates ' + value + ' million USD;';
      } else if (value < -1000) {
        description = ' costs ' + (-value / 1000) + ' billion USD;';
      } else if (value < 0) {
        description = ' costs ' + (-value) + ' million USD;';
      }
    } else if (key === 'population') {
      description = ' adds ' + value + ' persons to the colony population;';
    }

    return description;
  }

  describeYields(yields, y) {
    for (let z in y) {
      if (y[z]) {
        yields.push(
          <span>{ this.describeYield(z, y[z]) }</span>
        );
      }
    }
  }

  render() {
    let header = 'Launch "' + this.props.mission + '" in year ' + Math.floor(this.props.launch);
    if (this.props.cycle) {
      header = header + ' (repeats every ' + this.props.cycle + ' years)';
    }

    let transformations = [];
    if (this.props.transformations) {
      this.props.transformations.forEach(function(transformation) {
        transformations.push(
          <div>{ transformation }</div>
        );
      });
    }

    let yields = [];
    if (this.props.system && this.props.yield) {
      yields.push(
        <span>{ this.props.system }</span>
      );

      for (let y in this.props.yield) {
        if (this.props.yield[y]) {
          this.describeYields(yields, this.props.yield[y]);
        }
      }
    }

    return (
      <Panel header={ header }>
        { yields }
        { transformations }
      </Panel>
    );
  }
}
