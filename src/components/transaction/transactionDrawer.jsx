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
      accounts: [],
      inputCategoryVisible: false,
      installmentsVisible: false
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

  changeTime = (e) => {
    let time = e;
    const { transaction } = this.state;
    transaction.time = time;
    this.setState({ transaction });
  }

  changeValue = (e) => {
    let value = e;
    const { transaction } = this.state;
    transaction.value = value;
    this.setState({ transaction });
  }

  changeAccount = (e) => {
    let account = e;

    const { accounts } = this.state;
    account = accounts.filter(function(i){
      return i.id === account
    })

    const { transaction } = this.state;
    transaction.account = account[0];

    this.setState({ transaction });

    this.changeStatusInstallments(account[0])
  }

  changeStatusInstallments = (account) => {
    let installmentsVisible = false;
    if(account.type === 'credit') {
      installmentsVisible = true;
    } else {
      installmentsVisible = false;
    }
    this.setState({installmentsVisible, installments: null })
  }

  changeInstallments = (e) => {
    const installments = e;
    const { transaction } = this.state;
    transaction.installments = installments;
    this.setState({ transaction });
  }

  showInputCategory = () => {
    this.setState({ inputCategoryVisible: true });
  }

  inputCategoryChange = (e) => {
    const category = e.target.value;
    this.setState({ inputCategoryValue: category });
  }
  
  render() { 

    if(this.props.transaction !== this.state.transaction) {
      const transaction = this.props.transaction;
      this.setState({transaction})
    }

    const { visible, onClose,  title, activeTab } = this.props;
    const { 
      accounts,
      transaction, 
      installmentsVisible, 
      inputCategoryValue, 
      inputCategoryVisible
    } = this.state;

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
                    installmentsVisible={installmentsVisible}
                    inputCategoryValue={inputCategoryValue}
                    inputCategoryVisible={inputCategoryVisible}
                    changeValue={this.changeValue}
                    changeDescription={this.changeDescription}
                    changeDate={this.changeDate}
                    changeTime={this.changeTime}
                    changeAccount={this.changeAccount}
                    changeInstallments={this.changeInstallments}
                    showInputCategory={this.showInputCategory}
                    inputCategoryChange={this.inputCategoryChange}
                  />
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
