import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

import { ITestState, test } from './test';

export interface IStorageState {
    router: RouterState;
    test: ITestState;
}


const rootReducer = combineReducers<IStorageState>({
    router: routerReducer,
    test,
});

export { rootReducer };
