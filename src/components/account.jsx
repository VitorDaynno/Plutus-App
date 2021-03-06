import React, { Component } from 'react';
import { Table, Row, Col, Button, message, notification } from 'antd';
import axios from 'axios';
import '../assets/css/accounts.css';

import NewAccount from './newAccount';

const { Column } = Table;

class Account extends Component {

	state = {
		data: null,
		visible: false
	}

	componentDidMount() {
		this.getAccounts();
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	clickOk = (ev) => {
		const token = localStorage.getItem('token');
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

        axios.post(`/v1/accounts`, body ,{ headers: { Authorization: "Bearer " + token } } )
            .then(res => {
				notification['success']({
					message: 'Sucesso',
					description: 'Sua conta foi criada com sucesso',
				  })
				this.getAccounts();
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

	getAccounts() {
		var token = localStorage.getItem('token');
		const { history } = this.props;

		axios.get(`/v1/accounts`, { headers: { Authorization: "Bearer " + token } })
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
				<Row>
					<Col className="col">
						<Table className="table" dataSource={data}>
							<Column
								title="Nome"
								dataIndex="name"
								key="name"
							/>
							<Column
								title="Categoria"
								dataIndex="type"
								key="type"
							/>
						</Table>
					</Col>
				</Row>
				<NewAccount
					visible={this.state.visible}
					clickOk={this.clickOk}
					clickCancel={this.clickCancel}			
				/>
        	</div >
        )

	}
}

export default Account;