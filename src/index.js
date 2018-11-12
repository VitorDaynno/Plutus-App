import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Login from './login';
import Home from './components/home'
import registerServiceWorker from './registerServiceWorker';
import Transactions from './components/transactions';

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/transactions' component={Transactions} />
            </Switch>
        </Router>), document.getElementById('app'));
        
registerServiceWorker()
 