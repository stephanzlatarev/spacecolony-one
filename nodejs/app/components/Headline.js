import React from 'react';

export default class Headline extends React.Component {

  render() {
    let headlinestyle = {
      width: '100%',
      border: 'none',
      padding: '0px',
      background: 'url("/assets/pics/' + this.props.image + '")',
      paddingTop: '135px'
    };
    let textstyle = {
      padding: '15px',
      backgroundColor: 'white'
    };

    return (
      <div className="panel" style={ headlinestyle }>
        <p className="panel" style={ textstyle }>
          { this.props.text }
        </p>
      </div>
    );
  }
}
