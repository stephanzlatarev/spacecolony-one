import React from 'react';

import {Panel} from 'react-bootstrap';

import BlueprintChart from './BlueprintChart.js';
import BlueprintSimulationSelection from './BlueprintSimulationSelection.js';

export default class BlueprintSimulation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: 'population'
    };
  }

  onMetricSelect(metric) {
    this.state.selection = metric;
    this.setState(this.state);
  }

  simulate(metric) {
    let data = [];

    let plan = [
      {launch: 2029, hint: 'cargo', yield: {time: 2, cash: -6000}},
      {launch: 2032, hint: 'crew', yield: {time: 2, population: 4, cash: -4000}},
      {launch: 2032, hint: 'show', yield: {time: 1, cash: 6000}}
    ];

    let volume = 0;
    let year;
    let calculate = function(mission) {
      if ((year >= mission.launch) && mission.yield[metric]
        && ((year - mission.launch) % mission.yield.time === 0)) {
        volume = volume + mission.yield[metric];
      }
    };
    for (year = 2001; year <= 2100; year = year + 1) {
      plan.forEach(calculate);
      data.push({date: year, metric: volume});
    }

    return data;
  }

  render() {
    let data = this.simulate(this.state.selection);

    return (
      <Panel>
        <BlueprintSimulationSelection
          selection={ this.state.selection }
          onChange={ this.onMetricSelect.bind(this) }
        />
        <BlueprintChart data={ data } />
      </Panel>
    );
  }

}
