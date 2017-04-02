import React from 'react';

import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid} from 'recharts';

export default class BlueprintChart extends React.Component {

  render() {
    return (
      <ResponsiveContainer height={ 150 }>
        <AreaChart data={ this.props.data } >
          <XAxis type='number' domain={ [2000, 2100] }
            tickCount={ 11 } dataKey='date'
          />
          <YAxis interval={ 0 } />
          <CartesianGrid strokeDasharray='1 1' />
          <Area type='linear' dataKey='metric' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

}
