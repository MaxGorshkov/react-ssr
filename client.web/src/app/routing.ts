import { renderRoutes, RouteConfig } from 'react-router-config';

import { AComponent } from './aComponent';
import { BComponent } from './bComponent';
import { Home } from './home';
import { ssrResolver } from '../shared';
import { getTestMessage, ActionType } from '../redux/actions';
import { IStorageState } from '../redux/reducers';

const routesConfig: RouteConfig[] = [
    {
        component: ssrResolver(BComponent,
            async (state: IStorageState, dispatch: any) => {
                if (!state.test.text) {
                    await dispatch(getTestMessage(ActionType.SET_TEST_MESSAGE));
                }
            },
            async (state: IStorageState, dispatch: any) => {
                await dispatch(getTestMessage(ActionType.SET_BA_TEST_MESSAGE));
            },),
        path: '/b/a',
    },
    {
        component: ssrResolver(BComponent,
            async (state: IStorageState, dispatch: any) => {
                if (!state.test.text) {
                    await dispatch(getTestMessage(ActionType.SET_TEST_MESSAGE));
                }
                await dispatch(getTestMessage(ActionType.SET_BB_TEST_MESSAGE));
            }),
        path: '/b/b',
    },
    {
        component: ssrResolver(AComponent),
        path: '/a',
    },
    {
        component: ssrResolver(BComponent,
            async (state: IStorageState, dispatch: any) => {
                await dispatch(getTestMessage(ActionType.SET_TEST_MESSAGE));
            }),
        path: '/b',
    },
    {
        component: ssrResolver(Home),
        path: '/',
    },
];

export const Content = renderRoutes(routesConfig);
