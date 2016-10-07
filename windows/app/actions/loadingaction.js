import * as types from '../constants/redux';

export function openLoading() {
    return {
        type: types.OPENLOADING
    };
}

export function closeLoading() {
    return {
        type: types.CLOSELOADING
    }
}