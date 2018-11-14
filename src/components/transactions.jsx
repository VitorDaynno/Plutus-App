import React, { Component } from 'react';
import { Table, Tabs, Tag, Row, Col } from 'antd';
import axios from 'axios';
import '../assets/css/transactions.css';

const TabPane = Tabs.TabPane;
const { Column } = Table;

class Transactions extends Component {
    state = {
        data: null
    }
    
  getTransactions() {
      var token = localStorage.getItem('token');

      axios.get(`http://localhost:5000/v1/transactions`,{ headers: { Authorization: "Bearer " + token } } )
        .then(res => {
          this.setState({data: res.data})
          return res.data;
        })
        .catch(error => {
          console.log(error);
        })              
    };

    formatDate(dateString){
        const date = new Date(dateString);

        return date.toLocaleDateString();
    }

    formatTime(dateString) {
        var time = new Date(dateString);

        return time.toLocaleTimeString();
    }

    render() {
      
      this.getTransactions();    
        const { data } = this.state;
        return (
            <div> 
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Geral" key="1">
                        <Row >
                            <Col className="col" span="20">
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
                                        dataIndex="category"
                                        key="tags"
                                        render={category => (
                                            <span>
                                            <Tag color="orange" key={category}>{category}</Tag>
                                            <Tag color="green" key={category}>{category}</Tag>
                                            </span>
                                        )}
                                    />                             
                                    <Column
                                        title="Forma de pagamento"
                                        dataIndex="formPayment"
                                        key="formPayment"
                                    />
                                    <Column
                                        title="Valor"
                                        dataIndex="value"
                                        key="value"
                                        render={value =>(
                                            <span>
                                                {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                            </span>)
                                        }
                                    />                                  
                                </Table>
                            </Col>                
                        </Row>        
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>                    
                </Tabs>
               
            </div>
        )
        
    }
}

export default Transactions;




  
  