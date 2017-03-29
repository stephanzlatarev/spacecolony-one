import React from 'react';

import {Nav} from 'react-bootstrap';

import * as ui from 'react-bootstrap';
import * as tools from './tools';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.registry = {};
    for (let o in ui) {
      if (ui[o]) {
        this.registry[o] = ui[o];
      }
    }
    for (let o in tools) {
      if (tools[o]) {
        this.registry[o] = tools[o];
      }
    }
  }

  find(classs) {
    return (this.registry[classs]) ? this.registry[classs] : classs;
  }

  render() {
    let find = this.find.bind(this);
    let children = [];

    this.props.tools.forEach(function(tool) {
      children.push(
        React.createElement(find(tool.type), tool.props, tool.body)
      );
    });

    return React.createElement(Nav, {pullRight: true}, children);
  }

}
