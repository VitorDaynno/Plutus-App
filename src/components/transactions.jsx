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
    
    componentDidMount() {
        this.getTransactions();  
    }

    getTransactions() {
        var token = localStorage.getItem('token');
        const { history} = this.props;

        axios.get(`http://localhost:5000/v1/transactions`,{ headers: { Authorization: "Bearer " + token } } )
            .then(res => {
                this.setState({data: res.data})               
            })
            .catch(error => {
                console.log(error);

                if(error.response && error.response.status && error.response.status === 403) {
                    history.push('/');
                }               
               
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
        
        const { data } = this.state;
        return (
            <div> 
                <Row >
                    <Col className="col">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Geral" key="1">
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
                                                {category.map(categor => <Tag color="orange" key={categor}>{categor}</Tag>)}                                         
                                            </span>
                                        )}
                                    />                             
                                    <Column
                                        title="Forma de pagamento"
                                        dataIndex="formPayment.name"
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
                            </TabPane>                                        
                        </Tabs>
                    </Col>                
                </Row>   
            </div>
        )
        
    }
}

export default Transactions;




  
  