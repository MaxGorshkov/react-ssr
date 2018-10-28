import axios, { AxiosPromise } from 'axios';

import { isClientSide } from '../../shared';
import { IStorageState } from '../reducers';


export enum ActionType {
    RESET = '@@ssr/RESET',
    SET_TEST_MESSAGE = '@@ssr/SET_TEST_MESSAGE',
    SET_BA_TEST_MESSAGE = '@@ssr/SET_BA_TEST_MESSAGE',
    SET_BB_TEST_MESSAGE = '@@ssr/SET_BB_TEST_MESSAGE',
    CHANGE_THEME = '@@ssr/CHANGE_THEME',
    SSR_COMPLETE = '@@ssr/SSR_COMPLETE',
}

export interface IBaseAction {
    payload?: any;
    type: ActionType;
}

export const getTestMessage = (actionType: ActionType) => {
    return async (dispatch: any, getState: () => IStorageState) => {
        if (isClientSide) {
            console.log('call from client');
        } else {
            console.log('call from server');
        }
        const url = (isClientSide)
        ? 'http://localhost:3001/api/test'
        : 'http://localhost:3001/api/test';
        const axiosPromise: AxiosPromise = axios.get(url);
        const res = await axiosPromise;

        dispatch({
            payload: res.data,
            type: actionType,
        });
    };
};

export const reset = (): IBaseAction => ({
    type: ActionType.RESET
});

export const changeTheme = (): IBaseAction => ({
    type: ActionType.CHANGE_THEME
});

export const ssrComplete = () => {
    return async (dispatch: any, getState: () => IStorageState) => {
        if (!getState().test.ssrComplete) {
            dispatch({
                type: ActionType.SSR_COMPLETE
            });
        }
    };
}
