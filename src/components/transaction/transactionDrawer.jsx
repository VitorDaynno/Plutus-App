import React, { Component } from 'react';
import axios from 'axios';
import {
  Drawer,
  Tabs,
  message
} from 'antd';
import moment from 'moment';

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
      categories: [],
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

  inputCategoryConfirm = () => {
    const { state } = this;
    const { transaction, inputCategoryValue } = state;
    let categories = transaction.categories ? transaction.categories : [];
    if (inputCategoryValue && categories.indexOf(inputCategoryValue) === -1) {
      categories = [...categories, inputCategoryValue];
    }
    transaction.categories = categories
    this.setState({
      transaction,
      inputCategoryVisible: false,
      inputCategoryValue: '',
    });
  }

  changeTab() {
    this.clearFields();
  }

  clearFields(){
    const transaction = this.props.transaction;
    console.log(transaction)
    transaction.id = null
    transaction.description = null;
    transaction.date = null;
    transaction.time = null;
    transaction.purchaseDate = null;
    transaction.value = "";
    transaction.account = null;
    transaction.installments = null;
    transaction.installmentsVisible = false;
    transaction.categories = [];

    this.setState({
      transaction
    });
  }

  saveTransactions() {

    const { transaction } = this.state;
    console.log(transaction)
    const { 
      description,
      account,
      installments,
      categories,
      type,
       } = transaction;
    
    let {
      id,
      date,
      time,
      value,
    } = transaction;

    const isError = this.validate();

    if(!isError){
      const transaction = {};
      
      date = date ? date.format().split('T')[0] : date;
      time = time ? time.format('LTS') : time;
      value = type === "1" ? value * -1 : value;
      transaction.description = description;
      transaction.purchaseDate = `${date} ${time}`;
      transaction.value = value;
      transaction.account = account.id;
      transaction.categories = categories;

    if (installments) {
      transaction.installments = installments;
    }

    if(!id){
      this.createTransaction(transaction)
    } else {
      this.updateTransaction(id, transaction)
    }
  }
  }

  validate() {
    const { transaction } = this.state;
    let error = false;

    if (!transaction.description) {
      message.error('O campo Nome não pode ser vazio');
      error = true;
    }
    if (!transaction.date) {
      message.error('O campo Data não pode ser vazio');
      error = true;
    }
    if (!transaction.time) {
      message.error('O campo Horário não pode ser vazio');
      error = true;
    }
    if (!transaction.value) {
      message.error('O campo Valor não pode ser vazio');
      error = true;
    }
    if (!transaction.account) {
      message.error('O campo Conta não pode ser vazio');
      error = true;
    }

    return error;
  }

  createTransaction(transaction) {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    axios.post('/v1/transactions', transaction, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const { onClose } = this.props;
        
        message.success('Transação salva com sucesso!');
        
        onClose();
        this.clearFields();
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 422') {
          message.error('Ocorreu um erro ao salvar!');
        }
        else if (error.message === 'Request failed with status code 403') {
          message.error('Você foi desconectado!');
          history.push('/');
        }
        else {
          message.error(error.message);
        }
      });
  }

  updateTransaction(id, transaction) {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    axios.put(`/v1/transactions/${id}`, transaction, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const { onClose } = this.props;
        
        message.success('Transação atualizada com sucesso!');
        
        onClose();
        this.clearFields();
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 422') {
          message.error('Ocorreu um erro ao salvar!');
        }
        else if (error.message === 'Request failed with status code 403') {
          message.error('Você foi desconectado!');
          history.push('/');
        }
        else {
          message.error(error.message);
        }
      });
  }

  render() { 

    if(this.props.transaction !== this.state.transaction) {
      const transaction = this.props.transaction;
      if(transaction.purchaseDate){
        transaction.date =  moment(transaction.purchaseDate)
        transaction.time =  moment(transaction.purchaseDate)
      }
      
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
          <Tabs defaultActiveKey={activeTab} onChange={() => this.changeTab()}>
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
                    inputCategoryConfirm={this.inputCategoryConfirm}
                    changeValue={this.changeValue}
                    changeDescription={this.changeDescription}
                    changeDate={this.changeDate}
                    changeTime={this.changeTime}
                    changeAccount={this.changeAccount}
                    changeInstallments={this.changeInstallments}
                    showInputCategory={this.showInputCategory}
                    inputCategoryChange={this.inputCategoryChange}
                    saveTransactions={() => this.saveTransactions()}
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
