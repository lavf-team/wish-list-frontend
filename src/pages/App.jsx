import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import { Pages } from './config.ts';
import defaultUser from '../img/defaultUser.jpg';
import WishListPage from "./WishListPage/WishListPage";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class App extends React.Component {
    state = {
        curPage: Pages.WISH_LIST,
        user: {
            name: 'Антон',
            surname: 'Чащин',
            avatar: defaultUser
        }
    };

    render() {
        const { curPage, user } = this.state;
        return (
            <div className={cn('app')}>
                {curPage === Pages.FRIENDS && <FriendsPage user={user}/>}
                {curPage === Pages.WISH_LIST && <WishListPage user={user}/>}
            </div>
        );
    }
}
