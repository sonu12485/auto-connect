import { combineReducers } from 'redux';

import userReducer from './userReducer';
import placesReducer from './placesReducer';
import routeReducer from './routeReducer';
import pickupReducer from './pickupReducer';

const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer,
    route: routeReducer,
    pickUpRoute: pickupReducer
});

export default rootReducer;
