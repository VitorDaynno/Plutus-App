import React from 'react';
import ReactDOM from 'react-dom';
import Cab from './components/topHeader';
import Menu from './components/mainMenu';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Login from './login';
import Home from './components/home'
import registerServiceWorker from './registerServiceWorker';
import Transactions from './components/transactions';
import { Layout, } from 'antd';

const { Header, Sider, Content } = Layout;

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <div className="container-plutus">
                    <Header>
                        <Cab />
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu />
                        </Sider>
                        <Content>
                            <Route exact path='/home' component={Home} />
                            <Route exact path='/transactions' component={Transactions} />
                        </Content>
                    </Layout>
                </div>
            </Switch>
        </Router>), document.getElementById('app'));

registerServiceWorker()
