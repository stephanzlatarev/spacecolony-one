import React from 'react';

import {Col, Row, Panel} from 'react-bootstrap';

import MenuCard from './MenuCard.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      frontpage: [
        {
          type: 'text',
          text: 'Experience the life of a pioneer in a space co'
            + 'lony of the XXI century through a 3-day adventur'
            + 'e packed with high-tech space science, intense m'
            + 'issions and mind-expanding experiences.'
        },
        {
          icon: 'space-elevator.jpg',
          title: 'Attractions',
          text: 'Ride a space elevator, sleep in a colony base,'
            + ' eat space food, walk a crater in a space suit, '
            + 'talk to your family million miles away back home'
            + ' and do much more!'
        },
        {
          icon: 'farms.jpg',
          title: 'Science',
          text: 'Learn more about the science behind space expl'
            + 'oration and colonization. Track the progress of '
            + 'new technology enabling the human race to expand'
            + ' into the Solar system and the universe.'
        },
        {
          icon: 'teddies.jpg',
          title: 'Community',
          text: 'Join the generation that builds the first space colony!'
        }
      ]
    };
  }

  render() {
    let cards = [];

    this.state.frontpage.forEach(function(card) {
      if (card.type === 'text') {
        cards.push(
          <Panel>{ card.text }</Panel>
        );
      } else {
        cards.push(
          <MenuCard data={ card } />
        );
      }
    });

    let headlinestyle = {
      width: '100%',
      height: '135px',
      border: 'none',
      padding: '0px',
      background: 'url("/assets/pics/panorama.jpg")'
    };

    return (
      <div className="container">

        <Row>
          <Col xs={ 12 }>
            <div className="panel" style={ headlinestyle }></div>
          </Col>
        </Row>

        <Row>
          <Col xs={ 12 }>
            { cards }
          </Col>
        </Row>

        <Row>
          <Col xs={ 12 }>
            <p>
              All rights reserved, 2017. <a href="#">Contact us</a>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
