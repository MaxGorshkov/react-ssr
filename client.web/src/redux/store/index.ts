import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import { isClientSide } from '../../shared';
import { IStorageState, rootReducer } from '../reducers';

const logger = createLogger();
export const history: History = isClientSide
    ? createBrowserHistory()
    : createMemoryHistory({});

const middleware: any = [
    thunk,
    routerMiddleware(history),
    process.env.NODE_ENV as any !== 'production' && logger,
].filter(Boolean);

export const configureStore = () => createStore<IStorageState, any, any, any>(
    rootReducer,
    !!isClientSide && (window as any).__PRELOADED_STATE__ || {},
    applyMiddleware(...middleware)
);
