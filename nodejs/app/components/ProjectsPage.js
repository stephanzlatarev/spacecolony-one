import React from 'react';

import ProjectCard from './ProjectCard.js';

export default class ProjectsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          title: 'Mars Habitats',
          text: 'Build habitats on Mars'
        },
        {
          title: 'Space Habitats',
          text: 'Build habitats in deep space'
        },
        {
          title: 'Terraformed Mars',
          text: 'Settle on a terraformed Mars'
        }
      ]
    };
  }

  render() {
    let cards = [];

    this.state.projects.forEach(function(data) {
      cards.push(
        <ProjectCard project={ data } />
      );
    });

    return (
      <div className="container">
        { cards }
      </div>
    );
  }
}
