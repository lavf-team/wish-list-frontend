import React from 'react';
import styles from './FriendsPage.module.scss';
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import defaultUser from '../../img/defaultUser.jpg';
import Friend from "../../components/Friend/Friend";
import SimpleButton from '../../components/buttons/SimpleButton';
import { buttonStyles } from '../../components/buttons/SimpleButton/config.ts';
import Header from '../../components/Header';
import Tip from '../../components/Tip';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);


export default class FriendsPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: window.getIsMobile() ?
                'Введите имя друга' :
                'Начни вводить имя своего друга',
            value: '',
        },
        isLoad: false,
        friends: [
            // {
            // name: 'Сергей Чернобровкин',
            // avatar: defaultUser,
            // },
            // {
            //     name: 'Сергей Чернобровкин',
            //     avatar: defaultUser,
            // },
            // {
            //     name: 'Сергей Чернобровкин',
            //     avatar: defaultUser,
            // },
            // {
            //     name: 'Сергей Чернобровкин',
            //     avatar: defaultUser,
            // }
        ],
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
        const { user } = this.props;
        const {
            input : { placeholder, type, value },
            isLoad,
            friends,
            hasMore,
        } = this.state;
        return (
            <div className={cn('friends-page')}>
                <Header user={user} />
                <div className={cn('friends-page__title')}>Мои друзья 😜</div>
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={cn('friends-page__input')}
                    onChange={this.handleChangeValue}
                />
                {isLoad && (<Loader className={cn('friends-page__loader')} />)}
                {(!isLoad && !!friends.length) ? (
                    <div className={cn('friends-page__friends')}>
                        {friends.map(({name, avatar}) =>
                            (<Friend
                                name={name}
                                avatar={avatar}
                                className={cn('friends-page__friend')}
                            />))}
                        {hasMore && (
                            <div className={cn('friends-page__btn-container')}>
                                <SimpleButton
                                    text={'Показать еще'}
                                    style={buttonStyles.LIGHT}
                                />
                            </div>)}
                    </div>
                ) : (<Tip
                    className={cn('friends-page__tip')}
                    text={'Кажется, у тебя нет друзей'}
                />)}
            </div>
        );
    }
}