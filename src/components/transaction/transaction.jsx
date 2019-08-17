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

const { Option } = Select;

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      categories: [],
      inputCategoryVisible: false,
      installmentsVisible: false,
      type: props.type,
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

  changeName = (e) => {
    const name = e.target.value;
    this.setState({ name });
  }

  changeDate = (e) => {
    let date = e;
    date = date ? date.format().split('T')[0] : date;
    this.setState({ date });
  }

  changeTime = (e) => {
    let time = e;
    time = time ? time.format('LTS') : time;
    this.setState({ time });
  }

  changeValue = (e) => {
    const { type } = this.state;
    let value = e;
    if(type == 1) {
      value = value * -1;
    }
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
    const { state } = this;

    this.validate();

    const transaction = {};

    transaction.description = state.name;
    transaction.purchaseDate = `${state.date} ${state.time}`;
    transaction.value = state.value;
    transaction.account = state.account;
    transaction.categories = state.categories;

    if (state.installments) {
      transaction.installments = state.installments;
    }

    const token = localStorage.getItem('token');
    const { history } = this.props;

    axios.post('/v1/transactions', transaction, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const { onClose } = this.props;
        message.success('Transação salva com sucesso!');
        onClose();
      })
      .catch((error) => {
        message.error(error);
        console.log(error);

        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
  }

  validate() {
    const { state } = this;

    if (!state.name) {
      message.error('O campo Nome não pode ser vazio');
    }
    if (!state.date) {
      message.error('O campo Data não pode ser vazio');
    }
    if (!state.time) {
      message.error('O campo Horário não pode ser vazio');
    }
    if (!state.value) {
      message.error('O campo Valor não pode ser vazio');
    }
    if (!state.account) {
      message.error('O campo Conta não pode ser vazio');
    }
  }

  render() {
    const {
      categories,
      inputCategoryValue,
      inputCategoryVisible,
      accounts,
      installmentsVisible
    } = this.state;

    return (
      <div>
        <Row className="new-transaction-row">
          <Col span={24}>
            <label className="label"> Nome:</label>
            <Input onChange={this.changeName} />
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" span={8}>
            <label className="label">Data:</label>
            <br />
            <DatePicker format="DD/MM/YYYY" locale={locale} onChange={this.changeDate} />
          </Col>
          <Col className="date-group" span={7} >
            <label className="label">Horário:</label>
            <br />
            <TimePicker className="max" onChange={this.changeTime}/>
          </Col>
          <Col span={7}>
            <label className="label">Valor:</label>
            <br />
            <InputNumber className="max" precision={2} onChange={this.changeValue}/>
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" span={11}>
            <label className="label">Conta:</label>
            <br />
            <Select className="max" onChange={this.changeAccount}>
              {accounts.map(account => <Option value={account.id}>{account.name}</Option>)}
            </Select>
          </Col>
          {installmentsVisible && (<Col span={12}>
            <label className="label">N° de parcelas:</label>
            <br />
            <InputNumber
              precision={0}
              onChange={this.changeInstallments}              
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
