import React from 'react';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
import { Link, withRouter } from 'react-router-dom';
import matchUrl, { Pages } from '../../utils/matchUrl';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class Header extends React.Component {
    render() {
        const {
            user : { name, surname, avatar },
            avatars = [],
            match : { url },
            className,
        } = this.props;
        const isMobile = window.getIsMobile();
        const page = matchUrl(url);
        const headerClassName = `${className} ${cn('header')}`;

        return (
            <div className={headerClassName}>
                {(page !== Pages.PROFILE.title) && (
                    <div className={cn('header__user-profile')}>
                        <Avatar avatar={avatar}/>
                        <a className={cn('header__nickname')}>{isMobile ? name : `${name} ${surname}`}</a>
                    </div>)}
                {(page !== Pages.WISH_LIST.title) && (
                    <Link
                        to={{
                            pathname: '/wish-list',
                            state: {page: Pages.WISH_LIST}
                        }}
                          className={cn('header__back-link')}>
                        { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                    </Link>
                )}
                {(page !== Pages.FRIENDS.title) &&
                (<div className={cn('header__friends')}>
                    <Link to='/friends' state={'opa'} className={cn('header__friends-title')}>
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

export default withRouter(Header);