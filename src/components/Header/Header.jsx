import React from 'react';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
import { Pages } from '../../pages/config.ts';
import { Link } from 'react-router-dom';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        const {
            user : { name, surname, avatar },
            page,
            avatars = [],
        } = this.props;
        const isMobile = window.getIsMobile();

        return (
            <div className={cn('header')}>
                {(page !== Pages.PROFILE) && (
                    <div className={cn('header__user-profile')}>
                        <Avatar avatar={avatar}/>
                        <a className={cn('header__nickname')}>{isMobile ? name : `${name} ${surname}`}</a>
                    </div>)}
                {(page !== Pages.WISH_LIST) && (
                    <Link to='/wish-list' className={cn('header__back-link')}>
                        { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                    </Link>
                )}
                {(page !== Pages.FRIENDS) &&
                (<div className={cn('header__friends')}>
                    <Link to='/friends' className={cn('header__friends-title')}>
                        {isMobile ? 'Друзья' : 'Мои друзья'}
                    </Link>
                    {!isMobile && avatars.length ? (
                        <div className={cn('header__friends-avatars')}>
                            {avatars.map((avatar, i) => (
                                <Avatar
                                    key={i}
                                    avatar={avatar}
                                    className={cn('header__friend-avatar')}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>)
                }
            </div>
        );
    }
}