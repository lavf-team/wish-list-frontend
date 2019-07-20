import React from 'react';

import './Tip.module.scss';

export default class Tip extends React.Component<any> {
  render() {
    const { text = '', className = '' } = this.props;

    return (
      <div className={className}>
        <span styleName="tip__emoji">&#128577;</span>
        <div styleName="tip__text">{text}</div>
      </div>
    );
  }
}
