import React from 'react';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
import { Pages } from '../../pages/config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        const { user : { name, surname, avatar }, page} = this.props;
        const isMobile = window.getIsMobile();

        return (
            <div className={cn('header')}>
                {(page !== Pages.PROFILE) && (
                    <div className={cn('header__user-profile')}>
                        <Avatar avatar={avatar}/>
                        <button className={cn('header__nickname')}>{isMobile ? name : `${name} ${surname}`}</button>
                    </div>)}
                {(page !== Pages.WISH_LIST) && (
                    <button className={cn('header__back-link')}>
                        { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                    </button>
                )}
                {(page !== Pages.FRIENDS) && <div>Мои друзья</div>}
            </div>
        );
    }
}