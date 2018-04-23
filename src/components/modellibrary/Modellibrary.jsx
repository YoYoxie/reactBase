import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin, Table, Button, Row, Col, Form, Select, Input, Modal, Checkbox, Popconfirm} from 'antd';
import { modlibraryget } from '../../action/modellibrary/modellibrary';
import { getQueryString } from '../utils';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class ModelLibrary extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info } = this.props.modLibrary;
        if(getQueryString("username") == null){
            info.page = 0;
            info.size = 10;
            info.username = undefined;
        }else{
            info.username = getQueryString("username");
        }
        // this.props.accountget(info);
    }
    // 筛选
    formFilter(key, value){
        let { info } = this.props.modLibrary;
        if(key == 'username'){
            info.username = value;
        }
        if(key == 'enabled'){
            if(value){
                info.enabled = value == 'true'?true:false;
            }else{
                info.enabled = undefined;
            }
        }
        if(key == 'locked'){
            if(value){
                info.locked = value == 'true'?true:false;
            }else{
                info.locked = undefined;
            }
        }
        info.page=0;
        info.size=10;
        // this.props.accountget(info);
        // this.props.accountload(true);
    }
    //分页
    formPage(current, pageSize){
        const { info } = this.props.modLibrary;
        info.page = current - 1;
        if(pageSize != info.size){
            info.size = pageSize;
            info.page = 0;
        }
        // this.props.accountget(info);
        // this.props.accountload(true);
    }
    //设置弹窗
    setModal(key, value){
        // this.props.accountmodal(true);
        // this.props.accountgetone(key);
        // this.props.persongetone(value);
    }
    // 禁用启用确认
    confirmEnable(type,boolean,formid){
        if(type=='enabled'){
            if(boolean){
                // this.props.accountpatchone(formid,'enable');
            }else{
                // this.props.accountpatchone(formid,'disable');
            }
        }else if(type=='locked'){
            if(boolean){
                // this.props.accountpatchone(formid,'lock');
            }else{
                // this.props.accountpatchone(formid,'unlock');
            }
        }
    }
    render() {
        const { list, info, load } = this.props.modLibrary;
        const pagination = {
            total: list.totalElements,
            current: info.page + 1,
            pageSize: info.size,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            //每页条数改变
            onShowSizeChange: this.formPage.bind(this),
            //页码改变
            onChange: this.formPage.bind(this),
        };
        const columns = [
            { title: '账号', width:'30%',dataIndex: 'username', key: 'username',},
            { title: '员工姓名', dataIndex: 'person.name', key: 'person.name',},
            { title: '状态', key: 'isEnabled',
                render: (text, record) => (<span>{record.isEnabled?'启用':'禁用'}</span>),
            },
            { title: '是否锁定', key: 'isLocked',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    <a onClick={this.setModal.bind(this, record.id, record.person.id)}>配置角色</a>
                    <span className="ant-divider"></span>
                    {record.isEnabled?
                        (<Popconfirm title="确定禁用此账号？" onConfirm={this.confirmEnable.bind(this,'enabled',false,record.id)} placement="left"  okText="确定" cancelText="取消">
                            <a className={styles.delete}>禁用</a>
                        </Popconfirm>):
                        (<Popconfirm title="确定启用此账号？" onConfirm={this.confirmEnable.bind(this,'enabled',true,record.id)} placement="left"  okText="确定" cancelText="取消">
                            <a >启用</a>
                        </Popconfirm>)
                    }
                    {record.isLocked?<span className="ant-divider"></span>:''}
                    {record.isLocked?
                        (<Popconfirm title="确定解锁此账号？" onConfirm={this.confirmEnable.bind(this,'locked',false,record.id)} placement="left"  okText="确定" cancelText="取消">
                            <a >解锁</a>
                        </Popconfirm>):''
                    }
                </span>),
            },
        ];

        return (
            <div className={styles.card} id="area">
                <Row className={styles.gapunusual}>
                    <Col span={3} className={styles.pr8}>
                        <Select size="large" style={{ width: '100%' }} allowClear placeholder='启用状态' onChange={this.formFilter.bind(this, 'enabled')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>启用</Option>
                            <Option value='false'>禁用</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Select size="large" style={{ width: '100%' }} allowClear placeholder='锁定状态' onChange={this.formFilter.bind(this, 'locked')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>锁定</Option>
                            <Option value='false'>解锁</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Search defaultValue={getQueryString('username')} size="large" placeholder="手机号搜索" style={{width: '100%'}} disabled={load} onSearch={this.formFilter.bind(this, 'username')}/>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
            </div>
        )
    }
}

function mapStateToProps({ modLibrary }) {
    return {
        modLibrary: modLibrary,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        modlibraryget: bindActionCreators(modlibraryget,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLibrary);
