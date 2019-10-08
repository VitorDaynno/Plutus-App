import React, { Component } from 'react';
import { Table, Tag, Popconfirm, Icon, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

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

  removeTransactions(id, getTransactions) {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    axios.delete(`/v1/transactions/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        message.success('Transação excluída com sucesso!');
        getTransactions();
      })
      .catch((error) => {
        message.error(error);
        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
    }
  
  sorterDate(a, b) {   
    return a > b ? 1 : -1
  }

  sorterHours(a, b) {   
    a = moment(a);
    b = moment(b);
    return a.isBefore(b) ? -1 : 1
  }

  render() {
    const { data, getTransactions } = this.props ? this.props : {};
    return (
      <div>
        <Table className="table" dataSource={data}>                    
          <Column
            title="Nome"
            dataIndex="description"
            key="description"
            sorter={(a, b) => a.account.name.length - b.account.name.length}
          />
          <Column
            title="Dia"
            dataIndex="purchaseDate"
            key="day"
            sorter={(a, b) => this.sorterDate(a.purchaseDate, b.purchaseDate)}
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
            sorter={(a, b) => this.sorterHours(a.purchaseDate, b.purchaseDate)}
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
            sorter={(a, b) => a.account.name.length - b.account.name.length}
          />
          <Column
            title="Valor"
            dataIndex="value"
            key="value"
            sorter={(a, b) => a.value.length - b.value.length}
            render={value => (
              <span>
                {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
              </span>
            )}
          />
          <Column
            title="Ação"
            dataIndex="id"
            key="action"
            render={id =>
              (
              <Popconfirm title="Deseja realmente deletar?" onConfirm={() => this.removeTransactions(id, getTransactions)}>
                <Icon type="delete" />
              </Popconfirm>
              )
            }
          />
        </Table>
      </div>
    );
  }
}

export default TransactionsTable;
