import _ from 'lodash';
import { 
    FETCH_USER,
    FETCH_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER
} from '../actions/type';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, [action.payload.id]: action.payload};
        case FETCH_USERS: 
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_USER:
            return { ...state, [action.payload.id]: action.payload};
        case UPDATE_USER:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_USER:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}