import cn from 'classnames';
import React from 'react';

import { RoundEmojiStyles } from './config';
import './RoundEmoji.module.scss';

interface IProps {
  style?: RoundEmojiStyles;
  img: any;
}

export default class RoundEmoji extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    style: RoundEmojiStyles.BLUE,
  };

  render() {
    const { style, img } = this.props;

    return (
      <div styleName={cn('round-emoji', style ? `round-emoji_${style}` : '')}>
        <img
          src={img}
          styleName={cn(
            'round-emoji__icon',
            !style ? 'round-emoji_avatar' : ''
          )}
        />
      </div>
    );
  }
}
