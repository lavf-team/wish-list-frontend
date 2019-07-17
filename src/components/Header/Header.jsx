import React from 'react';
import { connect } from 'react-redux';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
import { Link, withRouter } from 'react-router-dom';
import matchUrl, { route } from '../../utils/matchUrl';
import {actionInitFriends} from "../../store/friendsStore/actions";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class Header extends React.Component {
    getAvatars = () => {
        const {
            friendsIds,
            friends, } = this.props;
        const avatars = [];

        for (let i = 0; i < 3; ++i) {
            avatars.push(friends[friendsIds[i]].avatar);
        }
        return avatars;
    };

    componentDidMount() {
        this.props.initFriends();
    }

    render() {
        const {
            user : { name, surname, avatar },
            match : { url },
            className,
            friendsIds,
        } = this.props;
        const isMobile = window.getIsMobile();
        const page = matchUrl(url);
        const headerClassName = `${className} ${cn('header')}`;
        const avatars = !!friendsIds.length ? this.getAvatars() : [];

        return (
            <div className={headerClassName}>
                {(page !== route.PROFILE.title) && (
                    <div className={cn('header__user-profile')}>
                        <Avatar avatar={avatar}/>
                        <Link
                            to={route.PROFILE.url}
                            className={cn('header__nickname')}>{isMobile ? name: `${name} ${surname}`}</Link>
                    </div>)}
                {(page !== route.WISH_LIST.title) && (
                    <Link
                        to={route.WISH_LIST.url}
                        className={cn('header__back-link')}>
                        { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                    </Link>
                )}
                {(page !== route.FRIENDS.title) &&
                (<div className={cn('header__friends')}>
                    <Link
                        to={route.FRIENDS.url}
                        className={cn('header__friends-title')}
                    >
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

const mapStateToProps = state => ({
    user: state.user,
    friendsIds: state.friendsIds,
    friends: state.friends,
});

const mapDispatchToProps = dispatch => ({
    initFriends: () => dispatch(actionInitFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));