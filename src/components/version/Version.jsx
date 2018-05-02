import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin, Table, Button, Row, Col, Form, Select, Input, Modal, Checkbox, Popconfirm} from 'antd';
import { verversionget } from '../../action/version/Version';
import moment from 'moment';
import { getQueryString } from '../utils';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class Version extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info } = this.props.verVersion;
        this.props.verversionget(info);
    }
    // 筛选
    formFilter(key, type, value, arg){
        let { info } = this.props.verVersion;
        if(key == 'versionNo'){
            if(type=='enter'){
                if(value.target.value){
                    info.versionNo = value.target.value;
                }else{
                    delete info.versionNo;
                }
            }else{
                if(value){
                    info.versionNo = value;
                }else{
                    delete info.versionNo;
                }
            }
                
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
        this.props.verversionget(info);
        // this.props.accountload(true);
    }
    //分页
    formPage(current, pageSize){
        const { info } = this.props.verVersion;
        info.page = current - 1;
        if(pageSize != info.size){
            info.size = pageSize;
            info.page = 0;
        }
        this.props.verversionget(info);
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
        const { list, info, load } = this.props.verVersion;
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
            { title: '版本号',dataIndex: 'name', key: 'name',},
            { title: '状态',dataIndex: 'version', key: 'status',
                render: (text, record) => (<span>{record.status?'启用':'禁用'}</span>),
            },
            { title: '生成时间',dataIndex: 'creationTime', key: 'creationTime',
                render: (text, record) => record.creationTime?moment(record.creationTime).format("YYYY-MM-DD"):'',
            },
            { title: '发布时间',dataIndex: 'modificationTime', key: 'modificationTime',
                render: (text, record) => record.modificationTime?moment(record.modificationTime).format("YYYY-MM-DD"):'',
            },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    <a onClick={this.setModal.bind(this,)}>编辑</a>
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
                        <Search defaultValue={info.versionNo} placeholder="版本号搜索" enterButton style={{width: '100%'}} disabled={load} onPressEnter={this.formFilter.bind(this, 'versionNo','enter')} onSearch={this.formFilter.bind(this, 'versionNo','noenter')}/>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
            </div>
        )
    }
}

function mapStateToProps({ verVersion }) {
    return {
        verVersion: verVersion,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        verversionget: bindActionCreators(verversionget,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Version);
