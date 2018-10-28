import * as React from 'react';
import { connect } from 'react-redux';
import { IStorageState } from '../../redux/reducers';
import { changeTheme } from '../../redux/actions';

interface IModel {
  onClick?: () => void;
}

class View extends React.Component<IModel> {
    public render() {
      return (
          <div>
            <p className="App-intro">
              To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
            <button onClick={this.props.onClick}>change theme</button>
          </div>
      );
    }
}

export const Home = connect(
  (state: IStorageState) => {
    return {
    };
  },
  (dispatch: any) => ({
    onClick: () => {
      dispatch(changeTheme());
    }
  })
)(View);

