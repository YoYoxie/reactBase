const DEV = 'http://vehicle-model-dev.aishuaiche.com';
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
    LOGIN: URL + '/user/login',
    LOGOUT: URL + '/passport/logout',
    FORGET: URL + '/forget_password',
    //部门'
    DEPARTMENT_LIST: URL + '/groups',
    // 人员
    PERSON_LIST: URL + '/people',
    /*账号管理列表*/
    USER: URL + '/user',
    USERS_LIST: URL + '/users/',
    USERS_BUSINESS: URL + '/business_users',
    /*车型库列表*/
    VEHICLE: URL + '/vehicle',
    /*版本列表*/
    VERSION_LIST: URL+ '/vehicleVersion',
    /*车型基础库列表*/
    VEHICLE: URL + '/vehicle',
    UPLOAD: URL + '/vehicle/excel/upload',
    /*厂商*/
    MAKER: URL + '/vehicle/maker',
    /*品牌*/
    BRAND: URL + '/vehicle/brand',
    /*车系*/
    SERIES: URL + '/vehicle/series',
    /*车型年款*/
    GENREATION: URL + '/vehicle/genreation/year/model',
    /*配置*/
    CONFIG: URL + '/vehicle/model/config',
    }
export default API;  