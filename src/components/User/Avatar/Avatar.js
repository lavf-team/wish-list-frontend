import React from 'react';
import styles from './Avatar.module.scss'
import ava from '../../../img/default-avatar.png';

function Avatar() {
    return (
        <div className={styles.display}>
            <img src={ava}
                 className={styles.big}
                 alt=""/>
        </div>
    );
}

export default Avatar;
