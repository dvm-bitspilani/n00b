import React, { Component } from 'react';

import N00b from './N00b.react';

export default class N00bs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n00bs: []
    };
  }
  componentDidMount() {
    fetch('/core/')
      .then(response => response.json())
      .then(data => {
        if(data.okay) {
          this.setState({
            n00bs: data.data
          });
        }
      });
  }
  render() {
    const n00bs = this.state.n00bs.map(n00b => (
      <N00b key={n00b.n00b._id} n00b={n00b}/>
    ));
    return (
      <div className="n00bs">
        {n00bs}
      </div>
    );
  }
}
