import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Form from './Form';
import Admin from './Admin';

ReactDOM.render((
    <HashRouter>
    <div>
        <Route exact path="/"component={App} />
        <Route path="/Login" component={Login} />
        <Route path="/Form" component={Form} />
        <Route path="/Admin" component={Admin} />
    </div>
</HashRouter>), document.getElementById('root'));

