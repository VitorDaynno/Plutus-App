import React, { Component } from 'react';
import {
  Drawer,
  Tabs,
} from 'antd';

import Transaction from './transaction';
import '../assets/css/newTransactions.css';

const { TabPane } = Tabs;

class NewTransaction extends Component { 

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, onClose } = this.props;

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
              <Transaction onClose={onClose} />
            </TabPane>
            <TabPane tab="Receita" key="2">
              <Transaction onClose={onClose} />
            </TabPane>
          </Tabs>
        </Drawer>
      </div>
    );
  }
}

export default NewTransaction;
