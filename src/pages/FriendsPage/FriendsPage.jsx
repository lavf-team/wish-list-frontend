import React from 'react';
import styles from './FriendsPage.module.scss';
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);


export default class FriendsPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: 'Начни вводить имя своего друга',
            value: '',
        },
        isLoad: true,
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
        const { input : { placeholder, type, value }, isLoad} = this.state;
        return (
            <div className={cn('friends-page')}>
                <div className={cn('friends-page__header')}>
                    <Avatar avatar={user.avatar}/>
                    <a className={cn('friends-page__nickname')}>{user.nickname}</a>
                    <a className={cn('friends-page__back-button')}>Вернуться к поиску</a>
                </div>
                <div className={cn('friends-page__title')}>Мои друзья 😜</div>
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={cn('friends-page__input')}
                    onChange={this.handleChangeValue}
                />
                {isLoad && (<Loader className={cn('friends-page__loader')} />)}
            </div>
        );
    }
}