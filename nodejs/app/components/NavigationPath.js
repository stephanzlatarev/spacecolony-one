import React from 'react';

import {Panel} from 'react-bootstrap';

export default class NavigationPath extends React.Component {

  render() {
    let view = null;

    if (this.props.path.length > 1) {
      let navigateTo = this.props.navigate;

      let parts = [];
      this.props.path.forEach(function(part) {
        let click = function() {
          navigateTo(part);
        };
  
        parts.push(
          <span className="navpath" onClick={ click }>
            { part.label } :
          </span>
        );
      });

      view = (
        <Panel>
          { parts }
        </Panel>
      );
    }

    return view;
  }

}
