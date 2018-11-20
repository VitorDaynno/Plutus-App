import React, { Component } from 'react';
import { Button, Tag, Icon } from 'antd';
import '../assets/css/topHeader.css';

class TopHeader extends Component {

    render() {      
        
        return (
            <div className="topHeader">
                <div>
                    Plutus
                </div>
                <Button>
                    <Icon type="bell"></Icon>
                </Button>
            </div>)
    }
}

export default TopHeader;