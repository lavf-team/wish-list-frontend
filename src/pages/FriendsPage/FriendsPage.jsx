import React from 'react';
import { connect } from 'react-redux';
import styles from './FriendsPage.module.scss';
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Friend from "../../components/Friend/Friend";
import SimpleButton from '../../components/buttons/SimpleButton';
import { buttonStyles } from '../../components/buttons/config.ts';
import Header from '../../components/Header';
import Tip from '../../components/Tip';
import RoundButton from "../../components/buttons/RoundButton/RoundButton";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);


class FriendsPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: window.getIsMobile() ?
                'Введите имя друга' :
                'Начни вводить имя своего друга',
            value: '',
        },
        isLoad: false,
        hasMore: true,
    };

    handleChangeValue = (value) => {
        this.setState({
            input: {
                ...this.state.input,
                value,
            }
        })
    };

    render() {
        const {
            input : { placeholder, type, value },
            isLoad,
            hasMore,
        } = this.state;
        const isMobile = window.getIsMobile();
        const { friendsIds } = this.props;

        return (
            <div className={cn('friends-page')}>
                <Header
                    className={cn('friends-page__header')}
                />
                <div className={cn('friends-page__title')}>Мои друзья 😜</div>
                <div className={cn('friends-page__input-container')}>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        className={cn('friends-page__input')}
                        onChange={this.handleChangeValue}
                    />
                </div>
                {(!isLoad && !!friendsIds.length) ? (
                    <div className={cn('friends-page__friends')}>
                        {friendsIds.map((friendId, i) =>
                            (<Friend
                                key={i}
                                friendId={friendId}
                                className={cn('friends-page__friend')}
                            />))}
                        {hasMore && (
                            <div className={cn('friends-page__btn-container')}>
                                {isMobile ? (
                                    <RoundButton
                                        text={'Загрузить еще'}
                                    />) : (
                                        <SimpleButton
                                            text={'Показать еще'}
                                            style={buttonStyles.LIGHT}
                                        />
                                       )
                                }
                            </div>)}
                    </div>
                ) : isLoad ?
                    (<div className={cn('friends-page__loader-container')}>
                        <Loader />
                    </div>) :
                    (<Tip
                        className={cn('friends-page__tip')}
                        text={'Кажется, у тебя нет друзей'}
                    />)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    friendsIds: state.friends.friendsIds
});

export default connect(mapStateToProps)(FriendsPage)