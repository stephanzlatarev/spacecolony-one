import React from 'react';

import {Button, Col, Panel, Row} from 'react-bootstrap';

import TicketFormChoice from './TicketFormChoice';

export default class TicketBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      program: [
        {
          label: 'CREW',
          description: 'Choose your crew. The colony crew is between 6 and 12 members',
          choices: [
            {
              text: 'Just me',
              description: 'I will join any crew'
            },
            {
              text: 'Me and a partner',
              description: 'I will come with a partner and join any crew'
            },
            {
              text: 'My team',
              description: 'My crew is complete with my family or colleagues'
            }
          ]
        },
        {
          label: 'DURATION',
          description: 'Choose the duration of your mission',
          choices: [
            {
              text: 'Half day',
              description: 'I will stay for half a day'
            },
            {
              text: 'Day and night',
              description: 'I will come in the morning, sleep in the base'
                + ' and return the next afternoon'
            },
            {
              text: '3+ days',
              description: 'I will stay for at least three days'
            }
          ]
        },
        {
          label: 'TRANSPORT',
          description: 'Choose how you want to get to the base camp',
          choices: [
            {
              text: 'Start from base',
              description: 'I will start the trip from the base camp'
            },
            {
              text: 'By space elevator',
              description: 'I will get to the base camp in a space elevator'
            },
            {
              text: 'By rocket',
              description: 'I will get to the base camp in a rocket'
            }
          ]
        },
        {
          label: 'FOOD',
          description: 'Choose what you eat in the colony',
          choices: [
            {
              text: 'Earth imports',
              description: 'I will eat food imported from Earth'
            },
            {
              text: '3D printed',
              description: 'I will eat 3D-printed food'
            },
            {
              text: 'I will gather',
              description: 'I will eat the food my colony produces'
            }
          ]
        },
        {
          label: 'MISSIONS',
          description: 'Choose what missions you will engage in',
          choices: [
            {
              text: 'Leisure walk',
              description: 'I will be looking around inside the habitat'
                + ' and will go outside the habitat in a space suit'
            },
            {
              text: 'Routine',
              description: 'I will engage in a routine exploration or mining mission'
            },
            {
              text: 'Adrenaline rush',
              description: 'I will engage in a rescue mission'
            }
          ]
        },
        {
          label: 'SOUVENIRS',
          description: 'Choose what souvenirs you will take away',
          choices: [
            {
              text: 'Only memories',
              description: 'No souvenirs please'
            },
            {
              text: 'Surprise gift',
              description: 'I will expect to get photos and collected artifacts'
                + ' during my missions after my return to Earth'
            },
            {
              text: 'Souvenir shop',
              description: 'I will buy from the souvenir shop myself'
            }
          ]
        },
        {
          label: 'WHEN',
          description: 'Choose when you want to go to the mission',
          choices: [
            {
              text: 'The first one',
              description: 'I want to be the first one'
            },
            {
              text: 'In the first year',
              description: 'I want to go within the first year after the colony is open'
            },
            {
              text: 'Some time later',
              description: 'I will go to the colony some time later'
               + ' after I get feedback on the experience'
            }
          ]
        }
      ],
      page: 0,
      fastforward: true
    };

    this.state.ticket = [];
    for (let p in this.state.program) {
      if (this.state.program[p]) {
        this.state.ticket.push('Not selected');
      }
    }
  }

  isSelected(choice) {
    let p = this.state.program[this.state.page];
    return this.state.ticket[this.state.page] === p.choices[choice].text;
  }

  selectChoice(choice) {
    let p = this.state.program[this.state.page];
    this.state.ticket[this.state.page] = p.choices[choice].text;
    this.setState(this.state);

    if (this.state.fastforward) {
      this.moveNext();
    }
  }

  moveBack() {
    this.state.fastforward = false;
    this.state.page = Math.max(this.state.page - 1, 0);
    this.setState(this.state);
  }

  moveNext() {
    this.state.fastforward = true;
    this.state.page = this.state.page + 1;
    this.setState(this.state);
  }

  render() {
    let sectionChoices;
    let sectionButtons;
    let sectionTicketSize;

    let cart = [];
    for (let p = 0; p < this.state.program.length; p++) {
      cart.push(
        <div><p>{this.state.program[p].label}: { this.state.ticket[p] }</p></div>
      );
    }

    if (this.state.page < this.state.program.length) {
      let form = this.state.program[this.state.page];
  
      let choices = [];
      for (let c = 0; c < 3; c++) {
        choices.push(
          <Col sm={ 4 }>
            <TicketFormChoice
              choice={ form.choices[c] }
              selected={ this.isSelected(c) }
              onSelect={
                function() {
                  this.selectChoice(c);
                }.bind(this)
              }
            />
          </Col>
        );
      }
  
      sectionChoices = (
        <Col sm={ 8 }>
          <h2>{ form.label }</h2>
          <p>{ form.description }</p>

          <Row>
            { choices }
          </Row>

        </Col>
      );

      sectionTicketSize = 4;
    } else {
      sectionTicketSize = 12;
    }

    let sectionTicket = (
      <Col sm={ sectionTicketSize }>
        <h2>Your ticket { (sectionTicketSize === 12) ? 'is ready' : '' }</h2>
        { cart }
      </Col>
    );

    sectionButtons = (
      <Row>
        <Col sm={ 2 }>
          {
            (this.state.page > 0)
            ? (
              <Button bsSize="small" onClick={ this.moveBack.bind(this) }>Back</Button>
            )
            : null
          }
        </Col>
        <Col sm={ 4 }>
        </Col>
        <Col sm={ 2 }>
          {
            (this.state.page < this.state.program.length - 1)
            ? (
              <Button bsStyle="primary" bsSize="small" onClick={ this.moveNext.bind(this) }>
                Next
              </Button>
            )
            : (
              <Button bsStyle="primary" bsSize="small">
                Send me the discount!
              </Button>
            )
          }
        </Col>
        <Col sm={ 4 }>
        </Col>
      </Row>
    );

    return (
      <Panel>
        <Row>
          { sectionChoices }
          { sectionTicket }
        </Row>
        { sectionButtons }
      </Panel>
    );
  }
}
