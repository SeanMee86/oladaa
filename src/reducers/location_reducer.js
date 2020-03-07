import { SAVE_LOCATION } from '../actions/types';

const default_state = {
    coords: {
        latitude: 33.68,
        longitude: -117.79
    }
};

export default function(state = default_state, action){
    switch(action.type){
        case SAVE_LOCATION:
            return {
                ...state,
                coords: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude
                }
            };
        default:
            return state;
    }
}