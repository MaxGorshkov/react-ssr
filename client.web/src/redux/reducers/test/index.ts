import { ActionType } from '../../actions';

export interface ITestState {
    ssrComplete: boolean;
    theme: 'theme-first' | 'theme-second';
    text?: string;
    baText?: string;
    bbText?: string;
}

const initialState: ITestState = {
    baText: undefined,
    bbText: undefined,
    ssrComplete: false,
    text: undefined,
    theme: 'theme-first', 
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
        case ActionType.SET_BA_TEST_MESSAGE:
            return Object.assign({}, state, {
                baText: action.payload,
            });
        case ActionType.SET_BB_TEST_MESSAGE:
            return Object.assign({}, state, {
                bbText: action.payload,
            });
        case ActionType.CHANGE_THEME:
            return Object.assign({}, state, {
                theme: (state.theme === 'theme-first') ? 'theme-second' : 'theme-first',
            });
        case ActionType.RESET:
            return initialState;
        default:
            return state;
    }
};
