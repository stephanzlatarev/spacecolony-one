import React from 'react';

import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class BlueprintSimulationSelection extends React.Component {

  render() {
    let selection = {
      amount: 'amount',
      flow: 'flow'
    };
    let metric = {
      cash: 'cash',
      air: 'breathable air',
      Human: 'population'
    };
    let unit = {
      cash: 'USD millions',
      air: 'liters',
      Human: 'persons'
    };

    let menu = function(map) {
      let items = [];
      for (let key in map) {
        if (map[key]) {
          items.push(
            <MenuItem eventKey={ key }>{ map[key] }</MenuItem>
          );
        }
      }
      return items;
    };

    return (
      <div className='text-center'>
        Show
        <DropdownButton
          bsStyle='link'
          title={ selection[this.props.selection] }
          onSelect={ this.props.onChangeSelection }>
          { menu(selection) }
        </DropdownButton>
        of
        <DropdownButton
          bsStyle='link'
          title={ metric[this.props.metric] }
          onSelect={ this.props.onChangeMetric }>
          { menu(metric) }
        </DropdownButton>
        in { unit[this.props.metric] }
        { (this.props.selection === 'flow') ? ' per day' : null }
      </div>
    );
  }

}
