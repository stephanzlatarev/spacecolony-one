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
export {default as BlueprintChart} from './BlueprintChart';
export {default as MissionCard} from './MissionCard';
export {default as NavigationCard} from './NavigationCard';
