import React from 'react';

import {Panel} from 'react-bootstrap';
import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid} from 'recharts';

export default class BlueprintChart extends React.Component {

  render() {
    let data = [];
    for (let i = 32, m = 4; i <= 100; i = i + 2, m = m + 4) {
      data.push({date: 2000 + i, metric: m});
    }

    return (
      <Panel>
        <div className='text-center'>Population of Colony</div>

        <ResponsiveContainer height={ 150 }>
          <AreaChart data={ data } >
            <XAxis type='number' domain={ [2000, 2100] }
              tickCount={ 11 } dataKey='date'
            />
            <YAxis interval={ 0 } />
            <CartesianGrid strokeDasharray='1 1' />
            <Area type='linear' dataKey='metric' />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>
    );
  }

}
