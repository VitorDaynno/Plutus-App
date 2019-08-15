import React, { Component } from 'react';
import {
  Tabs,
  Row,
  Col,
  Button,
} from 'antd';
import axios from 'axios';
import '../../assets/css/transactions.css';
import NewTransaction from './newTransactions';
import TransactionsTable from './transactionsTable';

const { TabPane } = Tabs;

class Transactions extends Component {
  constructor() {
    super();
    const self = this;
    self.state = {
      data: null,
      visible: false,
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

  getTransactions(params = '') {
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

  showDrawer = () => {
    this.setState({ visible: true });
  }

  changedData(key) {
    switch (key) {
      case 2:
        this.getTransactions('?onlyCredit=1');
        break;
      case 3:
        this.getTransactions('?onlyCredit=0');
        break;
      default:
        this.getTransactions('');
        break;
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Row>
          <Col className="transaction-row">
            <Button onClick={this.showDrawer}>
              Nova
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <Tabs defaultActiveKey="1" onChange={this.changedData}>
              <TabPane tab="Geral" key="1">
                <TransactionsTable data={data} />
              </TabPane>
              <TabPane tab="Crédito" key="2">
                <TransactionsTable data={data} />
              </TabPane>
              <TabPane tab="Outros" key="3">
                <TransactionsTable data={data} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <NewTransaction
          onClose={this.onClose}
          visible={this.state.visible}		
        />
      </div>
    );
  }
}

export default Transactions;
