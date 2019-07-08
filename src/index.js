import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App'
import * as serviceWorker from './utils/serviceWorker/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();