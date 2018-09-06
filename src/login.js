import React, { Component } from 'react';
import { Card , Row, Col, Form, Input, Icon, Button} from 'antd';
import './assets/css/login.css';
import 'antd/dist/antd.css';

import Authentication from './assets/helpers/authentication';

const FormItem = Form.Item;

class Login extends Component {
    sendLogin(ev){
        ev.preventDefault();
        const { form } = this.props;
        const { validateFields } = form;

        Authentication.login(validateFields, token => {
            console.log('entrei')
        })
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <Row className="row"> 
                    <Col span="10" offset="7">
                        <Card title="Plutus" headStyle={{textAlign:"center"}}>
                            <Form onSubmit={ev => this.sendLogin(ev)}>
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Por favor coloque seu email!' }],
                                    })(
                                        <Input placeholder="Seu email" prefix={<Icon type="user"/>}/>
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
                    </Col> 
                </Row>                                  
            </div>
        ) 
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
