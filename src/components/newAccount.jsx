import React, { PureComponent} from 'react';
import { Modal, Input, Select, message, Row, Col } from 'antd';
import '../assets/css/newAccount.css';

const { Option } = Select;


class NewAccount extends PureComponent { 

    constructor(props) {
        super(props)
        this.state = {name: null, category: null}
    }

    setName = (e) => {
        const name = e.target.value; 
        if(!name || !name === ''){
            message.error('O campo Nome não pode ser vazio');
        }
        this.setState({name: name})
    }

    setType = (e) => {
        const category = e;
        if(!category || !category === ''){
            message.error('O campo Classificação não pode ser vazio');
        }
        this.setState({category: category})
    }
        
    render (){

        const {visible, clickOk, clickCancel} = this.props

        return (<div>
            <Modal
                title="Conta"
                visible={visible}
                onOk={() => clickOk(this.state)}
                onCancel={clickCancel}
            >
                <Row>
                    <Col span={11}>
                        <label className="label">Nome:</label>                  
                        <Input onChange={this.setName} />
                    </Col>
                    <Col span={1}/>                   
                    <Col span={12}>
                        <label className="label">Classificação:</label><br/>                    
                        <Select className="select" placeholder="Selecione um tipo" onChange={this.setType}>
                            <Option value="physic">Física</Option>
                            <Option value="checking">Corrente</Option>
                            <Option value="credit">Crédito</Option>
                            <Option value="saving">Poupança</Option>
                        </Select>
                    </Col>
                </Row>

                
            </Modal>
        </div>)
    }
}

export default NewAccount;