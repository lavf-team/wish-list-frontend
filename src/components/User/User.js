import React from 'react';
import Avatar from './Avatar';
import styles from './User.module.scss';

function User() {
    return (
        <div className={styles.user}>
            <Avatar/>
            <div className={styles.text}>
                <p className={styles.name}>Антон Чащин</p>
                <div className={styles.wants}>
                    <div>Хочу подарить</div>
                    <div>Хочу получить</div>
                </div>
                <div>Кнопка</div>
            </div>
        </div>
    );
}

export default User;
