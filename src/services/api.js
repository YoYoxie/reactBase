const DEV = 'http://39.107.65.234:8099';
const DEVB = 'https://p-api-devb.kanche.com/v1';
const DEVC = 'https://p-api-devc.kanche.com/v1';
const QA = 'https://p-api-qa.kanche.com/v1';
const QAB = 'https://p-api-qab.kanche.com/v1';
const QAC = 'https://p-api-qac.kanche.com/v1';
const PROD = 'https://p-api.kanche.com/v1';
const PRODB = 'https://p-api-pro.kanche.com/v1';

let URL = DEV;
const API = {
    //登录
    LOGIN: URL + '/passport/login',
    LOGOUT: URL + '/passport/logout',
    FORGET: URL + '/forget_password',
    //部门'
    DEPARTMENT_LIST: URL + '/groups',
    // 人员
    PERSON_LIST: URL + '/people',
    /*账号管理列表*/
    USERS: URL + '/users',
    USERS_LIST: URL + '/users/',
    USERS_BUSINESS: URL + '/business_users',
    /*车型库列表*/
    VEHICLE: URL + '/vehicle',
    /*版本列表*/
    VERSION_LIST: URL+ '/vehicleVersion',
    }
export default API;  