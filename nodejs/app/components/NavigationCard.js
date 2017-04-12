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
    let source;
    let disclaimer;

    if (this.props.image) {
      let imagesrc = (this.props.image.startsWith('http'))
        ? this.props.image
        : '/assets/pics/' + this.props.image;
      image = (
        <Col sm={ 3 }>
          <Image src={ imagesrc } responsive />
        </Col>
      );
      textcol = 9;
    }

    if (this.props.source) {
      source = (
        <div style={ {color: 'LightSteelBlue'} }>
          Source:&nbsp;
          <a href={ this.props.source }>{ this.props.source }</a>
        </div>
      );
    }

    if (this.props.disclaimer) {
      disclaimer = (
        <div style={ {color: 'gray', fontStyle: 'italic'} }>
          { this.props.disclaimer }
        </div>
      );
    }

    return (
      <Panel className={ classs } onClick={ click }>
        { image }
        <Col sm={ textcol }>
          <h2>{ this.props.title }</h2>
          { source }
          <p>{ this.props.text }</p>
          { disclaimer }
        </Col>
      </Panel>
    );
  }
}
