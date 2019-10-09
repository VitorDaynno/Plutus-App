import React, { Component } from 'react';
import { Tag, } from 'antd';
import axios from 'axios';
import '../assets/css/topHeader.css';


import Format from '../helpers/format';

class TopHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { balances: [] };
  }

  componentDidMount() {
    this.getBalances();
  }

  getBalances() {
    const token = localStorage.getItem('token');
    const { history} = this.props;

    axios.get('/v1/accounts/balances',{ headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({ balances: res.data });
      })
      .catch((error) => {
        console.error(error);

        if (error.response && error.response.status && error.response.status === 403) {
          history.push('/');
        }
      });
  }

  mountBalances() {
    const { balances } = this.state;
    return balances.map((balance) => {
      if (balance.balance < 0) {
        return (
          <Tag color="red" key={balance.id}>
            <span className="balance">
              {balance.name}
              :
            </span>
            {Format.money(balance.balance)}
          </Tag>
        );
      } if (balance.balance <= 100) {
        return (
          <Tag color="orange" key={balance.id}>
            {balance.name}
            :
            {Format.money(balance.balance)}
          </Tag>
        );
      }
      return (
        <Tag color="green" key={balance.id}>
          {balance.name}
          :
          {Format.money(balance.balance)}
        </Tag>
      );
    });
  }

  render() {
    return (
      <div className="topHeader">
        <div>
          <h2 id="logo">Plutus</h2>
        </div>
        <div>
          {this.mountBalances()}
        </div>
      </div>
    );
  }
}

export default TopHeader;
