import React, { Component } from 'react';
import axios from 'axios';
import {
  Drawer,
  Tabs,
} from 'antd';

import Transaction from './transaction';
import '../../assets/css/transactionDrawer.css';

const { TabPane } = Tabs;

const panels = [
  {
    key: 1,
    title: "Despesa"
  }, {
    key: 2,
    title: "Receita"
  }
]

class TransactionDrawer extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    this.getAccounts();
  }
  
  getAccounts() {
    const token = localStorage.getItem('token');
    const { history } = this.props;

    axios.get('/v1/accounts', { headers: { Authorization: `Bearer ${token}` } } )
      .then(res => this.setState({ accounts: res.data }))
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
  }

  changeDescription = (e) => {
    let description = e.target.value;
    const { transaction } = this.state;
    transaction.description = description;
    this.setState({ transaction });
  }

  changeDate = (e) => {
    let date = e;
    const { transaction } = this.state;
    transaction.date = date;
    this.setState({ date });
  }

  changeValue = (e) => {
    let value = e;
    const { transaction } = this.state;
    transaction.value = value;
    this.setState({ transaction });
  }
  
  render() { 

    if(this.props.transaction !== this.state.transaction) {
      const transaction = this.props.transaction;
      this.setState({transaction})
    }

    const { visible, onClose,  title, activeTab } = this.props ;
    const { accounts, transaction } = this.state;

    return (
      <div>
        <Drawer
          title={title}
          placement="right"
          width="50%"
          closable="true"
          onClose={onClose}
          visible={visible}
        >
          <Tabs defaultActiveKey={activeTab}>
            { panels.map((panel) => {
              return (
                <TabPane tab={panel.title} key={panel.key}>
                  <Transaction 
                    onClose={onClose} 
                    type={panel.key} 
                    transaction={transaction} 
                    accounts={accounts}
                    changeValue={this.changeValue}
                    changeDescription={this.changeDescription}
                    changeDate={this.changeDate}/>
                </TabPane>
              )
            })}
          </Tabs>
        </Drawer>
      </div>
    );
  }
}

export default TransactionDrawer;
