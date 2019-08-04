import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

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
  onButtonClick?: (string) => any;
  onEmojiClick?: (any) => any;
  id: string;
  userWishes: any;
}

class Wish extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: wishSize.FIXED,
    onButtonClick: () => null,
    onEmojiClick: () => null,
  };

  getStateByInfo(info) {
    const { id, userWishes } = this.props;

    if ('reserved' in info) {
      return info.reserved
        ? wishState.CAN_BE_DELETED_GIVEN()
        : wishState.CAN_BE_DELETED();
    }

    if ('friendWishReserved' in info) {
      if (info.friendWishReserved) {
        if (info.reservedByMe) {
          return userWishes[id]
            ? wishState.CAN_NOT_GIVE_FAVORITE()
            : wishState.CAN_NOT_GIVE_NOT_FAVORITE();
        }
        return userWishes[id]
          ? wishState.ALREADY_GIVEN_FAVORITE()
          : wishState.ALREADY_GIVEN_NOT_FAVORITE();
      }
      return userWishes[id]
        ? wishState.CAN_GIVE_FAVORITE()
        : wishState.CAN_GIVE_NOT_FAVORITE();
    }

    if ('receiverId' in info) {
      return userWishes[id]
        ? wishState.CAN_NOT_GIVE_FAVORITE()
        : wishState.CAN_NOT_GIVE_NOT_FAVORITE();
    }

    if ('receiverFriendId' in info) {
      return wishState.CAN_NOT_GIVE_WITH_AVATAR(info.avatar);
    }

    return wishState.CAN_BE_ADDED();
  }

  render() {
    const {
      className,
      id,
      info: { img, title, prize, description },
      size,
      onButtonClick,
      onEmojiClick,
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
            onClick={onButtonClick(id)}
          />
          {emojiOutside.has && (
            <RoundEmoji
              style={emojiOutside.style}
              img={emojiOutside.url}
              onEmojiClick={onEmojiClick(id)}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userWishes: state.user.wishes,
});

export default connect(mapStateToProps)(Wish);
