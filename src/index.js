import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Layout, } from 'antd';

import TopHeader from './components/topHeader';
import Menu from './components/mainMenu';
import Login from './login';
import Home from './components/home'
import registerServiceWorker from './registerServiceWorker';
import Transactions from './components/transactions';

import './assets/css/index.css';

const { Header, Sider, Content } = Layout;

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <div className="container-plutus">
                    <Header className="header">
                        <TopHeader />
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu/>
                        </Sider>
                        <Content className="content">
                            <Route exact path='/home' component={Home} />
                            <Route exact path='/transactions' component={Transactions} />
                        </Content>
                    </Layout>
                </div>
            </Switch>
        </Router>), document.getElementById('app'));

registerServiceWorker()
