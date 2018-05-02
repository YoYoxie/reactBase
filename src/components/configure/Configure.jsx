import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin, Table, Button, Row, Col, Form, Select, Input, Modal, Checkbox, Popconfirm} from 'antd';
import { conconfigget } from '../../action/configure/Configure';
import { getQueryString } from '../utils';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class Configure extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info } = this.props.conConfig;
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
        let { info } = this.props.conConfig;
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
        const { info } = this.props.conConfig;
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
        const { list, info, load } = this.props.conConfig;
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
            { title: 'LevelID',dataIndex: 'username', key: 'username',},
            { title: '厂商', dataIndex: 'person.name', key: 'person.name',},
            { title: '品牌', key: 'isEnabled',
                render: (text, record) => (<span>{record.isEnabled?'启用':'禁用'}</span>),
            },
            { title: '车系', key: 'a',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '车型', key: 'b',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '年款', key: 'c',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '亮点配置', key: 'd',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '更新时间', key: 'e',
                render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    <a onClick={this.setModal.bind(this, record.id, record.person.id)}>编辑</a>
                </span>),
            },
        ];

        return (
            <div className={styles.card} id="area">
                <Row className={styles.gapunusual}>
                    <Col span={3} className={styles.pr8}>
                        <Select style={{ width: '100%' }} allowClear placeholder='启用状态' onChange={this.formFilter.bind(this, 'enabled')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>启用</Option>
                            <Option value='false'>禁用</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Select style={{ width: '100%' }} allowClear placeholder='锁定状态' onChange={this.formFilter.bind(this, 'locked')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>锁定</Option>
                            <Option value='false'>解锁</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Search defaultValue={getQueryString('username')} placeholder="手机号搜索" style={{width: '100%'}} disabled={load} onSearch={this.formFilter.bind(this, 'username')}/>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
            </div>
        )
    }
}

function mapStateToProps({ conConfig }) {
    return {
        conConfig: conConfig,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        conconfigget: bindActionCreators(conconfigget,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configure);
