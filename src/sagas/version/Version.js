import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getVersionList,postVersion,getVersionListOne } from '../../services/version/Version';
import { message,notification } from 'antd';
/*
    组织架构-账号请求
*/
function* getVersion(action) {
    try {
        const { jsonResult } = yield call(getVersionList,action.info);
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/GET/SUCCESS',
                list: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getVersion err");
        console.log(error);
        yield put({
            type: 'VERVERSION/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 获得单个
function* getVersionOne(action) {
    try {
        const { jsonResult } = yield call(getVersionListOne, action.formid);
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/GET/ONE/SUCCESS',
                formdata: jsonResult.data,
            });
        }
    } catch (error) {
        console.log("getVersionOne err");
        message.error(error);
    }
}
// 创建
function* postVersionCreate(action) {
    try {
        const { jsonResult } = yield call(postVersion, action.formdata)
        if (jsonResult.ok) {
            yield put({
                type: 'PERSON/SET/STATUS',
                status: true
            });
            yield put({
                type: 'VERVERSION/SET/STATUS',
                status: true
            });
            notification['success']({
                message: '添加成功'
            })
        }else{
            notification['error']({
                message: jsonResult.errorCode,
                description: jsonResult.errorMsg
            });
            yield put({
                type: 'VERVERSION/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("postVersionCreate err");
        message.error(error);
    }
}

//事件监听

function* watchVersion() {
    yield takeLatest('VERVERSION/GET', getVersion)
}
function* watchVersionOne() {
    yield takeLatest('VERVERSION/GET/ONE', getVersionOne)
}
function* watchVersionCreate() {
    yield takeLatest('VERVERSION/POST/CREATE', postVersionCreate)
}
//启动配置
export default function* () {
    yield fork(watchVersion);
    yield fork(watchVersionOne);
    yield fork(watchVersionCreate);
}
