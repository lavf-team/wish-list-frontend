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
                <Header user={user} />
                <User
                    name={user.name}
                    surname={user.surname}
                    avatar={user.avatar}
                    className={cn('friends-page__friend')}
                />
                <div className={styles.items}>gifts</div>
            </div>

        );
    }

}
