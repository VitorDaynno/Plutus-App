import React, { PureComponent } from 'react';
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

class TransactionDrawer extends PureComponent { 

  render() {
    const { visible, onClose, transaction, title, activeTab } = this.props;

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
                  <Transaction onClose={onClose} type={panel.key} transaction={transaction} />
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
