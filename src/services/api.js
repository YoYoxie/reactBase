const DEV = 'https://p-api-dev.kanche.com/v1';
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
    /*坐席账号管理列表*/
    AGENTACCOUNT_LIST: URL + '/agent_accounts',
    AGENTACCOUNT_LISTS: URL + '/agent_accounts/',
    /*设备绑定*/

    DEVICES_LIST: URL + '/user_devices',

    URLICES_LIST: URL + '/user_URLices',

    /*角色管理列表*/
    ROLES: URL + '/roles',
    ROLES_LIST: URL + '/roles/',
    /*权限管理列表*/
    AUTHORITIES: URL + '/authorities',
    AUTHORITIES_LIST: URL + '/authorities/',
    AUTHORITIES_GROUPS: URL + '/authority_groups',
    AUTHORITIES_SELECT: URL + '/authority_select',
    /*人员管理列表*/
    PERSONLIST: URL + '/people',
    /*数据字典*/
    DICTIONARY_LIST: URL + '/dictionaries',
    DICTIONARY_LISTS: URL + '/dictionaries/',
    DICTIONARYTAG_LIST: URL + '/dictionary_tags',
    DICTIONARYTAG_LISTS: URL + '/dictionary_tags/',
    /*文件上传配置*/
    UPLOAD_LIST: URL + '/uploader_configs',
    UPLOAD_LISTS: URL + '/uploader_configs/',
    UPLOADERS_LIST: URL + '/uploaders',
    UPLOADERS_LISTS: URL + '/uploaders/',
    UPLOADERS_AUTH: URL + '/uploader_authorizations',
    /*菜单管理*/
    MENU: URL + '/menus',
    MENU_APP: URL + '/menus/app',
    /*
        门店
    */
    STORES_LIST: URL + '/stores',
    STORES_LISTS: URL + '/stores/',
    STORES_STATUS: URL + '/stores/status',
    /*新门店列表*/
    STORES_LIST_NEW: URL + '/stores/new_store',
    STORES_LISTS_NEW: URL + '/stores',
    STORES_STATUS_NEW: URL + '/stores/status',
    /*门店审核申请和任务*/
    STORE_APP: URL + '/stores/store_application',
    STORE_TASK: URL + '/stores/store_task',
    /*车商列表*/
    DEALERS_LIST: URL + '/car_dealers/query/bss',
    DEALERS_LISTS: URL + '/car_dealers',
    /*认证申请列表*/
    CERTUFUCATE_LIST: URL + '/certificate_applies/query/bss',
    CERTUFUCATE_LISTS: URL + '/certificate_applies',
    /*认证任务列表*/
    CERTUFUCATE_TASKLIST: URL + '/certificate_tasks',
    /*认证任务列表*/
    DEALERS_RELATIONS: URL + '/car_dealers/relations',
    /*
        车源
    */
    /*车源列表*/
    VEHICLE_LIST: URL + '/vehicles',
    VEHICLE_LISTS: URL + '/vehicles/',
    /*车源搜索*/
    VEHICLE_SHARE_LIST: URL + '/search/vehicles',
    VEHICLE_SHARE_LISTS: URL + '/search/vehicles/',
    /*
        车辆推广
    */
    /*车源审核申请*/
    VEHICLE_AUDIT_APPLICATIONS: URL + '/vehicles/audit_applications',
    /*车源审核任务*/
    VEHICLE_AUDIT_TASKS: URL + '/vehicles/audit_tasks',
    /*可分发网站*/
    VEHICLE_SHARE_WEBSITE: URL + '/vehicle_share/share_websites',
    /*车型匹配任务*/
    VEHICLE_SPEC_MACTH_TASKS: URL + '/vehicle_share/vehicle_spec_match_tasks',
    /*车型库匹配成功-网站*/
    VEHICLE_SHARE_SPEC_WEBSITE: URL + '/vehicle_share/spec_websites',
    /*采集推广申请*/
    VEHICLE_SHARE_APPLICATION: URL + '/vehicle_share/share_process/applications',
    /*采集推广任务*/
    VEHICLE_SHARE_COLSPR_TASK: URL + '/vehicle_share/share_process/tasks',
    /*发车账号*/
    SHARE_ACCOUNTS: URL + '/share_accounts',
    SHARE_ACCOUNTS_LIST: URL + '/share_accounts/',
    /*聚合发车账号列表*/
    SHARE_ACCOUNTS_STORE_LIST: URL + '/share_accounts/store_available/accounts_list',
    /*发车规则*/
    SHARE_RULES: URL + '/share_rules',
    SHARE_RULES_LIST: URL + '/share_rules/',
    /*发车定义*/
    SHARE_DEFINITIONS: URL + '/share_definitions',
    /*发车历史*/
    SHARE_DEFINITIONS_HISTORY: URL + '/share_definitions/',
    /*补发列表*/
    SHARE_REDEFINITIONSLIST: URL + '/addsend_definitions',
    /*补发账号*/
    SHARE_ACCOUNTS_STORE_REPASS_LIST: URL + '/share_accounts/store_available/add_send_accounts_list',
    /*改价*/
    VEHICLE_CHANGE: URL + '/vehicles/change_price_applications',
    VEHICLE_CHANGE_TASK: URL + '/vehicles/change_price_tasks',
    /*发车申请*/
    VEHICLE_SHARE_APP: URL + '/vehicles/share_change_price_applications',
    VEHICLE_SHARE_TASK: URL + '/vehicles/share_change_price_tasks',
    /*车源亮点图片*/
    VEHICLE_HIGHLIGHTS: URL + '/legacy_spec/vehicle_highlights/',
    /*按VIN码查询车型*/
    VEHICLE_VIN: URL + '/legacy_spec/vehicle_vin_specs/',
    /*按levelId查询看车车型*/
    VEHICLE_KC_LEVELID: URL + '/legacy_spec/vehicle_brief_specs/',
    /*按levelId查询车型*/
    VEHICLE_LEVELID: URL + '/thirdparty_spec/match/',
    /*易鑫车型库下拉*/
    VEHICLE_YIXIN: URL + '/yixin_spec/select?',
    /*易鑫车型库*/
    VEHICLE_YIXIN_MODELID: URL + '/yixin_spec/vehicle_spec/style/',
    /*一步一步选择车型*/
    VEHICLE_STEP: URL + '/legacy_spec/vehicle_brief_specs',
    VEHICLE_THRID_STEP: URL + '/thirdparty_spec/select?',
    VEHICLE_THRID_UPDATE: URL + '/thirdparty_spec/manual_rematch',
    /*车型匹配列表*/
    VEHICLE_MATCH: URL + '/thirdparty_spec/manual_rematch_logs',
    /*车型库审核申请*/
    VEHICLE_MODELS_APPLICATION: URL + '/vehicle_share/vehicle_spec_library_match_applications',
    /*车型库审核申请批量创建*/
    VEHICLE_MODELS_APPLICATIONS: URL + '/vehicle_share/vehicle_spec_library_batch_match_applications',
    /*车型库审核任务*/
    VEHICLE_MODELS_TASK: URL + '/vehicle_share/vehicle_spec_library_match_tasks',
    /*
        C2C业务
    */
    /*车辆检测信息*/
    VEHICLE_REPORTS: URL + '/reports/bss',
    /*车型审核任务*/
    VEHICLE_C2C_MATCH_TASK: URL + '/vehicle_share/c2c_vehicle_spec_match_tasks',
    /*
        客户
    */
    CUSTOMER_LIST: URL + '/customers',
    CUSTOMER_LISTS: URL + '/customers/',
    /*
        工单
    */
    TICKETS_LIST: URL + '/tickets',
    TICKETS_LISTS: URL + '/tickets/',
    /*工单通过invoke查询*/
    TICKETS_INVOKE: URL + '/tickets/invoke/',
    /*导出工单*/
    TICKETS_FILE: URL + '/tickets/generate_file',
    TICKETS_DOWNLOAD: URL + '/tickets/download',
    /*工单查线索*/
    CLUES_TICKET: URL + '/clues/search/ticket/',
    /*外呼线索*/
    CLUES_CALLOUT: URL + '/callout_clues',
    /*外呼线索导入*/
    CLUES_CALLOUT_IMPORT: URL + '/callout_clues/import',
    /*外呼线索导出*/
    CLUES_CALLOUT_EXPORT: URL + '/callout_clues/export',
    /*外呼申请*/
    CALLOUT_APPLICATION: URL + '/call_out_clue_applications',
    /*外呼任务*/
    CALLOUT_TASK: URL + '/call_out_tasks',
    /*外呼任务*/
    CALLOUT_QIMO: URL + '/callcenter_qimo',
    /*外呼查询淘车支付状态*/
    CALLOUT_STATUS: URL + '/clues/findStatus',
    /*通话记录*/
    CALLRECORDS_LIST: URL + '/callcenter_qimo/callrecords',
    /*
        线索管理
    */
    CLUES_MANAGE: URL + '/clues',
    /*卖车线索*/
    CLUES_SELL: URL + '/sell_clues',
    /*买车线索*/
    CLUES_BUY: URL + '/buy_clues',
    /*
        金融管理
    */
    /*金融公司列表*/
    FINANCE_COMPANYLIST: URL + '/finance_companies',
    FINANCE_COMPANYLISTS: URL + '/finance_companies/',
    /*金融产品列表*/
    FINANCE_PRODUCTLIST: URL + '/finance_products',
    FINANCE_PRODUCTLISTS: URL + '/finance_products/',
    /*金融单*/
    APPLICATION_FORMS: URL + '/application_forms',
    /*金融申请单*/
    FINANCE_FORMS: URL + '/finance_forms',
    /*金融提报*/
    SUBMISSION_APPLIES: URL + '/submission_applies',
    SUBMISSION_TASKS: URL + '/submission_tasks',
    /*
        检测
    */
    INSPECTION_LIST: URL + '/inspection_lists',
    INSPECTION_LISTS: URL + '/inspection_lists/',
    INSPECTION_INFO: URL + '/inspections/',
    INSPECTION_FLOWS: URL + '/inspection_flows',
    /*评估*/
    EVALUATION_LISTS: URL + '/evaluation_applies',
    EVALUATION_LIST: URL + '/evaluation_applies/',
    EVALUATION_FLOWS: URL + '/evaluation_flows',
    /*评估任务*/
    EVALUATION_TASKS: URL + '/evaluation_tasks',
    /*评估业务*/
    EVALUATION_BUSINESS: URL + '/evaluations',
    /*第三方评估价格*/
    EVALUATION_ALL: URL + '/evaluation_all',
    /*映射关系配置*/
    MAPPING_CONFIGS_LIST: URL + '/mapping_configs',
    /*保险延保*/
    PROXY_COMPANIES: URL + '/proxy_companies',
    PROXY_PRODUCTS: URL + '/proxy_products',
    /*培训*/
    LEARNS: URL + '/learns',
    CLASSES: URL + '/learns/classes',
    LEARNSBSS: URL + '/learns/bss/list',
    /*视频地址转换*/
    OSSPATH: URL + '/ossPath',
    /*Bugtags*/
    BUGTAGS: URL + '/bugtags',
    BUGLIST: URL + '/bugtags/bss/list',
    /*配置文件*/
    DEPLOY_CONFIGS: URL + '/configs',
    DEPLOY_TAGS: URL + '/tags',
    DEPLOY_ALLLICATIONS: URL + '/applications',
    DEPLOY_RELEASES: URL + '/releases',
    DEPLOY_RELEASES_ONLINE: URL + '/releases/online/',
    /*短信设置*/
    DEPLOY_MESSAGE: URL + '/message',
    DEPLOY_VERIFIES: URL + '/verifies',
    /*金融申请*/
    APPLICATION_FINANCE: URL + '/finance_applies',
    /*检测申请*/
    APPLICATION_INSPECTION: URL + '/inspection_applies/',
    /*评估申请*/
    APPLICATION_EVALUATION: URL + '/evaluation_applies/',
    /*提报申请*/
    APPLICATION_SUBMISSION: URL + '/submission_applies/',
    /*保险申请*/
    APPLICATION_INSURANCE: URL + '/insurance_applies/',
    /*延保申请*/
    APPLICATION_EXWARRANTY: URL + '/warranty_applies/',
    /*提报申请*/
    APPLICATION_SUBMISSION: URL + '/submission_applies/',
    /*签约申请*/
    APPLICATION_SIGN: URL + '/signing/application_forms/',
    /*带看业务*/
    BUSINESS_TAKELOOK: URL + '/clue_apply/',
    /*签约业务*/
    BUSINESS_SIGNFORM: URL + '/signing/contracts/',
    /*金融单业务*/
    BUSINESS_FINANCEFORM: URL + '/finance_forms/',
    /*贷前审查*/
    CREDIT_REPORT: URL + '/third_party/loans/pre_review_report/',
    /*通知方式*/
    NOTICES_MODE: URL + '/notices/modes',
    NOTICES_MODES: URL + '/notices/modes/',
    /*通知管理*/
    NOTICES_CONFIGURE: URL + '/notices/configures',
    NOTICES_CONFIGURES: URL + '/notices/configures/',
    /*竞对公司*/
    INFO_COMPANY: URL + '/info/company',
    INFO_COMPANYS: URL + '/info/company/',
    /*竞对金融产品*/
    INFO_PRODUCT: URL + '/info/product/bss/list',
    INFO_PRODUCTS: URL + '/info/product/',
    /*竞对情报单*/
    INFO_INTELLIGENCE: URL + '/info/intelligence_form/bss/list',
    INFO_INTELLIGENCES: URL + '/info/intelligence_form/',
    INFO_INTELLIGENCEDOWNLOAD: URL + '/info/intelligence_form/download',
    /*竞对情报任务*/
    INFO_INTELLIGENCETASK: URL + '/info/intelligence_task/bss/list',
    INFO_INTELLIGENCETASKS: URL + '/info/intelligence_task/',
    /*
        绩效考核
    */
    /*考核项*/
    PERFORMANCE: URL + '/performance/item',
    /*考核组*/
    PERFORMANCE_GROUP: URL + '/performance/group',
    /*考核模版*/
    PERFORMANCE_TEMPLATE: URL + '/performance/template',
    /*考核项目*/
    PERFORMANCE_ASSESSMENT: URL + '/performance/assessment',
    /*考核详情*/
    PERFORMANCE_RECORD: URL + '/performance/record',
    /*考核项目导出*/
    PERFORMANCE_EXCEL: URL + '/performance/excel',
    /*
        收付款
    */
    /*确认函*/
    CONFIRM_ORDERS: URL + '/confirmation_orders',
    /*服务协议*/
    SIGN_RECORD: URL + '/sign/record/list',
    /*服务协议导出*/
    SIGN_EXPORT: URL + '/sign/export',
    /*付款审批*/
    PAYMENT_APPROVAL: URL + '/payment_order_approval',
    /*付款审批导出*/
    PAYMENT_APPROVAL_EXPORT: URL + '/payment_order_approval/todo/down',
    /*付款单*/
    PAYMENT_ORDERS: URL + '/payment_orders',
    /*收款审批*/
    COLLECTION_APPROVAL: URL + '/collection_order_approval',
    /*收款单*/
    COLLECTION_ORDERS: URL + '/collection_orders',
    /*银行交易记录*/
    PAYMENT_TRADE: URL + '/cmb/trade_record',
    /*付款单管理列表*/
    PAYMENT_ORDER_LIST: URL + '/cmb/charge_orders',
    /*创建制单*/
    PAYMENT_ORDER_CHARGE: URL + '/cmb/charge_orders/charge',
    /*重新向网银制单*/
    PAYMENT_ORDER_RECHARGE: URL + '/cmb/charge_orders/recharge',
    /*查询最新结果*/
    PAYMENT_ORDER_FRESH: URL + '/cmb/charge_orders/fresh',
    /*银行回单*/
    PAYMENT_REPLY_LIST: URL + '/cmb/reply_slip',
    /*
        代付款
    */
    /*代付款审批管理*/
    ADVANCES_APPROVAL: URL + '/mats',
    //退款
    PAYMENT_REFUND: URL + '/refundOrderApproval',
    PAYMENT_REFUND_ORDER: URL + '/refundOrder',
    /*
        数据
    */
    /*回款明细*/
    DATA_COLLECTIONORDERS: URL + '/collectionOrders/',
}

export default API;
