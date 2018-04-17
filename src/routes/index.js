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

const validate = function(next, replace, callback) {
    // const isLoggedIn = !!getCookie('authorization')
    // if (!isLoggedIn && next.location.pathname != '/login') {
    //     replace('/login')
    // }
    // callback()
}

const Home = props => (
    <Layout>
        <div className={styles.layoutcontainer}>
            <div className={styles.layoutbreadcrumb}>
                <Breadcrumb {...props} />
            </div>
            <div className={styles.layoutcontent}>
                {props.children || Department}
            </div>
        </div>
    </Layout>
)
// const Organizations = ({ location }) => {
//     let Child;
//     switch (location.pathname) {
//         case '/organization/department': Child = <Department />; break;
//         case '/organization/person': Child = <Person />; break;
//         case '/organization/account': Child = <Account />; break;
//         case '/organization/role': Child = <Role />; break;
//         case '/organization/authorities': Child = <Authorities />; break;
//         case '/organization/agentaccount': Child = <Agentaccount />; break;
//         case '/organization/mapping': Child = <Mapping />; break;
//         default:      Child = <Department />;
//     }
//     return ( <div>{Child}</div>);
// };


const Routes = ({ history }) =>
    <Router history={hashHistory}>
        <Route  path="/" component={Home} onEnter = { validate }>
            {/*<IndexRedirect to = "train/test" />*/}
            
        </Route>
        <Route path = "/login" component = { Login }/>
    </Router>;

export default Routes;
