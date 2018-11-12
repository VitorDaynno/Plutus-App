import React, { Component } from 'react';
import { Table, Tabs, Row, Col } from 'antd';
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
          console.log(res.data)
          this.setState({data: res.data})
          return res.data;
        })
        .catch(error => {
          console.log(error);
        })              
    };

    render() {
      
      this.getTransactions();    
        const { data } = this.state;
        return (
            <div> 
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
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
                                        dataIndex="day"
                                        key="day"
                                    />
                                    <Column
                                        title="Horário"
                                        dataIndex="hours"
                                        key="hours"
                                    />                                           
                                    {/* <Column
                                        title="Categorias"
                                        dataIndex="tags"
                                        key="tags"
                                        render={tags => (
                                            <span>
                                            {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                                            </span>
                                        )}
                                    />                             */}
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
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    
                </Tabs>
               
            </div>
        )
        
    }
}

export default Transactions;




  
  