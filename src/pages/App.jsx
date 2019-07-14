import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import defaultUser from '../img/defaultUser.jpg';
import WishListPage from "./WishListPage/WishListPage";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class App extends React.Component {
    state = {
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
<<<<<<< HEAD
        const { curPage, user, friend } = this.state;
        return (
            <div className={cn('app')}>
                {curPage === Pages.FRIENDS && <FriendsPage user={user}/>}
                {curPage === Pages.MYPAGE && <MyPage user={user}/>}
                {curPage === Pages.OTHERUSER && <OtherUserPage curUser={user}
                                                                   friend={friend} />}
            </div>
=======
        const { user } = this.state;
        return (
            <BrowserRouter>
                <div className={cn('app')}>
                    <Route path='/friends'
                           render={(props) => <FriendsPage {...props} user={user}/>}
                    />
                    <Route
                        path='/wish-list'
                        render={(props) => <WishListPage {...props} user={user}/>}
                    />
                    <Redirect to='/wish-list'/>
                </div>
            </BrowserRouter>
>>>>>>> development
        );
    }
}
