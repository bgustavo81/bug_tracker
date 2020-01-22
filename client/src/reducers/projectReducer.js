import _ from 'lodash';
import { 
    FETCH_PROJECT,
    FETCH_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from '../actions/type';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PROJECT:
            return { ...state, [action.payload.id]: action.payload};
        case FETCH_PROJECTS: 
            return { ...state, ..._.mapKeys(action.payload, 'projId')};
        case CREATE_PROJECT:   
            return { ...state, [action.payload.id]: action.payload};
        case UPDATE_PROJECT:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_PROJECT:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
};