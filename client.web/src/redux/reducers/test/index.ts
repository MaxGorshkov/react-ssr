import { ActionType } from '../../actions';

export interface ITestState {
    ssrComplete: boolean;
    text: string;
}

const initialState: ITestState = {
    ssrComplete: false,
    text: 'initial text',
};

export const test = (state: ITestState = initialState, action: any): ITestState => {
    switch (action.type) {
        case ActionType.SSR_COMPLETE:
        return Object.assign({}, state, {
            ssrComplete: true,
        });
        case ActionType.SET_TEST_MESSAGE:
            return Object.assign({}, state, {
                text: action.payload,
            });
        // case '@@router/LOCATION_CHANGE':
        case ActionType.RESET:
            return initialState;
        default:
            return state;
    }
};
