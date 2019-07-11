import React from 'react';
import User from '../../components/User';
import Header from '../../components/Header';
import styles from './MyPage.module.scss';


function MyPage() {
    return (
        <div>
            <Header/>
            <User/>
            <div className={styles.items}>gifts</div>
        </div>

    );
}

export default MyPage;
