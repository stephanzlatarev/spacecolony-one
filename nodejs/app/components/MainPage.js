import React from 'react';

import {Col, Row, Panel} from 'react-bootstrap';

import MenuCard from './MenuCard.js';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      frontpage: [
        {
          type: 'text',
          text: 'Space Colony One open sources the blueprints f'
            + 'or space colonization. Study, comment and create'
            + ' blueprints of colonies on the Moon, Mars and de'
            + 'ep space. Link to science research. Experience t'
            + 'he life of a space pioneer.'
        },
        {
          icon: 'space-elevator.jpg',
          title: 'Blueprints',
          navigation: 'projects',
          text: 'Join the generation that builds the first space colony!'
        },
        {
          icon: 'farms.jpg',
          title: 'Science',
          navigation: 'science',
          text: 'Learn more about the science behind space expl'
            + 'oration and colonization. Track the progress of '
            + 'new technology enabling the human race to expand'
            + ' into the Solar system and the universe.'
        },
        {
          icon: 'teddies.jpg',
          title: 'Experience',
          navigation: 'experience',
          text: 'Experience the life of a pioneer in a space co'
            + 'lony of the XXI century through a 3-day adventur'
            + 'e packed with high-tech space science, intense m'
            + 'issions and mind-expanding experiences. '
            + 'Ride a space elevator, sleep in a colony base,'
            + ' eat space food, walk a crater in a space suit, '
            + 'talk to your family million miles away back home'
            + ' and do much more!'
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
      </div>
    );
  }
}
