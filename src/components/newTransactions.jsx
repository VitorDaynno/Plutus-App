import React, { Component } from 'react';
import axios from 'axios';
import {
  Drawer,
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
  message,
  Tabs,
} from 'antd';

import Transaction from './transaction';
import '../assets/css/newTransactions.css';

const { Option } = Select;
const { TabPane } = Tabs;

class NewTransaction extends Component { 

  constructor(props) {
    super(props);
    this.state = {};
  }

  

  

  

  

  

  

  render() {
    const { visible, onClose } = this.props;
    const {
      categories,
      inputCategoryValue,
      inputCategoryVisible,
      accounts,
    } = this.state;

    return (
      <div>
        <Drawer
          title="Nova Transação"
          placement="right"
          width="50%"
          closable="true"
          onClose={onClose}
          visible={visible}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Despesa" key="1">
              <Transaction/>
            </TabPane>
            <TabPane tab="Receita" key="2" />
          </Tabs>
        </Drawer>
      </div>
    );
  }
}

export default NewTransaction;
