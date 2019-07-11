import React from 'react';
import styles from './Header.module.scss';


function Header() {
    return (
        <div className={styles.header}>
            <div>Вернуться к поиску</div>
            <div className={styles.header_right}>
                Мои друзья
            </div>
        </div>
    );
}

export default Header;
