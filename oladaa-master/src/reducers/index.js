import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eventReducer  from './event_reducer';
import authReducer from './auth_reducer';
import locationReducer from './location_reducer';
import weatherReducer from './weather_reducer';
import fitbitReducer from './fitbit_reducer';
/**
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    events: eventReducer,
    location: locationReducer,
    weather: weatherReducer,
    fitbit: fitbitReducer,
});
export default rootReducer;