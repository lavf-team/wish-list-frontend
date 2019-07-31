import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { buttonStyles } from 'components/buttons/config';
import RoundButton from 'components/buttons/RoundButton';
import SimpleButton from 'components/buttons/SimpleButton';
import Friend from 'components/Friend';
import Header from 'components/Header';
import Input from 'components/Input';
import Loader from 'components/Loader';
import { loaderSizes } from 'components/Loader/config';
import Tip from 'components/Tip';
import { IInput } from 'config/interfaces';
import tongueEmojiUrl from 'img/tongueEmoji.svg';
import { LOADED_FRIENDS_NUMBER } from 'store/config';
import {
  actionInitFriends,
  actionSearchFriends,
  actionSearchFriendsInit,
} from 'store/friendsStore/actions';
import { getIsMobile } from 'utils/checkIsMobile';

import './FriendsPage.module.scss';

interface IProps {
  friendsIds: Array<number>;
  searchFriendsIds: Array<number>;
  hasMore: boolean;
  offset: number;
  allFriendsNumber: number;
  isInitLoading: boolean;
  isSearchLoading: boolean;

  loadFriends: (offset: number, friendsNumber: number) => void;
  searchFriendsInit: () => void;
  searchFriends: (value: string) => void;
}

interface IState {
  input: IInput;
  isSearch: boolean;
}

class FriendsPage extends React.Component<IProps, IState> {
  state = {
    input: {
      type: 'text',
      placeholder: getIsMobile()
        ? 'Введите имя друга'
        : 'Начни вводить имя своего друга',
      value: '',
    },
    isSearch: false,
  };

  searchFriends = _.debounce(value => {
    this.props.searchFriendsInit();
    this.props.searchFriends(value);
  }, 500);

  handleChangeValue = value => {
    this.setState({
      input: {
        ...this.state.input,
        value,
      },
      isSearch: !!value,
    });

    this.searchFriends(value);
  };

  handleClick = () => {
    const { offset, allFriendsNumber } = this.props;
    const friendsNumber =
      allFriendsNumber - offset < LOADED_FRIENDS_NUMBER
        ? allFriendsNumber - offset
        : LOADED_FRIENDS_NUMBER;

    this.props.loadFriends(offset, friendsNumber);
  };

  render() {
    const {
      input: { placeholder, type, value },
      isSearch,
    } = this.state;
    const isMobile = getIsMobile();
    const {
      friendsIds,
      hasMore,
      isInitLoading,
      isSearchLoading,
      searchFriendsIds,
    } = this.props;

    const hasLoader =
      (!isSearch && isInitLoading) || (isSearch && isSearchLoading);
    const hasNoFriends =
      (!isSearch && !isInitLoading && !friendsIds.length) ||
      (isSearch && !isSearchLoading && !searchFriendsIds.length);
    const hasNoFriendsTitle = isSearch ? 'такого друга' : 'друзей';

    return (
      <>
        <Header styleName="friends-page__header" />
        <div styleName="friends-page__title">
          Мои друзья
          <img styleName="friends-page__tongue-emoji" src={tongueEmojiUrl} />
        </div>
        <div styleName="friends-page__input-container">
          <Input
            placeholder={placeholder}
            type={type}
            value={value}
            styleName="friends-page__input"
            onChange={this.handleChangeValue}
          />
        </div>
        {!isSearch && !isInitLoading && !!friendsIds.length && (
          <div styleName="friends-page__friends">
            {friendsIds.map((friendId, i) => (
              <Friend
                key={i}
                friendId={friendId}
                styleName="friends-page__friend"
              />
            ))}
            {hasMore && (
              <div styleName="friends-page__btn-container">
                {isMobile ? (
                  <RoundButton
                    onClick={this.handleClick}
                    text={'Загрузить еще'}
                  />
                ) : (
                  <SimpleButton
                    onClick={this.handleClick}
                    text={'Показать еще'}
                    style={buttonStyles.LIGHT}
                  />
                )}
              </div>
            )}
          </div>
        )}
        {isSearch && !isSearchLoading && !!searchFriendsIds.length && (
          <div styleName="friends-page__friends">
            {searchFriendsIds.map((friendId, i) => (
              <Friend
                key={i}
                friendId={friendId}
                styleName="friends-page__friend"
                isSearch={isSearch}
              />
            ))}
          </div>
        )}
        {hasNoFriends && (
          <Tip
            styleName="friends-page__tip"
            text={`Кажется, у тебя нет ${hasNoFriendsTitle}`}
          />
        )}
        {hasLoader && (
          <div styleName="friends-page__loader-container">
            <Loader size={loaderSizes.LARGE} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  friendsIds: state.friends.friendsIds,
  hasMore: state.friends.hasMore,
  offset: state.friends.offset,
  allFriendsNumber: state.friends.allFriendsNumber,
  isInitLoading: state.friends.isLoading,
  searchFriendsIds: state.friends.searchFriendsIds,
  isSearchLoading: state.friends.isSearchLoading,
});

const mapDispatchToProps = dispatch => ({
  loadFriends: (offset, count) => dispatch(actionInitFriends(offset, count)),
  searchFriendsInit: () => dispatch(actionSearchFriendsInit()),
  searchFriends: value => dispatch(actionSearchFriends(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsPage);
