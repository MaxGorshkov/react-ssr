import { renderRoutes, RouteConfig } from 'react-router-config';

import { AComponent } from './aComponent';
import { BComponent } from './bComponent';
import { Home } from './home';
import { ssrResolver } from '../shared';
import { getTestMessage } from '../redux/actions';

const routesConfig: RouteConfig[] = [
    {
        component: ssrResolver(AComponent),
        path: '/a',
    },
    {
        component: ssrResolver(BComponent, getTestMessage),
        path: '/b',
    },
    {
        component: ssrResolver(Home),
        path: '/',
    },
];

export const Content = renderRoutes(routesConfig);
