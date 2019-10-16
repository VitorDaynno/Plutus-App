import React, { Component } from 'react';
import {
  Input,
  Row,
  Col,
  DatePicker,
  TimePicker,
  InputNumber,
  Tag,
  Tooltip,
  Icon,
  Select,
  Button,
  message
} from 'antd';
import axios from 'axios';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';


const { Option } = Select;

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      categories: [],
      inputCategoryVisible: false,
      installmentsVisible: false,
      type: props.type
    };
  }

  componentDidMount() {
    const { transaction } = this.props;

    if(transaction.id){
      this.setValues(transaction)
    }

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

  setValues(transaction) {
    const name = transaction.description;
    const date = moment(transaction.purchaseDate);
    const time = moment(transaction.purchaseDate);
    const value = transaction.value;
    const account = transaction.account.id;
    const installmentsVisible = false;
    const categories = transaction.categories;

    this.setState({
      name,
      date,
      time,
      value,
      account,
      installmentsVisible,
      categories
    });
  }

  changeName = (e) => {
    const name = e.target.value;
    this.setState({ name });
  }

  changeDate = (e) => {
    let date = e;
    this.setState({ date });
  }

  changeTime = (e) => {
    let time = e;
    this.setState({ time });
  }

  changeValue = (e) => {
    let value = e;
    this.setState({ value });
  }

  changeInstallments = (e) => {
    const installments = e;
    this.setState({ installments });
  }
  
  changeAccount = (e) => {
    let account = e;
    this.setState({ account });

    const { accounts } = this.state;
    account = accounts.filter(function(i){
      return i.id === account
    })
    
    this.changeStatusInstallments(account[0])
  }

  changeStatusInstallments = (account) => {
    let installmentsVisible;
    if(account.type === 'credit') {
      installmentsVisible = true;
    } else {
      installmentsVisible = false;
    }
    this.setState({installmentsVisible, installments: null })
  }

  removeCategory = (removedCategory) => {
    let { categories } = this.state;
    categories = categories.filter(category => category !== removedCategory);
    this.setState({ categories });
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
    const { inputCategoryValue } = state;
    let { categories } = state;
    if (inputCategoryValue && categories.indexOf(inputCategoryValue) === -1) {
      categories = [...categories, inputCategoryValue];
    }
    this.setState({
      categories,
      inputCategoryVisible: false,
      inputCategoryValue: '',
    });
  }

  saveTransactions = () => {
    const { 
      name,
      account,
      installments,
      categories,
      type,
       } = this.state;
    
    let {
      date,
      time,
      value,
    } = this.state;

    const isError = this.validate();

    if(!isError){
      const transaction = {};
      
      date = date ? date.format().split('T')[0] : date;
      time = time ? time.format('LTS') : time;
      value = type === "1" ? value * -1 : value;
      transaction.description = name;
      transaction.purchaseDate = `${date} ${time}`;
      transaction.value = value;
      transaction.account = account;
      transaction.categories = categories;

    if (installments) {
      transaction.installments = installments;
    }

    const token = localStorage.getItem('token');
    const { history } = this.props;
    axios.post('/v1/transactions', transaction, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const { onClose } = this.props;
        
        message.success('Transação salva com sucesso!');
        
        onClose();
        this.clearFields()
      })
      .catch((error) => {
        message.error(error);
        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
    }
  }
  
  validate() {
    const { state } = this;
    let error = false;

    if (!state.name) {
      message.error('O campo Nome não pode ser vazio');
      error = true;
    }
    if (!state.date) {
      message.error('O campo Data não pode ser vazio');
      error = true;
    }
    if (!state.time) {
      message.error('O campo Horário não pode ser vazio');
      error = true;
    }
    if (!state.value) {
      message.error('O campo Valor não pode ser vazio');
      error = true;
    }
    if (!state.account) {
      message.error('O campo Conta não pode ser vazio');
      error = true;
    }

    return error;
  }

  clearFields(){
    const name = null;
    const date = null;
    const time = null;
    const value = null;
    const account = null;
    const installments = null;
    const installmentsVisible = false;
    const categories = [];

    this.setState({
      name,
      date,
      time,
      value,
      account,
      installments,
      installmentsVisible,
      categories
    });
  }

  render() {
    const {
      categories,
      inputCategoryValue,
      inputCategoryVisible,
      accounts,
      installmentsVisible,
      name,
      date,
      time,
      value,
      account,
      installments
    } = this.state;
      
    return (
      <div>
        <Row className="new-transaction-row">
          <Col span={24}>
            <label className="label"> Nome:</label>
            <Input onChange={this.changeName} value={name}/>
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" lg={8} xs={24}>
            <label className="label">Data:</label>
            <DatePicker format="DD/MM/YYYY" locale={locale} onChange={this.changeDate} value={date}/>
          </Col>
          <Col className="date-group" lg={7} xs={24}>
            <label className="label">Horário:</label>
            <TimePicker className="max" onChange={this.changeTime} value={time}/>
          </Col>
          <Col lg={7} xs={24}>
            <label className="label">Valor:</label>
            <br />
            <InputNumber className="max" precision={2} onChange={this.changeValue} value={value} decimalSeparator=","/>
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" lg={11} xs={24}>
            <label className="label">Conta:</label>
            <br />
            <Select className="max" onChange={this.changeAccount} value={account}>
              {accounts.map(account => <Option value={account.id}>{account.name}</Option>)}
            </Select>
          </Col>
          {installmentsVisible && (<Col lg={11} xs={24}>
            <label className="label">N° de parcelas:</label>
            <br />
            <InputNumber
              precision={0}
              onChange={this.changeInstallments}
              value={installments}          
            />
          </Col>)}
        </Row>
        <Row className="new-transaction-row">
          <Col>
            <label className="label">Categorias:</label>
            <br />
            {categories.map((category) => {
              const isLongTag = category.length > 20;
              const tagElem = (
                <Tag key={category} closable="true" afterClose={() => this.removeCategory(category)}>
                  {isLongTag ? `${category.slice(0, 20)}...` : category}
                </Tag>
              );
              return isLongTag
                ? <Tooltip title={category} key={category}>{tagElem}</Tooltip>
                : tagElem;
            })}
            {inputCategoryVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputCategoryValue}
                onChange={this.inputCategoryChange}
                onBlur={this.inputCategoryConfirm}
                onPressEnter={this.inputCategoryConfirm}
              />
            )}
            {!inputCategoryVisible && (
              <Tag
                onClick={this.showInputCategory}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" />
                Nova categoria
              </Tag>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="new">
            <Button onClick={this.saveTransactions}>
            Salvar
            </Button>
          </Col>
        </Row>
      </div>  
      )
    }
}

export default Transaction;
