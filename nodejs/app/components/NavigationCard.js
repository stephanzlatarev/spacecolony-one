import React from 'react';

import {Col, Image, Panel} from 'react-bootstrap';

export default class NavigationCard extends React.Component {

  onClick() {
    // ga('send', 'event', 'Navigation', this.props.data.title);
    window.spacecolony.navigateTo({
      label: this.props.title,
      navigation: this.props.navigation
    });
  }

  render() {
    let classs = (this.props.navigation) ? 'navigable' : null;
    let click = (this.props.navigation) ? this.onClick.bind(this) : null;
    let image;
    let textcol = 12;

    if (this.props.image) {
      image = (
        <Col sm={ 3 }>
          <Image src={ '/assets/pics/' + this.props.image } responsive />
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
