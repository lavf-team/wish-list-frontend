import React from 'react';
import Header from '../../components/Header';
import styles from './OtherUserPage.module.scss';
import User from '../../components/User';
import img1 from '../..//img/drooling.png';
import img2 from '../..//img/glasses.png';
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
                    text1={'Хочет получить'}
                    img1={img1}
                    text2={'Хочу подарить'}
                    img2={img2}
                />
                <div className={styles.items}>gifts</div>
            </div>

        );
    }

}
