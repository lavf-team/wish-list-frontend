import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import UserCard from 'components/UserCard';
import WishList from 'components/WishList';
import API from 'config/API';
import { ILink, IUser, IWish } from 'config/interfaces';
import wantedEmojiUrl from 'img/wantedEmoji.svg';
import coolEmojiUrl from 'img/wishEmoji.svg';
import Requester from 'libs/Requester/Requester';
import { API_VERSION, Token, VK_API_METHODS, VK_CALL_API } from 'store/config';
import {
  actionGetFriendGifts,
  actionGetFriendWishes,
  actionGiveGiftToFriend,
  actionRefuseGiveGiftToFriend,
} from 'store/friendsStore/actions';
import { normalizeData } from 'store/friendsStore/normalizers';
import {
  actionDeleteUserWish,
  actionGetUserGifts,
  actionGetUserWishes,
} from 'store/userStore/actions';
import { route } from 'utils/matchUrl';

import { PROFILE_PAGE, PROFILE_PAGE_TYPE } from './config/config';
import { normalizeAvatars } from './config/normalizers';
import './ProfilePage.module.scss';

import vkConnect from '@vkontakte/vkui-connect-promise';

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
    [id: string]: any;
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
  deleteUserWish: (id: string) => any;
  giveGiftToFriend: (any, any) => any;
  refuseGiveGiftToFriend: (any, any) => any;
}

interface IState {
  links: {
    [id: string]: ILink;
  };
  profile: IUser | null;
  type: any;
  avatars: {
    [id: string]: string;
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
    profile: !this.props.match.params.id
      ? this.props.user
      : this.props.friends[this.props.match.params.id],
    type: PROFILE_PAGE.USER_WISHES(),
    avatars: {},
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

  getAvatars = () => {
    const receiverFriendIds = this.props.userGiftsIds.reduce(
      (acc, el) => ({
        ...acc,
        [this.props.userGifts[el].receiverFriendId]: null,
      }),
      {}
    );
    console.log('usersids', Object.keys(receiverFriendIds).join(','));
    vkConnect
      .send(VK_CALL_API, {
        method: VK_API_METHODS.USERS_GET,
        params: {
          user_ids: Object.keys(receiverFriendIds).join(','),
          fields: 'photo_100',
          v: API_VERSION,
          access_token: window[Token],
        },
      })
      .then(result => {
        this.setState({
          avatars: normalizeAvatars(result.data.response),
        });
      })
      .catch(console.log);
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
    const {
      match: {
        params: { id: friendId },
      },
    } = this.props;
    switch (type.title) {
      case PROFILE_PAGE_TYPE.USER_WISHES:
        return {
          normalizer: id => ({
            info: this.props.userWishes[id],
            onButtonClick: productId => async () => {
              this.props.deleteUserWish(productId);
            },
          }),
          wishesIds: this.props.userWishesIds,
        };
      case PROFILE_PAGE_TYPE.USER_GIFTS:
        this.getAvatars();
        const { avatars } = this.state;
        return {
          normalizer: id => {
            const { receiverFriendId } = this.props.userGifts[id];
            return {
              info: {
                ...this.props.userGifts[id],
                avatar: avatars[receiverFriendId],
              },
              onButtonClick: productId => async () => {
                this.props.refuseGiveGiftToFriend(productId, receiverFriendId);
              },
            };
          },
          wishesIds: this.props.userGiftsIds,
        };
      case PROFILE_PAGE_TYPE.FRIEND_WISHES:
        return {
          normalizer: id => {
            const {
              friendWishReserved,
              reservedByMe,
            } = this.props.friendWishes[id];
            const onButtonClick = friendWishReserved
              ? reservedByMe
                ? productId => async () =>
                    this.props.refuseGiveGiftToFriend(productId, friendId)
                : () => null
              : productId => async () =>
                  this.props.giveGiftToFriend(productId, friendId);
            return {
              onButtonClick,
              onEmojiClick: productId => async () => {
                const result = await Requester.post(API.addUserWish(), {
                  product_id: productId,
                });

                if (result.response) {
                  this.props.getFriendWishes(friendId);
                  this.props.getUserWishes();
                }
              },
              info: this.props.friendWishes[id],
            };
          },
          wishesIds: this.props.friendWishesIds,
        };
      case PROFILE_PAGE_TYPE.FRIEND_GIFTS:
        return {
          normalizer: id => ({
            info: this.props.friendGifts[id],
            onButtonClick: productId => async () => {
              this.props.refuseGiveGiftToFriend(productId, friendId);
            },
            onEmojiClick: productId => async () => {
              const result = await Requester.post(API.addUserWish(), {
                product_id: productId,
              });

              if (result.response) {
                this.props.getUserWishes();
              }
            },
          }),
          wishesIds: this.props.friendGiftsIds,
        };
      default:
        return {
          normalizer: () => ({
            info: {},
            onButtonClick: () => {},
          }),
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
      this.setState({
        type,
      });
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

  giveGiftToFriend: actionGiveGiftToFriend,
  refuseGiveGiftToFriend: actionRefuseGiveGiftToFriend,

  deleteUserWish: actionDeleteUserWish,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
