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
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';



const { Option } = Select;


class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      type: props.type
    };
  }

  removeCategory = (removedCategory) => {
    let { categories } = this.state;
    categories = categories.filter(category => category !== removedCategory);
    this.setState({ categories });
  }

  render() {
    const { 
      transaction, 
      accounts,
      inputCategoryValue,
      inputCategoryVisible,
      installmentsVisible,
      changeValue,
      changeDescription,
      changeDate,
      changeTime,
      changeAccount,
      changeInstallments,
      showInputCategory,
      inputCategoryChange,
      inputCategoryConfirm,
      saveTransactions
    } = this.props;

    const {
      description,
      date,
      time,
      value,
      account,
      installments,
      categories,
    } = transaction ? transaction : {};


    return (
      <div>
        <Row className="new-transaction-row">
          <Col span={24}>
            <label className="label">Nome:</label>
            <Input value={description} onChange={changeDescription}/>
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" lg={8} xs={24}>
            <label className="label">Data:</label>
            <DatePicker format="DD/MM/YYYY" locale={locale} onChange={changeDate} value={date}/>
          </Col>
          <Col className="date-group" lg={7} xs={24}>
            <label className="label">Horário:</label>
            <TimePicker className="max" onChange={changeTime} value={time}/>
          </Col>
          <Col lg={7} xs={24}>
            <label className="label">Valor:</label>
            <br />
            <InputNumber className="max" precision={2} onChange={changeValue} value={value} decimalSeparator=","/>
          </Col>
        </Row>
        <Row className="new-transaction-row">
          <Col className="date-group" lg={11} xs={24}>
            <label className="label">Conta:</label>
            <br />
            <Select className="max" onChange={changeAccount} value={account && account.id}>
              {accounts.map(account => <Option value={account && account.id}>{account.name}</Option>)}
            </Select>
          </Col>
          {installmentsVisible && (<Col lg={11} xs={24}>
            <label className="label">N° de parcelas:</label>
            <br />
            <InputNumber
              precision={0}
              onChange={changeInstallments}
              value={installments}          
            />
          </Col>)}
        </Row>
        <Row className="new-transaction-row">
          <Col>
            <label className="label">Categorias:</label>
            <br />
            {categories && categories.map((category) => {
              const isLongTag = category.length > 20;
              const tagElem = (
                <Tag key={category} closable="true" onClose={() => this.removeCategory(category)}>
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
                onChange={inputCategoryChange}
                onBlur={inputCategoryConfirm}
                onPressEnter={inputCategoryConfirm}
              />
            )}
            {!inputCategoryVisible && (
              <Tag
                onClick={showInputCategory}
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
            <Button onClick={saveTransactions}>
            Salvar
            </Button>
          </Col>
        </Row>
      </div>  
      )
    }
}

export default Transaction;
