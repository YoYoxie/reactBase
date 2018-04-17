import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'js-cookie';
import { Form, Input, Button, Row, Col, Modal, Menu, Icon, notification } from 'antd';
import { forgetpassword, resetpassword, setstatus, setcode, logoutpost } from '../action/login';
import { accountgetinfo } from '../action/organization/Account';

const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
import styles from './Submenu.less';

class Submenu extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount(){
        this.props.accountgetinfo(cookie.get('userId'));
    }
    //获取Code
    getCode(){
        const data = this.props.form.getFieldsValue();
        let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(data.phone)) {
            this.props.forgetpassword(data.phone);
            //
            //let countdown = 59;
            const settime = (countdown) => {
                if (countdown == 0) {
                    this.props.setcode(60);
                } else {
                    this.props.setcode(countdown);
                    countdown--;
                    setTimeout(function() {
                        settime(countdown)
                    }, 1000)
                }
            };
            setTimeout(function() {
                settime(59)
            }, 1000);
        }else{
            notification['error']({
                message: '请输入正确手机号',
            });
        };
        //console.log(data.phone);
    }
    //修改密码
    forgetSubmit(e){
        const data = this.props.form.getFieldsValue();
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        let patrn=/(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,20}$/;
        if (!reg.test(data.phone)) {
            notification['error']({
                message: '请输入正确手机号',
            });
        }else if(data.code == null){
            notification['error']({
                message: '验证码不能为空',
            });
        }else if(data.password == null){
            notification['error']({
                message: '密码不能为空',
            });
        }else if(!patrn.exec(data.password)){
            notification['error']({
                message: '密码强度不足',
            });
        }else if(data.password != data.confirm){
            notification['error']({
                message: '两次密码不同',
            });
        }else{
            this.props.resetpassword(data);
        }
    }
    //导航链接
    onSubmenu(e){
        if(e.key == "forget"){
            this.onStatus(false);
        }
        if(e.key == "logout"){
            this.props.logoutpost();
        }
    }
    //设置Status
    onStatus(e){
        this.props.setstatus(e);
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const { status, code } = this.props.login;
        const { mydata } = this.props.orgAccount;
        return(
            <Menu className={styles.headermenu} mode="horizontal" onClick={this.onSubmenu.bind(this)}>
                <SubMenu title={<span style={{color:'#F18F68'}}><Icon type="user" />{mydata.person?mydata.person.name:''}</span>}>
                    <Menu.Item key="forget">修改密码</Menu.Item>
                    <Menu.Item key="logout">退出</Menu.Item>
                </SubMenu>
                {/*<Menu.Item key="download">
                    <Link to="/system/download"><Icon type="download" style={{color:'#fff'}}/><span style={{color:'#fff'}}>下载</span></Link>
                </Menu.Item>*/}
                <Modal title="修改密码" wrapClassName="vertical-center-modal" width={400} visible={!status} onOk={this.forgetSubmit.bind(this)} onCancel={this.onStatus.bind(this, true)}>
                    <Form horizontal className={styles.loginform} onSubmit={this.forgetSubmit.bind(this)}>
                        <FormItem label="手机号" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} style={{marginBottom:0}}>
                            {getFieldDecorator('phone', {initialValue: cookie.get('userPhone')})(
                                <Input placeholder="请输入手机号" style={{height:30,marginBottom:5}}/>
                            )}
                        </FormItem>
                        <FormItem label="验证码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} style={{marginBottom:0}}>
                            {getFieldDecorator('code')(
                                <Input placeholder="请输入验证码"   style={{height:30,marginBottom:5}}/>
                            )}
                            <Button type="primary" className={styles.btncode} onClick={this.getCode.bind(this)} disabled={code == 60?'':'disabled'}>{code == 60 ? '获取验证码':code+'秒后获取'}</Button>
                        </FormItem>
                        <FormItem label="密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} style={{marginBottom:0}}>
                            {getFieldDecorator('password')(
                                <Input type="password" placeholder="请输入密码"  style={{height:30,marginBottom:5}}/>
                            )}
                        </FormItem>
                        <FormItem label="确认密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} style={{marginBottom:0}}>
                            {getFieldDecorator('confirm')(
                                <Input type="password" placeholder="再次输入密码"  style={{height:30,marginBottom:5}}/>
                            )}
                        </FormItem>
                        <Row>
                            <Col span="18" offset="5">
                                <div>a、密码长度必须介于8到20个字符之间</div>
                                <div>b、密码只能包含英文字母(A-Z)、数字字符(0-9)</div>
                                <div>c、密码至少包含1个英文字母和1个数字字符</div>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Menu>
        )
    }
}

Submenu = Form.create()(Submenu);

function mapStateToProps({ login, orgAccount }) {
    return {
        login: login,
        orgAccount: orgAccount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        forgetpassword: bindActionCreators(forgetpassword, dispatch),
        resetpassword: bindActionCreators(resetpassword, dispatch),
        setstatus: bindActionCreators(setstatus, dispatch),
        setcode: bindActionCreators(setcode, dispatch),
        logoutpost: bindActionCreators(logoutpost, dispatch),
        accountgetinfo: bindActionCreators(accountgetinfo, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);
