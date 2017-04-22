import React from 'react';

import {Button, Modal} from 'react-bootstrap';

export default class TicketFormThankYou extends React.Component {

  onClose() {
    window.spacecolony.navigateHome();
  }

  render() {
    return (
      <Modal show={ this.props.show }>
        <Modal.Header>
          <Modal.Title>Thank you!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Expect your discount voucher in you mail inbox in 48 hours!</p>
          <p>If you do not receive it by then, please, contact us for support!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={ this.onClose }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
