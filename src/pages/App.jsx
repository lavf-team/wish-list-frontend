import React from 'react';
import logo from '../img/logo.svg';
import styles from './App.module.scss';
import classNames from '../libs/classNames';
import MyPage from './MyPage'
import FriendPage from './FriendPage';

const cn = classNames(styles);

function App() {
  return (
    <div className={cn('App')}>
        <MyPage/>
        {/*<FriendPage/>*/}
    </div>
  );
}

export default App;
