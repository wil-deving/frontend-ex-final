import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/';
import * as serviceWorker from './serviceWorker';

const MAIN_NODE = document.getElementById('global_container')

ReactDOM.render(
    <App />,
    MAIN_NODE
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
