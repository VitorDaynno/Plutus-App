import React, { Component } from 'react';
import {
  Drawer,
  Tabs,
} from 'antd';

import Transaction from './transaction';
import '../../assets/css/transactionDrawer.css';

const { TabPane } = Tabs;

class TransactionDrawer extends Component { 

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, onClose, transaction } = this.props;

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
              <Transaction onClose={onClose} type="1" transaction={transaction} />
            </TabPane>
            <TabPane tab="Receita" key="2">
              <Transaction onClose={onClose} type="2" transaction={transaction}/>
            </TabPane>
          </Tabs>
        </Drawer>
      </div>
    );
  }
}

export default TransactionDrawer;
