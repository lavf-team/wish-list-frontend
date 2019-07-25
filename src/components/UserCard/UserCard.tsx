import React from 'react';

import Avatar from 'components/Avatar';
import { avatarSize } from 'components/Avatar/config';
import { buttonSizes, buttonStyles } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import TextEmoji from 'components/TextEmoji';
import { ILink, IUser } from 'config/interfaces';
import { getIsMobile } from 'utils/checkIsMobile';

import './UserCard.module.scss';

interface IProps {
  user: IUser;
  links: {
    [id: string]: ILink;
  };
  className?: string;
  onClick: (any) => null;
}

export default class UserCard extends React.Component<IProps> {
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
        },
        secondLink: {
          title: secondTitle,
          text: secondText,
          img: secondImg,
          isActive: isSecondLinkActive,
          to: secondPath,
        },
      },
      className,
      onClick,
    } = this.props;
    const isMobile = getIsMobile();

    return (
      <div className={className} styleName="user-card">
        <Avatar
          avatar={avatar || ''}
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
              to={firstPath}
              title={firstTitle}
              onClick={onClick}
            />
            <TextEmoji
              text={secondText}
              emoji={secondImg}
              isActive={isSecondLinkActive}
              to={secondPath}
              title={secondTitle}
              onClick={onClick}
            />
          </div>
          {!isMobile ? (
            <SimpleButton
              size={buttonSizes.SMALL}
              text={'Поделиться'}
              style={buttonStyles.BLUE}
            />
          ) : (
            <div styleName="user-card__share-button" />
          )}
        </div>
      </div>
    );
  }
}
