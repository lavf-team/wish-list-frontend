import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import defaultUser from '../img/defaultUser.jpg';
import WishListPage from "./WishListPage/WishListPage";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { route } from '../utils/matchUrl';
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
        },
        avatars: [
            defaultUser,
            defaultUser,
            defaultUser,
        ]
    };

    render() {
        const { user, avatars } = this.state;
        return (
            <BrowserRouter>
                <div className={cn('app')}>
                    <Route path={route.FRIENDS.url}
                           render={(props) => <FriendsPage {...props} user={user}/>}
                    />
                    <Route
                        path={route.WISH_LIST.url}
                        render={(props) =>
                            <WishListPage
                                {...props}
                                avatars={avatars}
                                user={user}/>}
                    />
                    <Route
                        path={route.PROFILE.url}
                        render={(props) =>
                            <ProfilePage
                                {...props}
                                avatars={avatars}
                                user={user}/>}
                    />
                    <Redirect to='/wish-list'/>
                </div>
            </BrowserRouter>
        );
    }
}
