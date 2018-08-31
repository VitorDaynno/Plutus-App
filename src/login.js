import React, { Component } from 'react';
import './login.css';

class Login extends Component {
    render() {
        return (
            <div className="login">                
                <div className="card">
                    <div className="card-body">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="email@email.com"></input>
                        </div>
                        <div className="form-group">
                            <label for="password">Senha</label>
                            <input type="password" className="form-control" id="password" placeholder="******"></input>
                        </div>  
                        <button type="button" class="btn btn-success btn-block">Login</button>                    
                    </div>
                </div>                
            </div>
        )
    }
}

export default Login;
