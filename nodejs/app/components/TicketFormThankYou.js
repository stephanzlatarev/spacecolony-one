import React from 'react';

import {Button, Modal} from 'react-bootstrap';

export default class TicketFormThankYou extends React.Component {

  onClose() {
    window.spacecolony.navigateTo(window.spacecolony.home);
  }

  render() {
    return (
      <Modal show={ this.props.show }>
        <Modal.Header>
          <Modal.Title>Thank you!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Expect your discount voucher in you mail inbox by tomorrow!</p>
          <p>If you do not receive it by then, please, contact us for support!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={ this.onClose }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
