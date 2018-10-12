import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, configureStore } from './App';
import './index.css';
import { serverCallPossibility } from './shared';
import { Provider } from 'react-redux';

const serverStore = (window as any).__PRELOADED_STATE__;

if (!serverStore) {
  serverCallPossibility(true);
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root') as HTMLElement
);

serverCallPossibility(true);
