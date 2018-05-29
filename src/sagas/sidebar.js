import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getMenuApp } from '../services/sidebar';
import { message, notification } from 'antd';

/*
 * 一个 saga 就是一个 Generator Function
 *
 * 每当 store.dispatch `LOGIN` action 的时候都会调用 loginPost.
 */

function* sidebarGet(action) {
    // try {
    //     const { jsonResult } = yield call(getMenuApp);
    //     if (jsonResult.ok) {
            yield put({
                type: 'SIDEBAR/GET/SUCCESS',
                list: [
                {
                    "categoryName":null,
                    "extParam":"/vehmodlibrary",
                    "iconUri":"appstore-o",
                    "iconUri2":null,
                    "id":81,
                    "menuName":"车型专业库管理",
                    "menus":[
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/modlibrary",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":125,
                            "menuName":"车型专业库",
                            "menus":[

                            ],
                            "parentMenu":"车型专业库管理",
                            "parentMenuId":81
                        },
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/modbasic",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":128,
                            "menuName":"车型基础库",
                            "menus":[

                            ],
                            "parentMenu":"车型专业库管理",
                            "parentMenuId":81
                        }
                    ],
                    "parentMenu":"顶级节点",
                    "parentMenuId":null
                },
                {
                    "categoryName":null,
                    "extParam":"/configlibrary",
                    "iconUri":"appstore-o",
                    "iconUri2":null,
                    "id":82,
                    "menuName":"车型库配置管理",
                    "menus":[
                        {
                            "categoryName":null,
                            "extParam":"/configlibrary/configure",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":126,
                            "menuName":"车型库配置",
                            "menus":[

                            ],
                            "parentMenu":"车型库配置管理",
                            "parentMenuId":82
                        }
                    ],
                    "parentMenu":"顶级节点",
                    "parentMenuId":null
                },
                {
                    "categoryName":null,
                    "extParam":"/version",
                    "iconUri":"appstore-o",
                    "iconUri2":null,
                    "id":83,
                    "menuName":"车型库版本管理",
                    "menus":[
                        {
                            "categoryName":null,
                            "extParam":"/version/list",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":127,
                            "menuName":"车型库版本",
                            "menus":[

                            ],
                            "parentMenu":"车型库版本管理",
                            "parentMenuId":83
                        }
                    ],
                    "parentMenu":"顶级节点",
                    "parentMenuId":null
                }
                ]
            });
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}

function* watchSidebar() {
    yield takeLatest('SIDEBAR/GET', sidebarGet)
}

export default function* () {
    yield fork(watchSidebar);
}
