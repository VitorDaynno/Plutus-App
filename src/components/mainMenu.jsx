import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

class MainMenu extends Component {
    
    render() {
        
        return (
            <div>
                <Menu 
                    defaultSelectedKeys={['transactions']}
                    mode="inline"
                    theme="dark">                
                    <Menu.Item key="transactions">
                        <NavLink to="/transactions">
                            <Icon type="table" />
                            <span>Transações</span>
                        </NavLink>                        
                    </Menu.Item>
                    <Menu.Item key="accounts">
                        <NavLink to="/accounts">
                            <Icon type="wallet" />
                            <span>Contas</span>
                        </NavLink>                        
                    </Menu.Item>         
                </Menu>                  
            </div>
        ) 
    };
}

export default MainMenu;