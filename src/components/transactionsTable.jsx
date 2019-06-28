import React, { Component } from 'react';
import { Table, Tag } from 'antd';

const { Column } = Table;

class TransactionsTable extends Component {
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  formatTime(dateString) {
    const time = new Date(dateString);
    return time.toLocaleTimeString();
  }

  render() {
    const { data } = this.props ? this.props : {};
    return (
      <div>
        <Table className="table" dataSource={data}>                    
          <Column
            title="Nome"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Dia"
            dataIndex="purchaseDate"
            key="day"
            render={purchaseDate => (
              <span>
                {this.formatDate(purchaseDate)}
              </span>
            )}
          />
          <Column
            title="Horário"
            dataIndex="purchaseDate"
            key="hours"
            render={purchaseDate => (
              <span>
                {this.formatTime(purchaseDate)}
              </span>
            )}
          />
          <Column
            title="Categorias"
            dataIndex="categories"
            key="tags"
            render={categories => (
              <span>
                {categories.map(category => <Tag color="orange" key={category}>{category}</Tag>)}
              </span>
            )}
          />
          <Column
            title="Conta"
            dataIndex="account.name"
            key="account"
          />
          <Column
            title="Valor"
            dataIndex="value"
            key="value"
            render={value => (
              <span>
                {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default TransactionsTable;
