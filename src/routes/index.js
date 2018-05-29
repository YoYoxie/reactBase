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
import ModelDetail from '../components/modellibrary/ModelDetail';
// 车型基础库
import ModelBasic from '../components/modellibrary/ModelBasic';
// 车型配置库
import Configure from '../components/configure/Configure';
// 车型版本库
import Version from '../components/version/Version';

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
        case '/vehmodlibrary/modlibrary/moddetail': Child = <ModelDetail />; break;
        case '/vehmodlibrary/modbasic': Child = <ModelBasic />; break;
        default:      Child = <ModelLibrary />;
    }
    return ( <div>{Child}</div>);
};
const ConfigLibrary = ({ location }) => {
    let Child;
    switch (location.pathname) {
        case '/configlibrary/configure': Child = <Configure />; break;
        case '/configlibrary/configure/moddetail': Child = <ModelDetail />; break;
        default:      Child = <Configure />;
    }
    return ( <div>{Child}</div>);
};
const VersionMenu = ({ location }) => {
    let Child;
    switch (location.pathname) {
        case '/version/list': Child = <Version />; break;
        default:      Child = <Version />;
    }
    return ( <div>{Child}</div>);
};


const Routes = ({ history }) =>
    <Router history={hashHistory}>
        <Route  path="/" component={Home} onEnter = { validate }>
            <IndexRedirect to = "vehmodlibrary/modlibrary" />
            <Route name="vehmodlibrary" breadcrumbName="车型完整库管理" path="vehmodlibrary" component={VehModelLibrary}>
                <Route breadcrumbName="车型完整库" path="modlibrary">
                    <Route breadcrumbName="车型详情" path="moddetail"/>
                </Route>
                <Route breadcrumbName="车型基础库" path="modbasic"/>
            </Route>
            <Route name="configlibrary" breadcrumbName="车型配置库管理" path="configlibrary" component={ConfigLibrary}>
                <Route breadcrumbName="车型配置库" path="configure">
                    <Route breadcrumbName="车型详情" path="moddetail"/>
                </Route>
            </Route>
            <Route name="version" breadcrumbName="车型库版本管理" path="version" component={VersionMenu}>
                <Route breadcrumbName="车型库版本" path="list"/>
            </Route>
        </Route>
        <Route path = "/login" component = { Login }/>
    </Router>;

export default Routes;
