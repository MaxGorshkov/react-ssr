import * as React from 'react';
import { ConnectedRouter, push } from 'react-router-redux';
import './App.css';

import logo from './assets/logo.svg';

import { History } from 'history';
import { Content } from './app/routing';
import { configureStore, history } from './redux/store';
import { connect } from 'react-redux';
import { IStorageState } from './redux/reducers';
export { configureStore }

export interface IAppInputModel {
  history?: History;
  dispatch?: any;
  theme: string;
}

class View extends React.Component<IAppInputModel> {

  public render() {
    const { dispatch } = this.props;
    return (
        <ConnectedRouter history={this.props.history || history}>
          <div className={this.props.theme} style={{height: "100%"}}>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
                <li>
                  <ul>
                    <span onClick={() => dispatch(push('/'))}>Home</span>
                  </ul>
                  <ul>
                    <span onClick={() => dispatch(push('/a'))}>A</span>
                  </ul>
                  <ul>
                    <span onClick={() => dispatch(push('/b'))}>B</span>
                  </ul>
                </li>
              </header>
              { Content }
            </div>
          </div>
        </ConnectedRouter>
    );
  }
}

export const App = connect(
  (state: IStorageState) => {
    return {
        theme: state.test.theme
    };
  },
)(View);