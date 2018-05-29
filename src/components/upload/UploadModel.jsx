import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reqwest from 'reqwest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Row, Col, Form, message, Modal, Upload } from 'antd';

const FormItem = Form.Item;

class UploadModel extends React.Component {
        
    constructor (props) {
        super(props)
        this.state = {
            file: null,
        }
    }
    componentWillMount(){
       
    }
    componentDidUpdate(){
        
    }
    //表单提交
    formSubmit (visible) {
        let formData = new FormData();
        formData.append('file',this.state.file);
        formData.append('type',this.props.type)
        reqwest({
            url: 'http://vehicle-model-dev.aishuaiche.com/vehicle/excel/upload',
            method: 'post',
            processData: false,
            type:'json',
            data: formData,
            success: (resp) => {
                let info = {
                    page:0,
                    size:10
                }
                this.props.reload(info)
                this.setState({file: null});
                this.props.setUploading(true);
                message.success('上传成功');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('上传失败');
            },
        });
        this.props.setModal(visible);
    }
    //设置弹窗
    setModal(){
        this.props.setModal(false);
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const { modal,uploading,title } = this.props;
        const props = {
            name: 'file',
            accept: '.xlsx,.xsl',
            action: 'http://vehicle-model-dev.aishuaiche.com/vehicle/excel/upload',
            data:(file) => {
                let filedata = {
                    file:file,
                    type:this.props.type,
                }
                return filedata;
            },
            headers: {
                CORS: '*',
            },
            defaultFileList : [],
            onRemove: (file) => {
                this.setState({file:null})
                this.props.setUploading(true);
                return true;
            },
            beforeUpload: (file) => {
                this.setState({file:file})
                this.props.setUploading(false);
                return false;
            },
            onChange:() =>{
                console.log(1)
            }
        }
        return (
            <Modal title={title} 
                width={500} 
                visible={modal} 
                onOk={this.formSubmit.bind(this,false)} 
                okText = "上传"
                cancelText = "取消"
                confirmLoading={uploading} 
                onCancel={this.setModal.bind(this)}
                >
                <div>
                    <span style={{marginRight:"16px"}}>选择文件</span>
                    <Upload {...props} disabled={!uploading}>
                        <Button loading={!uploading}>选择文件</Button>
                    </Upload>
                </div>
            </Modal>
        )
    }
};

UploadModel = Form.create()(UploadModel);
UploadModel.propTypes = {
    type: PropTypes.string,
    setModal: PropTypes.func,
    setUploading: PropTypes.func,
    reload: PropTypes.func,
};

function mapStateToProps({ }) {
    return {
        
    };
}
function mapDispatchToProps(dispatch) {
    return {
       
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadModel);
