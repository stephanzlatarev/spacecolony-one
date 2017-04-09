import React from 'react';

import {Panel} from 'react-bootstrap';

import BlueprintChart from './BlueprintChart.js';
import BlueprintSimulationSelection from './BlueprintSimulationSelection.js';

export default class BlueprintSimulation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: 'amount',
      metric: 'Human'
    };
  }

  onSelect(selection) {
    this.state.selection = selection;
    this.setState(this.state);
  }

  onSelectMetric(metric) {
    this.state.metric = metric;
    this.setState(this.state);
  }

  simulate(selection, metric) {
    let plan = this.props.page;
    let data = [];
    let amount = {};
    let flowin = {};
    let flowout = {};

    let knowledgebase = {
      Human: {
        flows: {
          oxygen: -11000,
          'carbon dioxide': 1
        }
      }
    };

    let year;

    let plus = function(a, b, factor, positive) {
      if (!b) {
        return;
      }
      for (let m in b) {
        if (b[m] && positive && (b[m] > 0)) {
          if (a[m]) {
            a[m] = a[m] + b[m] * factor;
          } else {
            a[m] = b[m] * factor;
          }
        } else if (b[m] && !positive && (b[m] < 0)) {
          if (a[m]) {
            a[m] = a[m] - b[m] * factor;
          } else {
            a[m] = -b[m] * factor;
          }
        }
      }
    };
    let minus = function(a, b, factor, positive) {
      if (!b) {
        return;
      }
      for (let m in b) {
        if (b[m] && positive && (b[m] > 0)) {
          if (a[m]) {
            a[m] = a[m] - b[m] * factor;
          } else {
            a[m] = -b[m] * factor;
          }
        } else if (b[m] && !positive && (b[m] < 0)) {
          if (a[m]) {
            a[m] = a[m] + b[m] * factor;
          } else {
            a[m] = b[m] * factor;
          }
        }
      }
    };
    let calculateMissionImpact = function(mission) {
      if ((year >= mission.launch) && (mission.yield)) {
        let tick = year - mission.launch;
        if (mission.cycle) {
          tick = tick % mission.cycle;
        }

        plus(amount, mission.yield[tick], 1, true);
        minus(amount, mission.yield[tick], 1, false);
      }
    };

    let calculateFlowsImpact = function(flows, factor) {
      plus(flowin, flows, factor, true);
      plus(flowout, flows, factor, false);
    };
    let calculateResourcesImpact = function() {
      for (let r in amount) {
        if (amount[r]) {
          if (knowledgebase[r] && knowledgebase[r].flows) {
            calculateFlowsImpact(knowledgebase[r].flows, amount[r]);
          }
        }
      }
    };
    for (year = 2001; year <= 2100; year = year + 1) {
      plan.forEach(calculateMissionImpact);
      calculateResourcesImpact();

      let d = {
        date: year,
        positive: 0
      };
      if ((selection === 'amount') && amount[metric]) {
        d.positive = amount[metric];
      } else if ((selection === 'flow') && flowin[metric]) {
        d.positive = flowin[metric];
      } else if ((selection === 'flow') && flowout[metric]) {
        d.negative = flowout[metric];
      }
      data.push(d);

      // clear flows
      flowin = {};
      flowout = {};
    }

    return data;
  }

  render() {
    let data = this.simulate(this.state.selection, this.state.metric);

    return (
      <Panel>
        <BlueprintSimulationSelection
          selection={ this.state.selection } onChangeSelection={ this.onSelect.bind(this) }
          metric={ this.state.metric } onChangeMetric={ this.onSelectMetric.bind(this) }
        />
        <BlueprintChart
          metrics={ ['primary', 'secondary'] }
          data={ data }
        />
      </Panel>
    );
  }

}
