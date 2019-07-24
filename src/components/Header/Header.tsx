import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Avatar from 'components/Avatar';
import { IUser } from 'config/interfaces';
import { getIsMobile } from 'utils/checkIsMobile';
import matchUrl, { route } from 'utils/matchUrl';

import './Header.module.scss';

interface IProps {
  user: IUser;
  friendsIds: Array<number>;
  friends: {
    [id: string]: IUser;
  };
  isLoadingFriends: boolean;
  className?: string;
  match: { url: string };
}

class Header extends React.Component<IProps> {
  getAvatars = () => {
    const { friendsIds, friends } = this.props;
    const avatars: Array<string> = [];

    for (let i = 0; i < 3; i++) {
      avatars.push(friends[friendsIds[i]].avatar || '');
    }
    return avatars;
  };

  render() {
    const {
      user: { name, surname, avatar, isLoading },
      match: { url },
      className,
      friendsIds,
      isLoadingFriends,
    } = this.props;
    const isMobile = getIsMobile();
    const page = matchUrl(url);
    const avatars = !!friendsIds.length ? this.getAvatars() : [];

    return (
      <div className={className} styleName="header">
        {page !== route.PROFILE.title && (
          <div styleName="header__user-profile">
            <Avatar isLoading={isLoading} avatar={avatar || ''} />
            <Link to={route.MY_WISHES.url} styleName="header__nickname">
              {isMobile ? name : `${name} ${surname}`}
            </Link>
          </div>
        )}
        {page !== route.WISH_LIST.title && (
          <Link to={route.WISH_LIST.url} styleName="header__back-link">
            {isMobile ? 'Поиск' : 'Вернуться к поиску'}
          </Link>
        )}
        {page !== route.FRIENDS.title && (
          <div styleName="header__friends">
            <Link to={route.FRIENDS.url} styleName="header__friends-title">
              {isMobile ? 'Друзья' : 'Мои друзья'}
            </Link>
            {!isMobile && avatars.length ? (
              <div styleName="header__friends-avatars">
                {avatars.map((curAvatar, i) => (
                  <Avatar
                    key={i}
                    avatar={curAvatar}
                    isLoading={isLoadingFriends}
                    styleName="header__friend-avatar"
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  friendsIds: state.friends.friendsIds,
  friends: state.friends.objects,
  isLoadingFriends: state.friends.isLoading,
});

export default connect(mapStateToProps)(withRouter(Header));
