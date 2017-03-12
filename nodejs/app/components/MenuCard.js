import React from 'react';

import {Col, Image, Panel} from 'react-bootstrap';

export default class MenuCard extends React.Component {

  onClick() {
    // ga('send', 'event', 'MenuCard', this.props.data.title);
  }

  render() {
    let imgsrc = '/assets/pics/' + this.props.data.icon;

    return (
      <Panel>
        <Col sm={ 3 }>
          <Image src={ imgsrc } responsive />
        </Col>
        <Col sm={ 9 }>
          <div className="navigable" onClick={ this.onClick.bind(this) }>
            <h2>{ this.props.data.title }</h2>
            <p>{ this.props.data.text }</p>
          </div>
        </Col>
      </Panel>
    );
  }
}
