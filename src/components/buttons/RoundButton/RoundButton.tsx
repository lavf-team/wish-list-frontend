import React from 'react';

import { buttonStyles } from 'components/buttons/config';

import './RoundButton.module.scss';

export default class RoundButton extends React.Component<any> {
  render() {
    const {
      text = '',
      className = '',
      style = buttonStyles.LIGHT,
      onClick = () => null
    } = this.props;

    return (
      <div
        onClick={onClick}
        className={className}
        styleName={`round-button round-button_${style}`}
      >
        {text}
      </div>
    );
  }
}
