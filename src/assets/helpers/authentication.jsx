import React, { Component } from 'react';

class Authentication extends Component {

    static login(data,cb) {
        data((err, values) => {
            if(!err) {
                const body = {
                    email: values.email,
                    passWord: values.passWord
                }
                console.log(body)
                cb(body)
            }
        });
    }
}

export default Authentication;