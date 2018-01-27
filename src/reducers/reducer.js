import {RECEIVE_INPUTS} from '../actions/BrowserActions';
const initialState = {};

export default function app(state = initialState, action) {
    switch(action.type) {
        case RECEIVE_INPUTS:
            return Object.assign({}, state, {inputs: action.inputs});
        default:
            return state;
    }
}