import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import sha1 from 'sha1';
import { loginpost, forgetpassword, resetpassword, setstatus, setcode } from '../action/login';

import styles from './login.less';
import background from './background.png';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor (props) {
        super(props)
    }

    handleSubmit (e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.loginpost(data.username, data.passwords)
    }
    forgetSubmit(e){
        e.preventDefault();
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
    onStatus(e){
        this.props.setstatus(e);
    }

    render () {
        const { getFieldDecorator } = this.props.form
        const { status, code } = this.props.login;
        return(
            <div className={styles.loginrow}>
                <Row className={styles.loginrow} style={{backgroundImage: `url(${background})`}} type="flex" justify="space-around" align="middle">
                    <Col xs={{ span: 24 }}>
                        <Row type="flex" justify="center" align="middle">
                            
                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
                                <Row className={styles.title} type="flex" justify="center" align="middle">
                                    <span>车型库管理系统</span>
                                </Row>
                                <Row className={styles.ap} type="flex" justify="center" align="middle">
                                    <span>账户密码登录</span>
                                </Row>
                                <Form layout="horizontal" className={styles.loginform}>
                                    <FormItem wrapperCol={{ span: 24 }} style={{marginBottom:0}}>
                                        {getFieldDecorator('username')(
                                            <Input placeholder="账户"  style={{height:40,marginBottom:10}}/>
                                        )}
                                    </FormItem>
                                    <FormItem wrapperCol={{ span: 24 }} style={{marginBottom:0}}>
                                        {getFieldDecorator('passwords')(
                                            <Input type="password" placeholder="密码" style={{height:40,marginBottom:10}} onPressEnter={this.handleSubmit.bind(this)}/>
                                        )}
                                    </FormItem>
                                    <Row>
                                        <Col span="24">
                                            <Button type="ghost" size="large" className={styles.btnlogin} onClick={this.handleSubmit.bind(this)}>登录</Button>
                                        </Col>
                                    </Row>
                                    {/*<Row>
                                        <Col span="24" style={{ textAlign: "right" }}>
                                            <a onClick={this.onStatus.bind(this, false)} style={{ color: '#F18F68' }}>忘记密码？</a>
                                        </Col>
                                    </Row>*/}
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }
}

Login = Form.create()(Login);

function mapStateToProps({ login }) {
    return {
        login: login,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    loginpost: bindActionCreators(loginpost, dispatch),
    forgetpassword: bindActionCreators(forgetpassword, dispatch),
    resetpassword: bindActionCreators(resetpassword, dispatch),
    setstatus: bindActionCreators(setstatus, dispatch),
    setcode: bindActionCreators(setcode, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
