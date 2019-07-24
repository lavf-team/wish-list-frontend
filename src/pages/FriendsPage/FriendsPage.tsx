import React from 'react';
import { connect } from 'react-redux';

import { buttonStyles } from 'components/buttons/config';
import RoundButton from 'components/buttons/RoundButton';
import SimpleButton from 'components/buttons/SimpleButton';
import Friend from 'components/Friend';
import Header from 'components/Header';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Tip from 'components/Tip';
import { IInput } from 'config/interfaces';
import tongueEmojiUrl from 'img/tongueEmoji.svg';
import { LOADED_FRIENDS_NUMBER } from 'store/config';
import { actionInitFriends } from 'store/friendsStore/actions';
import { getIsMobile } from 'utils/checkIsMobile';

import './FriendsPage.module.scss';

interface IProps {
  friendsIds: Array<number>;
  hasMore: boolean;
  offset: number;
  allFriendsNumber: number;

  loadFriends: (offset: number, friendsNumber: number) => void;
}

interface IState {
  input: IInput;
  isLoad: boolean;
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
    isLoad: false,
  };

  handleChangeValue = value => {
    this.setState({
      input: {
        ...this.state.input,
        value,
      },
    });
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
      isLoad,
    } = this.state;
    const isMobile = getIsMobile();
    const { friendsIds, hasMore } = this.props;

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
        {!isLoad && !!friendsIds.length ? (
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
        ) : isLoad ? (
          <div styleName="friends-page__loader-container">
            <Loader />
          </div>
        ) : (
          <Tip
            styleName="friends-page__tip"
            text={'Кажется, у тебя нет друзей'}
          />
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
});

const mapDispatchToProps = dispatch => ({
  loadFriends: (offset, count) => dispatch(actionInitFriends(offset, count)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsPage);
