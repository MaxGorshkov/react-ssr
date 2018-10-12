import { connect } from 'react-redux';
import { compose } from 'recompose';

// import { getTestMessage, ssrComplete } from '../../redux/actions';
import { IStorageState } from '../../redux/reducers';
import { InputModel, View } from './view';
// import { serverCallPossibility } from '../../shared';

// let storageDispatch: any = null;

const redux = connect<InputModel>(
  (state: IStorageState) => {
      return {
          text: state.test.text
      };
  },
  // (dispatch: any) => {
  //   storageDispatch = dispatch;
  //   return {};
  // }
);

// const lifecycleHooks = lifecycle({
//   componentWillMount() {
//     (async () => {
//       if(serverCallPossibility()) {
//         await storageDispatch(getTestMessage());
//       }
//       storageDispatch(ssrComplete());
//     })();
//   },
// });

export const BComponent = compose<InputModel, InputModel>(
  redux,
  // lifecycleHooks,
)(View);
