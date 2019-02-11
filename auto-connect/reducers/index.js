import { combineReducers } from 'redux';

import userReducer from './userReducer';
import placesReducer from './placesReducer';
import routeReducer from './routeReducer';

const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer,
    route: routeReducer
});

export default rootReducer;
