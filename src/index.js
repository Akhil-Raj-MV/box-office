import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App />    
    </HashRouter>
);
serviceWorkerRegistration.register();