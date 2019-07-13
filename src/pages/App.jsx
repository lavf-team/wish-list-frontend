import React from 'react';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import defaultUser from '../img/defaultUser.jpg';
import WishListPage from "./WishListPage/WishListPage";
import {BrowserRouter, Route} from 'react-router-dom';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class App extends React.Component {
    state = {
        user: {
            name: 'Антон',
            surname: 'Чащин',
            avatar: defaultUser
        }
    };

    render() {
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
                </div>
            </BrowserRouter>
        );
    }
}
