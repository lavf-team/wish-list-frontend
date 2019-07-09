import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import App from './pages'
import * as serviceWorker from './utils/serviceWorker/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();