import { ssrComplete } from '../redux/actions';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';

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


export const ssrResolver = (component: React.ComponentType, action?: any) => {

  let storageDispatch: any = null;

  const redux = connect(
    (state: any) => ({}),
    (dispatch: any) => {
      storageDispatch = dispatch;
      return {};
    }
  );

  const lifecycleHooks = lifecycle({
    componentWillMount() {
      (async () => {
        if(action && serverCallPossibility()) {
          await storageDispatch(action());
        }
        storageDispatch(ssrComplete());
      })();
      
    },
  });
  
    return compose(
      redux,
      lifecycleHooks,
    )(component);
}