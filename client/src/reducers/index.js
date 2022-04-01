import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import authReducer from './authReducer';
import bugReducer from './bugReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import projectReducer from './projectReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    bug: bugReducer,
    user: userReducer,
    comm: commentReducer,
    proj: projectReducer
});