import cn from 'classnames';
import React from 'react';

import { buttonSizes, buttonStyles } from 'components/buttons/config';

import './SimpleButton.module.scss';

interface IProps {
  size?: buttonSizes;
  text?: string;
  style?: buttonStyles;
  className?: string;
  emoji: {
    has: boolean;
    url: any;
  };
  onClick?: (any) => void;
}

export default class SimpleButton extends React.Component<IProps> {
  static defaultProps = {
    size: buttonSizes.MEDIUM,
    style: buttonStyles.BLUE,
    emoji: {
      has: false,
      url: null,
    },
    onClick: () => null,
  };

  render() {
    const {
      size,
      text,
      style,
      className,
      onClick,
      emoji: { has, url },
    } = this.props;

    const buttonClassName = cn(
      'simple-button',
      `simple-button_${size}`,
      `simple-button_${style}`
    );

    return (
      <div onClick={onClick} styleName={buttonClassName} className={className}>
        <div styleName="simple-button__text">{text}</div>
        {has && <img styleName="simple-button__emoji" src={url} />}
      </div>
    );
  }
}
