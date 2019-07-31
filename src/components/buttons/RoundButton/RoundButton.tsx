import React from 'react';

import { buttonStyles } from 'components/buttons/config';

import './RoundButton.module.scss';

interface IProps {
  text: string;
  className?: string;
  style?: buttonStyles;
  onClick?: (any) => void;
}

export default class RoundButton extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    style: buttonStyles.LIGHT,
    onClick: () => null,
  };

  render() {
    const { text, className, style, onClick } = this.props;

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
