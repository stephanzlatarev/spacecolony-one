import React from 'react';

import Navigation from './Navigation.js';

export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        <Navigation path={ window.location.pathname } />
      </div>
    );
  }
}

export {default as Headline} from './Headline';
export {default as BlueprintSimulation} from './BlueprintSimulation';
export {default as Mission} from './Mission';
export {default as NavigationCard} from './NavigationCard';
export {default as ScienceCard} from './ScienceCard';
