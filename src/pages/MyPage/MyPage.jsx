import React from 'react';
import Header from '../../components/Header';
import styles from './MyPage.module.scss';
import User from '../../components/User';
import img1 from '../..//img/relieved.png';
import img2 from '../..//img/glasses.png';


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
                    text1={'Хочу получить'}
                    img1={img1}
                    text2={'Хочу подарить'}
                    img2={img2}
                />
                <div className={styles.items}>gifts</div>
            </div>

        );
    }

}
