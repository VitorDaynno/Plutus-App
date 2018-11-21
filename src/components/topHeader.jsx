import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import '../assets/css/topHeader.css';

class TopHeader extends Component {

    render() {      
        
        return (
            <div className="topHeader">
                <div>
                    <h2 id="logo">Plutus</h2>
                </div>
                <Button>
                    <Icon type="bell"></Icon>
                </Button>
            </div>)
    }
}

export default TopHeader;