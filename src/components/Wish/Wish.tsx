import cn from 'classnames';
import React from 'react';

import { buttonSizes } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import RoundEmoji from 'components/RoundEmoji/RoundEmoji';
import { IWish } from 'config/interfaces';

import { wishSize, wishState } from './config';
import './Wish.module.scss';

interface IProps {
  className?: string;
  info: IWish;
  size: wishSize;
  onClick?: (string) => () => void;
  id: string;
}

export default class Wish extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: wishSize.FIXED,
    onClick: () => () => {},
  };

  getStateByInfo(info) {
    if ('reserved' in info) {
      return info.reserved
        ? wishState.CAN_BE_DELETED_GIVEN()
        : wishState.CAN_BE_DELETED();
    }
    return wishState.CAN_BE_ADDED();
  }

  render() {
    const {
      className,
      id,
      info: { img, title, prize, description },
      size,
      onClick,
    } = this.props;
    const isFixed = size === wishSize.FIXED;
    const { text, style, emojiOutside, emojiInside } = this.getStateByInfo(
      this.props.info
    );

    return (
      <div
        className={className}
        styleName={cn('wish', isFixed && `wish_${size}`)}
      >
        <img
          src={`http://${img}`}
          styleName={cn('wish__img', isFixed && `wish__img_${size}`)}
        />
        <div styleName={cn('wish__title', isFixed && 'wish__title_fixed')}>
          {title}
        </div>
        <div styleName={cn('wish__prize', isFixed && 'wish__prize_fixed')}>
          {prize}
        </div>
        <div
          styleName={cn(
            'wish__description',
            isFixed && 'wish__description_fixed'
          )}
        >
          {description}
        </div>
        <div styleName="wish__footer">
          <SimpleButton
            text={text}
            style={style}
            emoji={emojiInside}
            size={emojiOutside.has ? buttonSizes.MEDIUM : buttonSizes.LARGE}
            onClick={onClick(id)}
          />
          {emojiOutside.has && (
            <RoundEmoji style={emojiOutside.style} img={emojiOutside.url} />
          )}
        </div>
      </div>
    );
  }
}
