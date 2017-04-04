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
    let plan = this.props.page;

    let volume = 0;
    let year;
    let calculate = function(mission) {
      if ((year >= mission.launch) && (mission.yield)) {
        let tick = year - mission.launch;
        if (mission.cycle) {
          tick = tick % mission.cycle;
        }

        let y = mission.yield[tick];

        if (y && y[metric]) {
          volume = volume + y[metric];
        }
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
