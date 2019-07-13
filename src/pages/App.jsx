import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import MyPage from './MyPage';
import OtherUserPage from './OtherUserPage';
import { Pages } from './config.ts';
import defaultUser from '../img/defaultUser.jpg';
import Friend from "../components/Friend";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class App extends React.Component {
    state = {
        curPage: Pages.MYPAGE,
        user: {
            name: 'Антон',
            surname: 'Чащин',
            avatar: defaultUser
        },
        friend: {
            name: 'Сергей',
            surname: 'Чернобровкин',
            avatar: defaultUser
        }
    };

    render() {
        const { curPage, user, friend } = this.state;
        return (
            <div className={cn('app')}>
                {curPage === Pages.FRIENDS && <FriendsPage user={user}/>}
                {curPage === Pages.MYPAGE && <MyPage user={user}/>}
                {curPage === Pages.OTHERUSER && <OtherUserPage curUser={user}
                                                                   friend={friend} />}
            </div>
        );
    }
}
