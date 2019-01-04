import React, { Component } from 'react';
import { Table, Row, Col, Button } from 'antd';
import axios from 'axios';
import '../assets/css/formsPayments.css';

const { Column } = Table;

class FormsPayment extends Component {
    state = {
        data: null
    }
    
    componentDidMount() {
        this.getFormsPayment();  
    }

    getFormsPayment() {
        var token = localStorage.getItem('token');
        const { history} = this.props;

        axios.get(`/v1/formspayment`,{ headers: { Authorization: "Bearer " + token } } )
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

    render() {      
        
        const { data } = this.state;

        return (
            <div>                 
                <Row>
                    <Col className="test">
                        <Button>
                            Novo
                        </Button>
                    </Col>
                </Row>
                <Row >                    
                    <Col className="col">
                        <Table className="table" dataSource={data}>                    
                            <Column
                                title="Nome"
                                dataIndex="name"
                                key="name"
                            />     
                            <Column
                                title="Tipo"
                                dataIndex="type"
                                key="type"                                                                                
                            />                                                              
                        </Table>                                
                    </Col>                
                </Row>   
            </div>
        )
        
    }
}

export default FormsPayment;