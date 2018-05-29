import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { Table, Button, Row, Col, Select, Input, Icon, Modal} from 'antd';
import { modlibraryget,modlibrarymodal,modlibraryuploading } from '../../action/modellibrary/Modellibrary';
import { verversionpost } from '../../action/version/Version';
import { getQueryString } from '../utils';
import UploadModel from '../upload/UploadModel';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class ModelLibrary extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            visible: false
        }
    }

    componentWillMount(){
        let { info } = this.props.modLibrary;
        this.props.modlibraryget(info);
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
        this.props.modlibraryget(info);
    }
    //设置弹窗
    setModal(key, value){
        this.props.modlibrarymodal(true);
    }
    //查看
    onLook(formid){
        hashHistory.push(`/vehmodlibrary/modlibrary/moddetail?q=&id=`+formid);
    }
    release(){
        this.props.verversionpost();
        this.modal(false);
    }
    modal(boolean){
        this.setState({visible:boolean})
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
        const { list, info, load, uploading, modal } = this.props.modLibrary;
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
            { title: 'LevelID',dataIndex: 'levelId', key: 'levelId',},
            { title: '厂商', dataIndex: 'makerName', key: 'makerName',},
            { title: '品牌', dataIndex: 'brandName', key: 'brandName',},
            { title: '车系', dataIndex: 'seriesName', key: 'seriesName',},
            { title: '车型', dataIndex: 'genreationYearModel', key: 'genreationYearModel',},
            { title: '年款', dataIndex: 'genreationYear', key: 'genreationYear',},
            { title: '销售名称', dataIndex: 'saleName', key: 'saleName',},
            { title: '状态', dataIndex: 'status', key: 'status',
                render: (text, record) => (<span>{record.status=='show'?'显示':'隐藏'}</span>),
            },
            // { title: '更新时间', dataIndex: 'time', key: 'e',
            //     render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            // },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    <a onClick={this.onLook.bind(this, record.id)}>查看</a>
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
                    <Col style={{ float: "right"}}>
                        <Button style={{ marginRight: "12px"}} size="large" onClick={this.setModal.bind(this)}><Icon type="upload" />上传车型完整库</Button>
                        <Button size="large" type="primary" onClick={this.modal.bind(this,true)}>发布车型完整库</Button>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
                <UploadModel 
                    title = "上传车型完整库"
                    type="config" 
                    uploading={uploading} 
                    modal = {modal} 
                    setModal={this.props.modlibrarymodal.bind(this)} 
                    setUploading={this.props.modlibraryuploading.bind(this)}
                    reload = {this.props.modlibraryget.bind(this)} />
                <Modal
                    title="发布车型完整库"
                    visible={this.state.visible}
                    okText = "发布"
                    cancelText = "取消"
                    onOk={this.release.bind(this)}
                    onCancel={this.modal.bind(this,false)}
                >
                    <p style={{textAlign:'center'}}>请确认车型完整库已更新到最新</p>
                </Modal>
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
        modlibrarymodal: bindActionCreators(modlibrarymodal,dispatch),
        modlibraryuploading: bindActionCreators(modlibraryuploading,dispatch),
        verversionpost: bindActionCreators(verversionpost,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLibrary);
