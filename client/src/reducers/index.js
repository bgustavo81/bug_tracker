import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import auth from './auth';
import bug from './bug';
import user from './user';
import comment from './comment';
import project from './project';
import alert from './alert';

export default combineReducers({ alert, auth, bug, user, comment, project, alert, form: formReducer });