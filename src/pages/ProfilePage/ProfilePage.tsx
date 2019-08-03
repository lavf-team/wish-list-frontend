import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import UserCard from 'components/UserCard';
import WishList from 'components/WishList';
import { ILink, IUser, IWish } from 'config/interfaces';
import wantedEmojiUrl from 'img/wantedEmoji.svg';
import coolEmojiUrl from 'img/wishEmoji.svg';
import {
  actionGetFriendGifts,
  actionGetFriendWishes,
} from 'store/friendsStore/actions';
import {
  actionGetUserGifts,
  actionGetUserWishes,
} from 'store/userStore/actions';
import { route } from 'utils/matchUrl';

import { PROFILE_PAGE, PROFILE_PAGE_TYPE } from './config/config';
import './ProfilePage.module.scss';

interface IProps {
  user: IUser;
  friends: {
    [id: string]: IUser;
  };
  match: {
    params: { id: number };
  };
  location: {
    pathname: string;
  };
  userWishes: {
    [id: string]: IWish;
  };
  userWishesIds: Array<string>;
  userGifts: {
    [id: string]: IWish;
  };
  userGiftsIds: Array<string>;
  friendWishes: {
    [id: string]: IWish;
  };
  friendWishesIds: Array<string>;
  friendGifts: {
    [id: string]: IWish;
  };
  friendGiftsIds: Array<string>;
  getUserWishes: () => any;
  getUserGifts: () => any;
  getFriendWishes: (id: number) => any;
  getFriendGifts: (id: number) => any;
}

interface IState {
  links: {
    [id: string]: ILink;
  };
  profile: IUser | null;
  type: any;
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
    profile: !this.props.match.params.id
      ? this.props.user
      : this.props.friends[this.props.match.params.id],
    type: PROFILE_PAGE.USER_WISHES(),
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

  getType = () => {
    const {
      match: {
        params: { id = null },
      },
      location: { pathname },
    } = this.props;

    return pathname.includes('wishes')
      ? !id
        ? PROFILE_PAGE.USER_WISHES()
        : PROFILE_PAGE.FRIEND_WISHES(id)
      : !id
      ? PROFILE_PAGE.USER_GIFTS()
      : PROFILE_PAGE.FRIEND_GIFTS(id);
  };

  loadWishes = () => {
    const type = this.getType();
    const {
      match: {
        params: { id },
      },
    } = this.props;
    switch (type.title) {
      case PROFILE_PAGE_TYPE.USER_WISHES:
        this.props.getUserWishes();
        return;
      case PROFILE_PAGE_TYPE.USER_GIFTS:
        this.props.getUserGifts();
        return;
      case PROFILE_PAGE_TYPE.FRIEND_WISHES:
        this.props.getFriendWishes(id);
        return;
      case PROFILE_PAGE_TYPE.FRIEND_GIFTS:
        this.props.getFriendGifts(id);
        return;
      default:
        return;
    }
  };

  getWishes = () => {
    const type = this.getType();
    switch (type.title) {
      case PROFILE_PAGE_TYPE.USER_WISHES:
        return {
          normalizer: id => this.props.userWishes[id],
          wishesIds: this.props.userWishesIds,
        };
      case PROFILE_PAGE_TYPE.USER_GIFTS:
        return {
          normalizer: () => {},
          wishesIds: [],
        };
      case PROFILE_PAGE_TYPE.FRIEND_WISHES:
        return {
          normalizer: () => {},
          wishesIds: [],
        };
      case PROFILE_PAGE_TYPE.FRIEND_GIFTS:
        return {
          normalizer: () => {},
          wishesIds: [],
        };
      default:
        return {
          normalizer: () => {},
          wishesIds: [],
        };
    }
  };

  componentDidMount() {
    this.loadWishes();
  }

  componentDidUpdate(_, prevState) {
    const { type: prevType } = prevState;
    const type = this.getType();

    if (type.title !== prevType.title) {
      this.loadWishes();
    }
  }

  render() {
    const { links, profile } = this.state;
    const { normalizer, wishesIds } = this.getWishes();

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
            <WishList
              {...props}
              styleName="profile-page__list"
              listIds={wishesIds}
              normalizer={normalizer}
            />
          )}
        />
        <Route
          path={route.MY_GIFTS.url}
          render={props => (
            <WishList
              {...props}
              styleName="profile-page__list"
              listIds={wishesIds}
              normalizer={normalizer}
            />
          )}
        />
        <Route
          path={route.FRIENDS_WISHES.url}
          render={props => (
            <WishList
              {...props}
              styleName="profile-page__list"
              listIds={wishesIds}
              normalizer={normalizer}
            />
          )}
        />
        <Route
          path={route.FRIENDS_GIFTS.url}
          render={props => (
            <WishList
              {...props}
              styleName="profile-page__list"
              listIds={wishesIds}
              normalizer={normalizer}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  friends: state.friends.objects,
  userWishes: state.user.wishes,
  userWishesIds: state.user.wishesIds,
  userGifts: state.user.gifts,
  userGiftsIds: state.user.giftsIds,
  friendWishes: state.friends.wishes,
  friendWishesIds: state.friends.wishesIds,
  friendGifts: state.friends.gifts,
  friendGiftsIds: state.friends.giftsIds,
});

const mapDispatchToProps = {
  getUserWishes: actionGetUserWishes,
  getUserGifts: actionGetUserGifts,
  getFriendWishes: actionGetFriendWishes,
  getFriendGifts: actionGetFriendGifts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
