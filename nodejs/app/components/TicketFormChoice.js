import React from 'react';

import {Panel} from 'react-bootstrap';

export default class TicketFormChoice extends React.Component {

  render() {
    let style = (this.props.selected) ? 'primary' : null;

    return (
      <Panel bsStyle={ style } className="clickable" onClick={ this.props.onSelect }>
        <h3>{ this.props.choice.text }</h3>
        <p>{ this.props.choice.description }</p>
      </Panel>
    );
  }
}
