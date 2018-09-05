import React, { Component } from 'react';
import { Card , Form, Input, Icon, Button} from 'antd';
import './assets/css/login.css';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

class Login extends Component {
    sendLogin(ev){
        ev.preventDefault();
        const { form } = this.props;
        const { validateFields } = form;

        console.log('teste')
        validateFields((err, values) =>{
            console.log(values)
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
                            {getFieldDecorator('userName', {
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
            </div>
        ) 
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
