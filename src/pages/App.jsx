import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import { Pages } from './config.ts';
import defaultUser from '../img/defaultUser.jpg';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class App extends React.Component {
    state = {
        curPage: Pages.FRIENDS,
        user: {
            nickname: 'Антон Чащин',
            avatar: defaultUser
        }
    };

    render() {
        const { curPage, user } = this.state;
        return (
            <div className={cn('app')}>
                {curPage === Pages.FRIENDS && <FriendsPage user={user}/>}
            </div>
        );
    }
}
