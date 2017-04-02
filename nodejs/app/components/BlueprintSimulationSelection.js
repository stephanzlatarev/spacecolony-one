import React from 'react';

import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';

export default class BlueprintSimulationSelection extends React.Component {

  render() {
    let metrics = {
      population: 'Population of colony',
      cash: 'Cash (million USD)'
    };
    let menu = [];
    for (let key in metrics) {
      if (metrics[key]) {
        menu.push(
          <MenuItem eventKey={ key }>{ metrics[key] }</MenuItem>
        );
      }
    }

    return (
      <ButtonGroup justified>
        <div />
        <DropdownButton
          bsStyle='link'
          title={ metrics[this.props.selection] }
          onSelect={ this.props.onChange }>
          { menu }
        </DropdownButton>
        <div />
      </ButtonGroup>
    );
  }

}
