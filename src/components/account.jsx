import React, { Component } from 'react';
import { Table, Row, Col, Button, message, notification } from 'antd';
import axios from 'axios';
import '../assets/css/formsPayments.css';

import NewFormsPayment from './newAccount';

const { Column } = Table;

class FormsPayment extends Component {

	state = {
		data: null,
		visible: false
	}

	componentDidMount() {
		this.getFormsPayment();
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	clickOk = (ev) => {
		var token = localStorage.getItem('token');
        const { history} = this.props;
		let body = {};

		if(!ev.name || ev.name === ''){
			message.error('O campo Nome não pode ser vazio');
		}
		body.name = ev.name;

		if(!ev.category || ev.category === ''){
			message.error('O campo Categoria não pode ser vazio');
		}
		body.type = ev.category;

        axios.post(`/v1/formspayment`, body ,{ headers: { Authorization: "Bearer " + token } } )
            .then(res => {
				notification['success']({
					message: 'Sucesso',
					description: 'Sua conta foi criada com sucesso',
				  })
				this.setState({
					visible: false,
				  });
            })
            .catch(error => {
                console.log(error);
                if(error.response && error.response.status && error.response.status === 403) {
                    history.push('/');
                }               
               
			})  
			
        
    }

    clickCancel = () => {
        this.setState({
            visible: false,
        });
    }

	getFormsPayment() {
		var token = localStorage.getItem('token');
		const { history } = this.props;

		axios.get(`/v1/formspayment`, { headers: { Authorization: "Bearer " + token } })
			.then(res => {
				this.setState({ data: res.data })
			})
			.catch(error => {
				console.log(error);

				if (error.response && error.response.status && error.response.status === 403) {
					history.push('/');
				}

			})
	};

	render() {

		const { data } = this.state;

		return (
			<div>
				<Row>
					<Col className="new">
						<Button onClick={this.showModal}>
						Nova
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
			<NewFormsPayment 
				visible={this.state.visible}
				clickOk={this.clickOk}
				clickCancel={this.clickCancel}			
			/>
			
            </div >
        )

	}
}

export default FormsPayment;