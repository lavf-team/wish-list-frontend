import React from 'react';
import logo from '../img/logo.svg';
import styles from './App.module.scss';
import classNames from '../libs/classNames';

const cn = classNames(styles);

function App() {
  return (
    <div className={cn('App')}>
      <header className={cn('App-header')}>
        <img src={logo} className={cn('App-logo')} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={cn('App-link')}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
