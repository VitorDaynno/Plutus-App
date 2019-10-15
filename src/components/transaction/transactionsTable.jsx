import React, { Component } from 'react';
import { Table, Tag, Popconfirm, Icon, message } from 'antd';
import axios from 'axios';
import Sorter from '../../helpers/sorter';
import Format from '../../helpers/format';

const { Column } = Table;

class TransactionsTable extends Component {

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

  editTransaction(transaction) {
    const { showDrawer } = this.props;
    showDrawer(transaction);
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
            sorter={(a, b) => Sorter.sorterDate(a.purchaseDate, b.purchaseDate)}
            render={purchaseDate => (
              <span>
                {Format.formatDate(purchaseDate)}
              </span>
            )}
          />
          <Column
            title="Horário"
            dataIndex="purchaseDate"
            key="hours"
            sorter={(a, b) => Sorter.sorterHours(a.purchaseDate, b.purchaseDate)}
            render={purchaseDate => (
              <span>
                {Format.formatTime(purchaseDate)}
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
            sorter={(a, b) => Sorter.sorterValue(a.value, b.value)}
            render={value => (
              <span>
                {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
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
            title="Ação"
            dataIndex="id"
            key="action"
            render={(id, item) =>
              (
              <div>
              <Popconfirm title="Deseja realmente deletar?" onConfirm={() => this.removeTransactions(id, getTransactions)}>
                <Icon type="delete" />
              </Popconfirm>
              <Popconfirm title="Deseja realmente editar?" onConfirm={() => this.editTransaction(item)}>
                <Icon type="edit" />
              </Popconfirm>
              </div>
              )
            }
          />
        </Table>
      </div>
    );
  }
}

export default TransactionsTable;
