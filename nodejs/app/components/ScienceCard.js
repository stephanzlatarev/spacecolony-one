import React from 'react';

import {Col, Image, Panel} from 'react-bootstrap';

export default class ScienceCard extends React.Component {

  onClick() {
    window.open(this.props.navigation, '_blank');
  }

  render() {
    let classs = (this.props.navigation) ? 'navigable' : null;
    let click = (this.props.navigation) ? this.onClick.bind(this) : null;

    let imagesrc = (this.props.image.indexOf('http') === 0)
      ? this.props.image
      : '/assets/pics/' + this.props.image;
    let image;

    let textcol = 12;

    if (this.props.image) {
      image = (
        <Col sm={ 3 }>
          <Image src={ imagesrc } responsive />
        </Col>
      );
      textcol = 9;
    }

    return (
      <Panel className={ classs } onClick={ click }>
        { image }
        <Col sm={ textcol }>
          <h2>{ this.props.title }</h2>
          <p>{ this.props.text }</p>
        </Col>
      </Panel>
    );
  }
}
