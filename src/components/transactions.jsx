import React, { Component } from 'react';
import { Table, Tag, Row, Col } from 'antd';
import axios from 'axios';
import '../assets/css/transactions.css';

const { Column } = Table;

class Transactions extends Component {

  getTransactions() {
      var token = localStorage.getItem('token');

      return axios.get(`http://localhost:5000/v1/transactions`,{ headers: { Authorization: "Bearer " + token } } )
        .then(res => {
          console.log(res.data)
          return res.data;
        })
        .catch(error => {
          console.log(error);
        })              
    };

    render() {
      var data = null;
      this.getTransactions();    

        return (
            <div> 
                <Row >
                    <Col className="col" span="24">
                        <Table className="table" dataSource={data}>                    
                            <Column
                                title="Nome"
                                dataIndex="description"
                                key="description"
                            />     
                            <Column
                                title="Dia"
                                dataIndex="day"
                                key="day"
                            />
                            <Column
                                title="Horário"
                                dataIndex="hours"
                                key="hours"
                            />                                           
                            <Column
                                title="Categorias"
                                dataIndex="tags"
                                key="tags"
                                render={tags => (
                                    <span>
                                    {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                                    </span>
                                )}
                            />                            
                            <Column
                                title="Forma de pagamento"
                                dataIndex="paymentForm"
                                key="paymentForm"
                            />
                            <Column
                                title="Valor"
                                dataIndex="value"
                                key="value"
                            />                                  
                        </Table>
                    </Col>                
                </Row>        
            </div>
        )
        
    }
}

export default Transactions;




  
  