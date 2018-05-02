import xFetch from '../xFetch';
import API from '../api';
/*
    组织架构-账号接口
*/
export async function getConfigureList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.USERS + '?' + item);
}
//请求单条
export async function getConfigureListOne(formid) {
    return xFetch(API.USERS_LIST + formid);
}
//新增数据
export async function postConfigure(formdata) {
    const items = {
        method: "POST",
        body: JSON.stringify(formdata)
    }
    return xFetch(API.USERS, items);
}
