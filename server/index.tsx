// tslint:disable:no-console
import * as cors from 'cors';
import * as express from 'express';
import * as  fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { Provider } from 'react-redux';

import { renderToString } from 'react-dom/server';
import { App, configureStore } from '../client.web/src/App';

const dotenv = require('dotenv');
dotenv.load({ path: '.env' });

import createMemoryHistory from 'history/createMemoryHistory';
import { IStorageState } from '../client.web/src/redux/reducers';
import { serverCallPossibility } from '../client.web/src/shared';

const staticPath = path.resolve(process.cwd(), '..', 'client.web', 'build');;

const port = 3001;
const server = express();

server.use(express.static(staticPath, { index: false, extensions: ['html']}));

const corsOptions = {
    origin: (origin, callback) => {
        const originsWhitelist = process.env.CORS_ORIGINS_WHITE_LIST;
        let originResult = false;
        if (originsWhitelist
            && ((originsWhitelist === '*')
            || (originsWhitelist.split(',').indexOf(origin) !== -1))
        ) {
            originResult = origin;
        }
        callback(null, originResult);
    },
    credentials: true
};

server.use(cors(corsOptions));

server.get('/api/test', (req: any, res: any) => {
    console.log('call /api/test');
    res.send(`${new Date().getTime()}`);
});


const ssrComplete = (node: React.Element, store: any): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        let complete = false;
        const handleChange = () => {
            const state: IStorageState = store.getState();
            if (!complete && state.test.ssrComplete) {
                complete = true;
                serverCallPossibility(false);
                const body = renderToString(node);

                const filePath = path.resolve(process.cwd(), '..', 'client.web', 'build', 'index.html');
        
                fs.readFile(filePath, 'utf8', (err, htmlData) => {
                    if (err) {
                        console.error('err', err);
                        reject();
                    }
                    const result = htmlData.replace('<div id="root"></div>', `<div id="root">${body}</div>\
<script type="text/javascript">window.__PRELOADED_STATE__= ${JSON.stringify(state)}</script>`);
                    resolve(result);
                });
            }
        };
        store.subscribe(handleChange);
        serverCallPossibility(true);
        renderToString(node);
    });
}

server.get('*', (req: any, res: any) => {
    const serverStore = configureStore();

    const app = (
        <Provider store={serverStore}>
            <App history={createMemoryHistory({
                initialEntries: [
                    req.url
                ]
            })} />
        </Provider>
    );

    ssrComplete(app, serverStore)
        .then(message => res.send(message))
        .catch(() => res.status(404).end());
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
