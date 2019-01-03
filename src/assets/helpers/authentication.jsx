import { Component } from 'react';
import axios from 'axios';

class Authentication extends Component {

    static login(data,cb) {
        data((err, values) => {
            if(!err) {
                const body = {
                    email: values.email,
                    password: values.passWord
                }
                axios.post(`/v1/users/auth`, body)
                .then(res => {
                    cb(res.data)
                })
                .catch(error => {
                    cb(error);
                })
                
            }
        });
    }
}

export default Authentication;