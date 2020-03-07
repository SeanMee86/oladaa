import { FETCH_FITBIT } from '../actions/types';
/**
 * @type {{fitbit: Array}}
 */
const default_state = {
    fitbit: [],
};
/**
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = default_state, action){
    switch(action.type){
        case FETCH_FITBIT:
            return {...state, fitbit: [...state, action.payload]
            };
        default: return state;
    }
}