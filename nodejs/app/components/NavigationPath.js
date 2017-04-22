import React from 'react';

import {Glyphicon, Panel} from 'react-bootstrap';

export default class NavigationPath extends React.Component {

  render() {
    let view = null;

    if (this.props.path && (this.props.path.length > 1)) {
      let navigateTo = this.props.navigate;

      let parts = [];
      this.props.path.forEach(function(part) {
        let click = function() {
          navigateTo(part);
        };
  
        parts.push(
          <span className="navpath" onClick={ click }>
            { part.label }
          </span>
        );
      });

      let elements = [];
      if (parts.length > 0) {
        elements.push(parts[0]);
      }
      for (let i = 1; i < parts.length; i++) {
        elements.push(
          <Glyphicon className='navpath-separator' glyph='chevron-right' />
        );
        elements.push(parts[i]);
      }

      view = (
        <Panel>
          { elements }
        </Panel>
      );
    }

    return view;
  }

}
