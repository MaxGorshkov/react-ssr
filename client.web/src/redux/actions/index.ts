import axios, { AxiosPromise } from 'axios';

import { isClientSide } from '../../shared';
import { IStorageState } from '../reducers';


export enum ActionType {
    RESET = '@@ssr/RESET',
    SET_TEST_MESSAGE = '@@ssr/SET_TEST_MESSAGE',
    SSR_COMPLETE = '@@ssr/SSR_COMPLETE',
}

export interface IBaseAction {
    payload?: any;
    type: ActionType;
}

export const getTestMessage = () => {
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
            type: ActionType.SET_TEST_MESSAGE,
        });
    };
};

export const Reset = (): IBaseAction => ({
    type: ActionType.RESET
});

export const ssrComplete = () => {
    // return {
    //     type: ActionType.SSR_COMPLETE
    // };
    return async (dispatch: any, getState: () => IStorageState) => {
        if (!getState().test.ssrComplete) {
            dispatch({
                type: ActionType.SSR_COMPLETE
            });
        }
    };
}
