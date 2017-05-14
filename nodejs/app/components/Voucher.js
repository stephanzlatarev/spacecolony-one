import React from 'react';

import {Badge, Col, Image, Panel} from 'react-bootstrap';

export default class NavigationCard extends React.Component {

  render() {
    let choices = {
      crew: {
        solo: 'One person joining any crew',
        pair: 'Two partners joining any crew',
        team: 'A complete team of family, colleagues or friends'
      },
      duration: {
        halfday: 'half-day visit',
        overnight: '24-hours visit',
        days: '3+ days visit'
      },
      transport: {
        no: 'No space elevator or rocket ride',
        elevator: 'Space elevator ride',
        rocket: 'Rocket ride'
      },
      food: {
        earth: 'Food from Earth',
        '3dprinted': '3D printed food',
        garden: 'Food from the gardens of the colony'
      },
      missions: {
        easy: 'Easy difficulty space suit walk outside the habitat',
        normal: 'Normal difficulty exploration mission',
        hard: 'Adrenaline rescue mission'
      }
    };

    return (
      <Panel>
        <Col sm='4'>
          <h2>SPACE COLONY ONE</h2>
          <Image src={ '/assets/pics/voucher/' + this.props.code + '.png' } />
        </Col>
        <Col sm='8'>
          <h2>
            VOUCHER
            &nbsp;
            <Badge style={ {backgroundColor: '#337ab7'} } pullRight={ true }>
              20% DISCOUNT
            </Badge>
          </h2>
          <hr />
          <p>
            This voucher entitles <b><i>{ this.props.email }</i></b> to 20% off the regular price
            for a <b><i>{ choices.duration[this.props.duration] }</i></b> in a Space Colony Park
            with:
            <ul>
              <li>{ choices.crew[this.props.crew] }</li>
              <li>{ choices.transport[this.props.transport] }</li>
              <li>{ choices.missions[this.props.missions] }</li>
              <li>{ choices.food[this.props.food] }</li>
            </ul>
          </p>
        </Col>
      </Panel>
    );
  }
}
