import cn from 'classnames';
import React from 'react';

import { buttonSizes } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import RoundEmoji from 'components/RoundEmoji/RoundEmoji';
import { IWish } from 'config/interfaces';

import { wishSize } from './config';
import './Wish.module.scss';

interface IProps {
  className?: string;
  info: IWish;
  size: wishSize;
}

export default class Wish extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: wishSize.FIXED,
  };

  render() {
    const {
      className,
      info: {
        img,
        title,
        prize,
        description,
        state: { text, style, emojiInside, emojiOutside },
      },
      size,
    } = this.props;
    const isFixed = size === wishSize.FIXED;

    return (
      <div
        className={className}
        styleName={cn('wish', isFixed && `wish_${size}`)}
      >
        <img
          src={img}
          styleName={cn('wish__img', isFixed && `wish__img_${size}`)}
        />
        <div styleName="wish__title">{title}</div>
        <div styleName="wish__prize">{prize}</div>
        <div styleName="wish__description">{description}</div>
        <div styleName="wish__footer">
          <SimpleButton
            text={text}
            style={style}
            emoji={emojiInside}
            size={emojiOutside.has ? buttonSizes.MEDIUM : buttonSizes.LARGE}
          />
          {emojiOutside.has && (
            <RoundEmoji style={emojiOutside.style} img={emojiOutside.url} />
          )}
        </div>
      </div>
    );
  }
}
