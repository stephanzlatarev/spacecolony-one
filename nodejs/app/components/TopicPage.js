import React from 'react';

import {Panel} from 'react-bootstrap';

export default class TopicPage extends React.Component {

  topic() {
    return {
      title: 'Life support',
      content: [
        'We cannot survive outside Earth without adequate protection and supplies.',
        'Extreme radiation will kill a human in minutes',
        'Lack of breathable air will kill a human in minutes',
        'Extreme temperature will kill a human in hours',
        'Lack of fresh water will kill a human in days',
        'Lack of food will kill a human in weeks',
        'Insufficient gravity will kill a human in years'
      ]
    };
  }

  render() {
    let topic = this.topic();

    let paragraphs = [];
    topic.content.forEach(function(paragraph) {
      paragraphs.push(
        <p>{ paragraph }</p>
      );
    });

    return (
      <Panel>
        <h2>{ topic.title }</h2>
        { paragraphs }
      </Panel>
    );
  }

}
