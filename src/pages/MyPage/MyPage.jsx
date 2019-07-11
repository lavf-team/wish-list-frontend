import React from 'react';
import Header from '../../components/Header';
import styles from './MyPage.module.scss';
import User from '../../components/User';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class MyPage extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div>
                <Header page='MYPAGE' user={user} />
                <User
                    name={user.name}
                    surname={user.surname}
                    avatar={user.avatar}
                    text1={'Хочу получить 😌'}
                    text2={'Хочу подарить 😎'}
                />
                <div className={styles.items}>gifts</div>
            </div>

        );
    }

}
