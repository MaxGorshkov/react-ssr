import { connect } from 'react-redux';
import { compose } from 'recompose';

import { IStorageState } from '../../../redux/reducers';
import { IModel, View } from './view';
import { push } from 'react-router-redux';
import { ActionType } from '../../../redux/actions';

const redux = connect<IModel>(
  (state: IStorageState) => {
      return {
          text: state.test.bbText
      };
  },
  (dispatch: any) => {
    return {
      onClose: async () => {
        dispatch({
          payload: undefined,
          type: ActionType.SET_BB_TEST_MESSAGE,
        });
        dispatch(push('/b'));
      },
      onOpen: async () => {
        dispatch(push('/b/b'));
      },
    };
  }
);

export const BBComponent = compose<IModel, IModel>(
  redux,
)(View);
