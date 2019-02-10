import { combineReducers } from 'redux';

import userReducer from './userReducer';
import placesReducer from './placesReducer';

const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer
});

export default rootReducer;
