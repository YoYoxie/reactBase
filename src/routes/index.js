import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
import { Breadcrumb } from 'antd';
import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');

import styles from '../components/Layout.less';
import { getCookie } from '../components/utils';
import Login from '../components/Login';
import Layout from '../components/Layout';

// 车型库
import ModelLibrary from '../components/modellibrary/Modellibrary';

const validate = function(next, replace, callback) {
    // const isLoggedIn = !!getCookie('authorization')
    // if (!isLoggedIn && next.location.pathname != '/login') {
    //     replace('/login')
    // }
    callback()
}

const Home = props => (
    <Layout>
        <div className={styles.layoutcontainer}>
            <div className={styles.layoutbreadcrumb}>
                <Breadcrumb {...props} />
            </div>
            <div className={styles.layoutcontent}>
                {props.children || ModelLibrary}
            </div>
        </div>
    </Layout>
)
const VehModelLibrary = ({ location }) => {
    let Child;
    switch (location.pathname) {
        case '/vehmodlibrary/modlibrary': Child = <ModelLibrary />; break;
        default:      Child = <ModelLibrary />;
    }
    return ( <div>{Child}</div>);
};


const Routes = ({ history }) =>
    <Router history={hashHistory}>
        <Route  path="/" component={Home} onEnter = { validate }>
            <IndexRedirect to = "vehmodlibrary/modlibrary" />
            <Route name="vehmodlibrary" breadcrumbName="车型专业库管理" path="vehmodlibrary" component={VehModelLibrary}>
                <Route breadcrumbName="车型专业库" path="modlibrary"/>
            </Route>
        </Route>
        <Route path = "/login" component = { Login }/>
    </Router>;

export default Routes;
