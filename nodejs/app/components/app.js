import React from 'react';

import Navigation from './Navigation.js';

export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        <Navigation />
      </div>
    );
  }
}

export {default as Headline} from './Headline';
export {default as NavigationCard} from './NavigationCard';
