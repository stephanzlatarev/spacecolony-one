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
          <Area
            type='linear' isAnimationActive={ false }
            dataKey='positive' stroke='#3182bd' fill='#3182bd' 
          />
          <Area
            type='linear' isAnimationActive={ false }
            dataKey='negative' stroke='red' fill='red' 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

}
