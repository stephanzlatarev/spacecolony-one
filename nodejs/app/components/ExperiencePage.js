import React from 'react';

import {Panel} from 'react-bootstrap';

export default class ExperiencePage extends React.Component {

  render() {
    return (
      <div className="container">
        <Panel>
          We are building a space colony prototype based on the featured blueprints.
          It will open on 20.02.2020 and will be open to everyone to visit.
          If you wish to support us come join us in the crowd-funding project.
          Contact us.
        </Panel>
      </div>
    );
  }
}
