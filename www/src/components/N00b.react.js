import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class N00b extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {n00b, github} = this.props.n00b;
    const branches = n00b.branches.map(branch =>
      <span key={branch.type}>
        {branch.name} &mdash;&gt; {branch.type}
        ({n00b.last_pull[branch.type].time})
      </span>
    );
    return (
      <div className="n00b">
        <span>{n00b.name}</span>
        <span>{n00b.domain}</span>
        <span>{n00b.repository}</span>
        {branches}
      </div>
    );
  }
}
