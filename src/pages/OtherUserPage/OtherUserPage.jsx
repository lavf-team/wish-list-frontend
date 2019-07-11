import React from 'react';
import Header from '../../components/Header';
import styles from './OtherUserPage.module.scss';
import User from '../../components/User';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class MyPage extends React.Component {

    render() {
        const { curUser, friend } = this.props;
        return (
            <div>
                <Header user={curUser} />
                <User
                    name={friend.name}
                    surname={friend.surname}
                    avatar={friend.avatar}
                    text1={'Хочет получить 🤤'}
                    text2={'Хочу подарить 😎'}
                />
                <div className={styles.items}>gifts</div>
            </div>

        );
    }

}
