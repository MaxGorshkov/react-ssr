// tslint:disable:no-console
import * as express from 'express';
import * as  fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client.web/src/App';

const staticPath = path.resolve(process.cwd(), '..', 'client.web', 'build');;

const port = 3000;
const server = express();

server.use(express.static(staticPath, { index: false, extensions: ['html']}));

server.get('/', (req: any, res: any) => {
  const body = renderToString(React.createElement(App));

  const filePath = path.resolve(process.cwd(), '..', 'client.web', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        // now inject the rendered app into our html and send it to the client
        return res.send(
            htmlData
                // write the React app
                .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        );
    });
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
