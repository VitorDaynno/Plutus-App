import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class MainMenu extends Component {

    render() {
        return (
            <div>
                <Menu 
                    defaultSelectedKeys={['home']}
                    mode="inline"
                    theme="dark">                    
                    <Menu.Item key="home"  >
                        <Icon type="home"/>
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item key="transactions">
                        <Icon type="table" />
                        <span>Transações</span>
                    </Menu.Item>          
                </Menu>                  
            </div>
        ) 
    }
}

export default MainMenu;