import React from 'react';

import {Button, Col, Form, FormControl, FormGroup, Glyphicon, Panel, Row} from 'react-bootstrap';

import TicketFormChoice from './TicketFormChoice';
import TicketFormThankYou from './TicketFormThankYou';

export default class TicketBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      fastforward: true,
      done: false
    };

    this.state.ticket = {};
  }

  isSelected(choice) {
    let p = this.props.program[this.state.page];
    return this.state.ticket[p.key] === p.choices[choice].key;
  }

  getSelected(p) {
    let key = this.props.program[p].key;
    let choices = this.props.program[p].choices;
    for (let c in choices) {
      if (choices[c] && (choices[c].key === this.state.ticket[key])) {
        return choices[c].text;
      }
    }
  }

  selectChoice(choice) {
    let p = this.props.program[this.state.page];
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
        this.state.done = true;
        this.setState(this.state);
      }.bind(this));

      if (window.ga) {
        window.ga('send', 'pageview', '/Experience/Tickets/Sent');
      }
    }

    return false;
  }

  onBeforeUnload(event) {
    let message = 'We are sorry to see you leave!'
      + ' Would you still help us improve the park by filling out the survey?';
    let e = event || window.event;
    if (e) {
      e.returnValue = message;
    }
    return message;
  }

  render() {
    window.onbeforeunload = !this.state.done ? this.onBeforeUnload : null;

    let sectionChoices;
    let sectionTicketSize;

    let cart = [];
    for (let p = 0; p < this.props.program.length; p++) {
      if (this.props.program[p]) {
        let selection = this.getSelected(p);
        let status = (selection) ? 'check' : 'unchecked';
        let style = (this.state.page === p) ? 'text-primary' : null;
        cart.push(
          <div>
            <Glyphicon className={ style } glyph={ status } />
            &nbsp;
            { this.props.program[p].label }
            &nbsp;
            { this.getSelected(p) }
          </div>
        );
      }
    }

    if (this.state.page < this.props.program.length) {
      let form = this.props.program[this.state.page];
  
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
        <h2>
          {
            (sectionTicketSize === 12)
            ? this.props.labels.TICKET_READY
            : this.props.labels.TICKET_HEADER
          }
        </h2>
        { cart }
      </Col>
    );

    let buttonLeft = null;
    if (this.state.page >= this.props.program.length) {
      buttonLeft = (
        <Button bsSize="small" onClick={ this.moveBack.bind(this) }>
          { this.props.labels.CORRECT }
        </Button>
      );
    } else if (this.state.page > 0) {
      buttonLeft = (
        <Button bsSize="small" onClick={ this.moveBack.bind(this) }>
          { this.props.labels.BACK }
        </Button>
      );
    }

    let buttonRight = null;
    if (this.state.page < this.props.program.length) {
      buttonRight = (
        <Button bsStyle="primary" bsSize="small"
          disabled={ !this.getSelected(this.state.page) }
          onClick={ this.moveNext.bind(this) }>
          { this.props.labels.NEXT }
        </Button>
      );
    } else {
      buttonRight = (
        <Form inline onSubmit={ this.completeTicket.bind(this) }>
          <Button bsStyle="primary" bsSize="small"
            disabled={ !this.state.emailisvalid }
            onClick={ this.completeTicket.bind(this) }>
            { this.props.labels.SEND_TO }
          </Button>
          <FormGroup>
            <FormControl type="text" bsSize="small"
              value={ this.state.ticket.email }
              inputRef={ (ref) => {
                this.email = ref;
              } }
              onChange={ this.selectEmail.bind(this) }
              placeholder={ this.props.labels.SEND_TO_HINT } />
          </FormGroup>
          <span>&nbsp;{ this.state.emailvalidation }</span>
        </Form>
      );
    }

    let buttons = null;
    if ((this.state.page === 0) && (!this.getSelected(0))) {
      buttons = (
        <p style={ {fontStyle: 'italic', fontSize: '90%'} }>
          { this.props.labels.OPTIONS_HINT }
        </p>
      );
    } else if (this.state.page < this.props.program.length) {
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

        <TicketFormThankYou show={ this.state.done } />
      </Panel>
    );
  }
}
