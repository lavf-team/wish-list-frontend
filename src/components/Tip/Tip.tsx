import React from 'react';

import sadEmoji from 'img/sadEmoji.svg';

import './Tip.module.scss';

interface IProps {
  text?: string;
  className?: string;
}

export default class Tip extends React.Component<any> {
  static defaultProps: Partial<IProps> = {
    text: '',
  };

  render() {
    const { text, className } = this.props;

    return (
      <div className={className} styleName="tip">
          <img src={sadEmoji} styleName="tip__emoji" />
        <div styleName="tip__text">{text}</div>
      </div>
    );
  }
}
