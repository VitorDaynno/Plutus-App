import React, { PureComponent} from 'react';
import axios from 'axios';

import {  Drawer, Input, Row, Col, DatePicker, TimePicker, InputNumber, Tag, Tooltip, Icon, Select, Button, message } from 'antd';

const Option = Select.Option;



class NewTransaction extends PureComponent { 

    constructor(props) {
        super(props)
        this.state = {categories: [], inputCategoryVisible: false, accounts: []}
    }

    componentDidMount() {
        this.getAccounts();  
    }

    getAccounts = () => {
        var token = localStorage.getItem('token');
        const { history} = this.props;

        axios.get(`/v1/formspayment`,{ headers: { Authorization: "Bearer " + token } } )
            .then(res => {
                this.setState({accounts: res.data})               
            })
            .catch(error => {
                console.log(error);

                if(error.response && error.response.status && error.response.status === 403) {
                    history.push('/');
                }               
               
            })   
    }

    removeCategory = (removedCategory) => {
        const categories = this.state.categories.filter(category => category !== removedCategory);
        this.setState({ categories: categories });
    }
    
    showInputCategory = () => {
        this.setState({ inputCategoryVisible: true });
    }
    
    inputCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({ inputCategoryValue: category });
    }
    
    inputCategoryConfirm = () => {
        const state = this.state;
        const inputCategoryValue = state.inputCategoryValue;
        let categories = state.categories;
        if (inputCategoryValue && categories.indexOf(inputCategoryValue) === -1) {
            categories = [...categories, inputCategoryValue];
        }
        this.setState({
          categories,
          inputCategoryVisible: false,
          inputCategoryValue: '',
        });
    }

    changeName = (e) => {
        const name = e.target.value;
        this.setState({name});
    }

    changeDate = (e) => {
        let date = e
        date = date ? date.format().split('T')[0] : date;
        this.setState({date});
    }

    changeTime = (e) => {
        let time = e;
        time = time ? time.format('LTS') : time;
        this.setState({time});
    }

    changeValue = (e) => {
        const value = e;
        this.setState({value});
    }

    changeAccount = (e) => {
        const account = e;
        this.setState({account});
    }

    saveTransactions = () => {
        const { state } = this;

        this.validate();

        let transaction = {};       

        transaction.date = state.date;
        transaction.value = state.value;
        transaction.account = state.account;        
        transaction.categories = state.categories;
        
        console.log(transaction)
    }

    validate = () => {
        const { state } = this;

        if(!state.name){
            message.error('O campo Nome não pode ser vazio');
        }       
        if(!state.date){
            message.error('O campo Data não pode ser vazio');
        }        
        if(!state.time){
            message.error('O campo Horário não pode ser vazio');
        }
        if(!state.value){
            message.error('O campo Valor não pode ser vazio');
        }
        if(!state.account){
            message.error('O campo Conta não pode ser vazio');
        }
    }
   
    render (){

        const {visible, onClose} = this.props
        const { categories, inputCategoryValue, inputCategoryVisible, accounts } = this.state

        return (
            <div>
                <Drawer
                title="Nova Transação"
                placement="right"
                width={"50%"}
                closable={true}
                onClose={onClose}
                visible={visible}
                >
                    <Row>
                        <Col>
                            <label className="label">Nome:</label>    
                            <Input onChange={this.changeName}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <label className="label">Data:</label><br/>
                            <DatePicker onChange={this.changeDate}/>
                        </Col>
                        <Col span={12}>
                            <label className="label">Horário:</label><br/>    
                            <TimePicker onChange={this.changeTime}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <label className="label">Valor:</label><br/>
                            <InputNumber onChange={this.changeValue}/>
                        </Col>
                        <Col>
                            <label className="label">Conta:</label><br/>
                            <Select onChange={this.changeAccount} style={{ width: 120 }}>
                                {accounts.map((account)=>{
                                    return <Option value={account.id}>{account.name}</Option>
                                })}                               
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className="label">Categorias:</label><br/>
                            {categories.map((category) => {
                                const isLongTag = category.length > 20;
                                const tagElem = (
                                    <Tag key={category} closable={true} afterClose={() => this.removeCategory(category)}>
                                    {isLongTag ? `${category.slice(0, 20)}...` : category}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={category} key={category}>{tagElem}</Tooltip> : tagElem;
                                })}
                            {inputCategoryVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputCategoryValue}
                                    onChange={this.inputCategoryChange}
                                    onBlur={this.inputCategoryConfirm}
                                    onPressEnter={this.inputCategoryConfirm}
                                />
                            )}
                            {!inputCategoryVisible && (
                                <Tag
                                    onClick={this.showInputCategory}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                >
                                    <Icon type="plus" /> Nova categoria
                                </Tag>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="new">
                            <Button onClick={this.saveTransactions}>
                            Nova
                            </Button>
                        </Col>
                    </Row>                   
                </Drawer>
            </div>)
    }
}

export default NewTransaction;