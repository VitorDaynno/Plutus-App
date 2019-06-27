import React, { Component } from 'react';
import {
  Card, Form, Input, Icon, Button, message,
} from 'antd';
import './assets/css/login.css';
import 'antd/dist/antd.css';

import Authentication from './assets/helpers/authentication';

const FormItem = Form.Item;

class Login extends Component {
    sendLogin(ev) {
        ev.preventDefault();
        const { history, form } = this.props;
        const { validateFields } = form;

        Authentication.login(validateFields, response => {                    
            if(response.token){
                localStorage.setItem('token', response.token);
                history.push('/transactions');
            }
            else {
                message.error('Erro ao efetuar login');
            }
        })
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="plutus-container-login">
                <Card title="Plutus" headStyle={{textAlign:"center"}} className="plutus-login-form">
                    <Form onSubmit={ev => this.sendLogin(ev)}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Por favor coloque seu email!' }],
                            })(
                                <Input placeholder="Seu email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('passWord', {
                                rules: [{ required: true, message: 'Por favor coloque sua senha!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Senha" />
                            )}    
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" block style={{background: 'rgb(39, 178, 38)', color: 'rgb(253, 254, 248)'}}>Entrar</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        ) 
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
