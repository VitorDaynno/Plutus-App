import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Layout } from 'antd';

import TopHeader from './components/topHeader';
import Menu from './components/mainMenu';
import Login from './login';
import registerServiceWorker from './registerServiceWorker';
import Transactions from './components/transaction/transactions';
import Accounts from './components/account';

import './assets/css/index.css';

const { Header, Sider, Content } = Layout;

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

let isCollapsed = width <= 768 ? true : false;

ReactDOM.render(
  (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <div className="container-plutus">
          <Header className="header">
            <TopHeader />
          </Header>
          <Layout>
            <Sider collapsed={isCollapsed}>
              <Menu />
            </Sider>
            <Content className="content">
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/accounts" component={Accounts} />
            </Content>
          </Layout>
        </div>
      </Switch>
    </Router>), document.getElementById('app')
);

registerServiceWorker();
