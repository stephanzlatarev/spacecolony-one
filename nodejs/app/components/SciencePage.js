import React from 'react';

import ScienceCard from './ScienceCard.js';

export default class SciencePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      science: [
        {
          title: 'Economics',
          text: 'Mining. Science.'
        },
        {
          title: 'Life support',
          text: 'Protection. Heat. Air. Water. Food supplies.'
        },
        {
          title: 'Social life',
          text: 'Mining. Science.'
        },
        {
          title: 'Transportation',
          text: 'Transport between planet surface and orbit. Tr'
            + 'ansport in deep space. Transport on planet surface.'
        }
      ]
    };
  }

  render() {
    let cards = [];

    this.state.science.forEach(function(data) {
      cards.push(
        <ScienceCard science={ data } />
      );
    });

    return (
      <div className="container">
        { cards }
      </div>
    );
  }
}
