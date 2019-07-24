import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import UserCard from 'components/UserCard';
import WishList from 'components/WishList';
import { ILink, IUser, IWishes } from 'config/interfaces';
import wantedEmojiUrl from 'img/wantedEmoji.svg';
import coolEmojiUrl from 'img/wishEmoji.svg';
import { route } from 'utils/matchUrl';

import './ProfilePage.module.scss';

interface IProps {
  user: IUser;
  gifts: IWishes;
  wishes: IWishes;
  friends: {
    [id: string]: IUser;
  };
  match: {
    params: { id: number };
  };
}

interface IState {
  links: {
    [id: string]: ILink;
  };
}

class ProfilePage extends React.Component<IProps, IState> {
  state = {
    links: {
      firstLink: {
        title: 'firstLink',
        text: !this.props.match.params.id ? 'Хочу получить' : 'Хочет получить',
        img: wantedEmojiUrl,
        isActive: false,
        to: !this.props.match.params.id
          ? route.MY_WISHES.url
          : route.FRIENDS_WISHES.create(this.props.match.params.id),
      },
      secondLink: {
        title: 'secondLink',
        text: 'Хочу подарить',
        img: coolEmojiUrl,
        isActive: true,
        to: !this.props.match.params.id
          ? route.MY_GIFTS.url
          : route.FRIENDS_GIFTS.create(this.props.match.params.id),
      },
    },
  };

  handleClick = title => {
    let active;
    let inActive;
    const {
      links: {
        firstLink: { title: firstTitle },
        secondLink: { title: secondTitle },
      },
    } = this.state;

    if (title === firstTitle) {
      inActive = firstTitle;
      active = secondTitle;
    } else {
      inActive = secondTitle;
      active = firstTitle;
    }

    this.setState({
      links: {
        [inActive]: {
          ...this.state.links[inActive],
          isActive: false,
        },
        [active]: {
          ...this.state.links[active],
          isActive: true,
        },
      },
    });
  };

  getInfo = () => {
    const {
      user,
      match: {
        params: { id = null },
      },
      wishes,
      gifts,
      friends,
    } = this.props;

    return {
      profile: !id ? user : friends[id],
      wishes: wishes.defaultId,
      gifts: gifts.defaultId,
    };
  };

  render() {
    const { links } = this.state;
    const { profile, wishes, gifts } = this.getInfo();

    return (
      <>
        <Header styleName="profile-page__header" />
        <UserCard
          styleName="profile-page__user-card"
          user={profile}
          links={links}
          onClick={this.handleClick}
        />
        <Route
          path={route.MY_WISHES.url}
          render={props => (
            <WishList {...props} styleName="profile-page__list" list={wishes} />
          )}
        />
        <Route
          path={route.MY_GIFTS.url}
          render={props => (
            <WishList {...props} styleName="profile-page__list" list={gifts} />
          )}
        />
        <Route
          path={route.FRIENDS_WISHES.url}
          render={props => (
            <WishList {...props} styleName="profile-page__list" list={wishes} />
          )}
        />
        <Route
          path={route.FRIENDS_GIFTS.url}
          render={props => (
            <WishList {...props} styleName="profile-page__list" list={gifts} />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  gifts: state.gifts,
  wishes: state.wishes,
  friends: state.friends.objects,
});

export default connect(mapStateToProps)(ProfilePage);
