import React from 'react';

import {Button, Col, Form, FormControl, FormGroup, Glyphicon, Panel, Row} from 'react-bootstrap';

import TicketFormChoice from './TicketFormChoice';

export default class TicketBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      program: [
        {
          key: 'crew',
          label: 'CREW',
          description: 'Choose your crew. The colony crew is between 6 and 12 members',
          choices: [
            {
              key: 'solo',
              text: 'Just me',
              description: 'I will join any crew'
            },
            {
              key: 'pair',
              text: 'Me and a partner',
              description: 'I will come with a partner and join any crew'
            },
            {
              key: 'team',
              text: 'My team',
              description: 'My crew is complete with my family or colleagues'
            }
          ]
        },
        {
          key: 'duration',
          label: 'DURATION',
          description: 'Choose the duration of your mission',
          choices: [
            {
              key: 'halfday',
              text: 'Half day',
              description: 'I will stay for half a day'
            },
            {
              key: 'overnight',
              text: 'Day and night',
              description: 'I will come in the morning, sleep in the base'
                + ' and return the next afternoon'
            },
            {
              key: 'days',
              text: '3+ days',
              description: 'I will stay for at least three days'
            }
          ]
        },
        {
          key: 'transport',
          label: 'TRANSPORT',
          description: 'Choose how you want to get to the base camp',
          choices: [
            {
              key: 'no',
              text: 'Start from base',
              description: 'I will start the trip from the base camp'
            },
            {
              key: 'elevator',
              text: 'By space elevator',
              description: 'I will get to the base camp in a space elevator'
            },
            {
              key: 'rocket',
              text: 'By rocket',
              description: 'I will get to the base camp in a rocket'
            }
          ]
        },
        {
          key: 'food',
          label: 'FOOD',
          description: 'Choose what you eat in the colony',
          choices: [
            {
              key: 'earth',
              text: 'Earth imports',
              description: 'I will eat food imported from Earth'
            },
            {
              key: '3dprinted',
              text: '3D printed',
              description: 'I will eat 3D-printed food'
            },
            {
              key: 'garden',
              text: 'I will gather',
              description: 'I will eat the food my colony produces'
            }
          ]
        },
        {
          key: 'missions',
          label: 'MISSIONS',
          description: 'Choose what missions you will engage in',
          choices: [
            {
              key: 'easy',
              text: 'Leisure walk',
              description: 'I will be looking around inside the habitat'
                + ' and will go outside the habitat in a space suit'
            },
            {
              key: 'normal',
              text: 'Routine',
              description: 'I will engage in a routine exploration or mining mission'
            },
            {
              key: 'hard',
              text: 'Adrenaline rush',
              description: 'I will engage in a rescue mission'
            }
          ]
        },
        {
          key: 'souvenirs',
          label: 'SOUVENIRS',
          description: 'Choose what souvenirs you will take away',
          choices: [
            {
              key: 'no',
              text: 'Only memories',
              description: 'No souvenirs please'
            },
            {
              key: 'gift',
              text: 'Surprise gift',
              description: 'I will expect to get photos and collected artifacts'
                + ' during my missions after my return to Earth'
            },
            {
              key: 'shop',
              text: 'Souvenir shop',
              description: 'I will buy from the souvenir shop myself'
            }
          ]
        },
        {
          key: 'when',
          label: 'WHEN',
          description: 'Choose when you want to go to the mission',
          choices: [
            {
              key: 'pioneer',
              text: 'The first one',
              description: 'I want to be the first one'
            },
            {
              key: 'early',
              text: 'In the first year',
              description: 'I want to go within the first year after the colony is open'
            },
            {
              key: 'lagger',
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

    this.state.ticket = {};
  }

  isSelected(choice) {
    let p = this.state.program[this.state.page];
    return this.state.ticket[p.key] === p.choices[choice].key;
  }

  getSelected(p) {
    let key = this.state.program[p].key;
    let choices = this.state.program[p].choices;
    for (let c in choices) {
      if (choices[c] && (choices[c].key === this.state.ticket[key])) {
        return choices[c].text;
      }
    }
  }

  selectChoice(choice) {
    let p = this.state.program[this.state.page];
    this.state.ticket[p.key] = p.choices[choice].key;
    this.setState(this.state);

    if (this.state.fastforward) {
      let nextpage = this.state.page + 1;
      window.setTimeout(function() {
        this.moveTo(nextpage);
      }.bind(this), 150);
    }
  }

  isValidEmail(email) {
    let a = email.indexOf('@');
    let b = email.indexOf('.', a);
    return (a > 0) && (b > a + 1) && (b + 1 < email.length);
  }

  selectEmail() {
    if (!this.email.value || !this.email.value.length) {
      this.state.emailisvalid = false;
      this.state.emailvalidation = 'We need your email address to send you the voucher';
    } else if (!this.isValidEmail(this.email.value)) {
      this.state.emailisvalid = false;
      this.state.emailvalidation = 'Please complete your email address';
    } else {
      this.state.emailisvalid = true;
      this.state.emailvalidation = null;
    }

    this.state.ticket.email = this.email.value;
    this.setState(this.state);
  }

  moveBack() {
    this.state.fastforward = false;
    this.moveTo(Math.max(this.state.page - 1, 0));
  }

  moveNext() {
    this.state.fastforward = true;
    this.moveTo(this.state.page + 1);
  }

  moveTo(page) {
    if (this.state.page !== page) {
      this.state.page = page;
      this.setState(this.state);

      if (window.ga) {
        window.ga('send', 'pageview', '/Experience/Tickets/' + page);
      }
    }
  }

  completeTicket(event) {
    event.preventDefault();

    if (this.state.emailisvalid) {
      window.$.post('/prospect', JSON.stringify(this.state.ticket))
      .done(function() {
        console.log('Done');
      });

      if (window.ga) {
        window.ga('send', 'pageview', '/Experience/Tickets/Sent');
      }
    }

    return false;
  }

  render() {
    let sectionChoices;
    let sectionTicketSize;

    let cart = [];
    for (let p = 0; p < this.state.program.length; p++) {
      if (this.state.program[p]) {
        let selection = this.getSelected(p);
        let status = (selection) ? 'check' : 'unchecked';
        let style = (this.state.page === p) ? 'text-primary' : null;
        cart.push(
          <div>
            <Glyphicon className={ style } glyph={ status } />
            &nbsp;
            { this.state.program[p].label }
            &nbsp;
            { this.getSelected(p) }
          </div>
        );
      }
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

    let buttonLeft = null;
    if (this.state.page >= this.state.program.length) {
      buttonLeft = (
        <Button bsSize="small" onClick={ this.moveBack.bind(this) }>
          Let me correct it
        </Button>
      );
    } else if (this.state.page > 0) {
      buttonLeft = (
        <Button bsSize="small" onClick={ this.moveBack.bind(this) }>
          Back
        </Button>
      );
    }

    let buttonRight = null;
    if (this.state.page < this.state.program.length) {
      buttonRight = (
        <Button bsStyle="primary" bsSize="small"
          disabled={ !this.getSelected(this.state.page) }
          onClick={ this.moveNext.bind(this) }>
          Next
        </Button>
      );
    } else {
      buttonRight = (
        <Form inline onSubmit={ this.completeTicket.bind(this) }>
          <Button bsStyle="primary" bsSize="small"
            disabled={ !this.state.emailisvalid }
            onClick={ this.completeTicket.bind(this) }>
            Send the discount voucher to
          </Button>
          <FormGroup>
            <FormControl type="text" bsSize="small"
              value={ this.state.ticket.email }
              inputRef={ (ref) => {
                this.email = ref;
              } }
              onChange={ this.selectEmail.bind(this) }
              placeholder="my email address" />
          </FormGroup>
          <span>&nbsp;{ this.state.emailvalidation }</span>
        </Form>
      );
    }

    let buttons = null;
    if (this.state.page < this.state.program.length) {
      buttons = (
        <Row>
          <Col sm={ 2 }>
            { buttonLeft }
          </Col>
          <Col sm={ 4 }>
          </Col>
          <Col sm={ 2 }>
            { buttonRight }
          </Col>
          <Col sm={ 4 }>
          </Col>
        </Row>
      );
    } else {
      buttons = (
        <Row>
          <Col sm={ 3 }>
            { buttonLeft }
          </Col>
          <Col sm={ 9 }>
            { buttonRight }
          </Col>
        </Row>
      );
    }

    return (
      <Panel>
        <Row>
          { sectionChoices }
          { sectionTicket }
        </Row>

        { buttons }
      </Panel>
    );
  }
}
