import React, { Component } from 'react';
import {
  Tabs,
  Row,
  Col,
  Button,
} from 'antd';
import axios from 'axios';
import '../../assets/css/transactions.css';
import TransactionDrawer from './transactionDrawer';
import TransactionsTable from './transactionsTable';

const { TabPane } = Tabs;

class Transactions extends Component {

  constructor() {
    super();
    const self = this;
    self.state = {
      data: null,
      visible: false
    };
  }

  componentDidMount() {
    this.getTransactions();
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.getTransactions();
  }

  getTransactions = (params='') => {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const url = `/v1/transactions${params}`;
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
  }

  showDrawer = (title, transaction={}, tab) => {
    this.setState({ visible: true, transaction, title, tab });
  }

  changedData = (key) => {
    switch (key) {
      case '2':
        this.getTransactions('?onlyCredit=1');
        break;
      default:
        this.getTransactions('');
        break;
    }
  }

  render() {
    const { data } = this.state;
    const { history } = this.props;
    
    return (
      <div>
        <Row>
          <Col className="transaction-row">
            <Button onClick={() => this.showDrawer("Nova Transação", {})}>
              Nova
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <Tabs defaultActiveKey="1" onChange={this.changedData}>
              <TabPane tab="Geral" key="1">
                <TransactionsTable data={data} history={history} getTransactions={() => this.getTransactions('')} showDrawer={this.showDrawer}/>
              </TabPane>
              <TabPane tab="Crédito" key="2">
                <TransactionsTable data={data} history={history} getTransactions={() => this.getTransactions('?onlyCredit=1')} showDrawer={this.showDrawer}/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <TransactionDrawer
          title={this.state.title}
          onClose={this.onClose}
          visible={this.state.visible}
          transaction={this.state.transaction}
          activeTab={this.state.tab}
          history={history}
        />
      </div>
    );
  }
}

export default Transactions;
