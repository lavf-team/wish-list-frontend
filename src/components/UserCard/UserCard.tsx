import React from 'react';

import Avatar from 'components/Avatar';
import { avatarSize } from 'components/Avatar/config';
import { buttonStyles } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import TextEmoji from 'components/TextEmoji';
import { getIsMobile } from 'utils/checkIsMobile';

import './UserCard.module.scss';

export default class UserCard extends React.Component<any> {
  render() {
    const {
      user: { avatar, name, surname },
      links: {
        firstLink: {
          title: firstTitle,
          text: firstText,
          img: firstImg,
          isActive: isFirstLinkActive,
          to: firstPath,
          state
        },
        secondLink: {
          title: secondTitle,
          text: secondText,
          img: secondImg,
          isActive: isSecondLinkActive,
          to: secondPath
        }
      },
      className,
      onClick
    } = this.props;
    const isMobile = getIsMobile();

    return (
      <div className={className} styleName="user-card">
        <Avatar
          avatar={avatar}
          size={isMobile ? avatarSize.SMALL_LARGE : avatarSize.MEDIUM_LARGE}
        />
        <div styleName="user-card__info">
          <div styleName="user-card__fullname">{`${name} ${surname}`}</div>
          <div styleName="user-card__wish">
            <TextEmoji
              styleName="user-card__text-emoji"
              text={firstText}
              emoji={firstImg}
              isActive={isFirstLinkActive}
              to={{
                state,
                pathname: firstPath
              }}
              title={firstTitle}
              onClick={onClick}
            />
            <TextEmoji
              text={secondText}
              emoji={secondImg}
              isActive={isSecondLinkActive}
              to={{
                state,
                pathname: secondPath
              }}
              title={secondTitle}
              onClick={onClick}
            />
          </div>
          {!isMobile ? (
            <SimpleButton text={'Поделиться'} style={buttonStyles.BLUE} />
          ) : (
            <div styleName="user-card__share-button" />
          )}
        </div>
      </div>
    );
  }
}
