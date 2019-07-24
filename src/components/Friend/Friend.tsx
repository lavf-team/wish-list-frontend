import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from 'components/Avatar';
import { avatarSize } from 'components/Avatar/config';
import { buttonStyles } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import { getIsMobile } from 'utils/checkIsMobile';
import { route } from 'utils/matchUrl';

import './Friend.module.scss';

interface IProps {
  friendId: number;
  friends: any;
  className?: string;
}

class Friend extends React.Component<IProps> {
  render() {
    const { friendId, friends, className } = this.props;
    const isMobile = getIsMobile();
    const { name, surname, avatar } = friends[friendId];

    return (
      <div className={className} styleName="friend">
        <Avatar
          avatar={avatar}
          size={isMobile ? avatarSize.LARGE : avatarSize.MEDIUM}
        />
        {!isMobile ? (
          <div styleName="friend__info">
            <div styleName="friend__name">{`${name} ${surname}`}</div>
            <Link
              to={{
                pathname: route.FRIENDS_WISHES.create(friendId),
              }}
            >
              <SimpleButton
                text={'Узнать что подарить'}
                style={buttonStyles.BLUE}
              />
            </Link>
          </div>
        ) : (
          <>
            <div styleName="friend__name">{`${name} ${surname}`}</div>
            <Link
              to={{
                pathname: route.FRIENDS_WISHES.create(friendId),
              }}
            >
              <SimpleButton
                text={'Узнать что подарить'}
                style={buttonStyles.BLUE}
                styleName="friend__button"
              />
            </Link>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends.objects,
});

export default connect(mapStateToProps)(Friend);
