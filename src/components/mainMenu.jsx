import React, { Component } from 'react';
import { Col, Menu, Button, Icon } from 'antd';

class MainMenu extends Component {
    
    render() {
        return (
            <div>
                <Menu 
                    defaultSelectedKeys={['2']}
                    mode="inline"
                    theme="dark" >
                    <Menu.Item key="1">
                        <Icon type="home" />
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="table" />
                        <span>Transações</span>
                    </Menu.Item>          
                </Menu>                  
            </div>
        ) 
    }
}

export default MainMenu;