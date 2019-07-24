import cn from 'classnames';
import React from 'react';

import { buttonSizes, buttonStyles } from 'components/buttons/config';

import './SimpleButton.module.scss';

interface IProps {
  size?: buttonSizes;
  text?: string;
  style?: buttonStyles;
  className?: string;
  onClick?: () => void;
}

export default class SimpleButton extends React.Component<IProps> {
  static defaultProps = {
    size: buttonSizes.MEDIUM,
    style: buttonStyles.BLUE,
    onClick: () => null,
  };

  render() {
    const { size, text, style, className, onClick } = this.props;

    const buttonClassName = cn(
      'simple-button',
      `simple-button_${size}`,
      `simple-button_${style}`
    );

    return (
      <div onClick={onClick} className={className} styleName={buttonClassName}>
        <div styleName="simple-button__text">{text}</div>
      </div>
    );
  }
}
