import * as types from '../constants/redux';
import * as load from './loadingaction';
/**
 * 打开登录
 * @return {[type]} [description]
 */
export function openLogin() {
        return {
            type: types.OPENLOGIN
        };
    }
    /**
     * 关闭登录
     * @return {[type]} [description]
     */
export function closeLogin() {
        return {
            type: types.CLOSELOGIN
        };
    }
/**
 * 验证成功
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getAccessSuccess(data) {
    return {
        type: types.ACCESSSUCCESS,
        user: data,
    };
}

function getAccessFail() {
    return {
        type: types.ACCESSFAIL,
    };
}
/**
 * 退出
 * @return {[type]} [description]
 */
export function logOut() {
     return {
        type: types.LOGOUT,
    };
}
export function validatePassword(_accesstoken) {
    return (dispatch) => {
        dispatch(load.openLoading());
        return getAccessSuccess(_accesstoken);
    };
}