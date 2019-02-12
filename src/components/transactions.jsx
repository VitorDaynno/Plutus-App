import React, { Component } from 'react';
import { Table, Tabs, Tag, Row, Col, Button } from 'antd';
import axios from 'axios';
import '../assets/css/transactions.css';
import NewTransaction from './newTransactions';

const TabPane = Tabs.TabPane;
const { Column } = Table;

class Transactions extends Component {
    state = {
        data: null,
        visible: false        
    }
    
    componentDidMount() {
        this.getTransactions();  
    }

    getTransactions() {
        var token = localStorage.getItem('token');
        const { history} = this.props;

        axios.get(`/v1/transactions`,{ headers: { Authorization: "Bearer " + token } } )
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

    showDrawer = () => {
        this.setState({visible: true}) 
    }

    render() {      
        
        const { data } = this.state;
        return (
            <div> 
                <Row>
					<Col className="new">
						<Button onClick={this.showDrawer}>
						Nova
                        </Button>
                    </Col>
                </Row>
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
                <NewTransaction
				visible={this.state.visible}			
			/>
            </div>
        )
    }
}

export default Transactions;




  
  