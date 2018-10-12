import { ssrComplete } from '../redux/actions';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import { IStorageState } from '../redux/reducers';

export const isServerSide: boolean = (typeof document === 'undefined');
export const isClientSide: boolean = (typeof document !== 'undefined');

let isServerCallPossibility = false;
export const serverCallPossibility = (value?: boolean) => {
  if (value === undefined) {
    return isServerCallPossibility;
  }
  isServerCallPossibility = value;
  return isServerCallPossibility;
};


export const ssrResolver = (
  component: React.ComponentType,
  ssrAction?: (state: IStorageState, dispatch: any) => Promise<void>,
  clientAction?: (state: IStorageState, dispatch: any) => Promise<void>,
  ): React.ComponentClass<any, any> => {

  let storageState: any = null;
  let storageDispatch: any = null;

  const redux = connect(
    (state: any) => {
      storageState = state;
      return {};
    },
    (dispatch: any) => {
      storageDispatch = dispatch;
      return {};
    }
  );

  const lifecycleHooks = lifecycle({
    componentWillMount() {
      (async () => {
        if(ssrAction && serverCallPossibility()) {
          await ssrAction(storageState, storageDispatch);
        }
        storageDispatch(ssrComplete());
      })();
      
    },
  });

  const componentLifecycleHooks = (!!clientAction)
  ? lifecycle({
    componentDidMount() {
      clientAction(storageState, storageDispatch);
    },
  })
  : null;
  
    return compose(
      redux,
      lifecycleHooks,
    )(
      (!!componentLifecycleHooks)
      ? componentLifecycleHooks(component)
      : component);
}