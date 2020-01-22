import _ from 'lodash';
import { 
    FETCH_BUG, 
    FETCH_BUGS,
    CREATE_BUG,
    UPDATE_BUG,
    DELETE_BUG
} from '../actions/type';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_BUG:
            return { ...state, [action.payload.id]: action.payload};
        case FETCH_BUGS:
            return { ...state, ..._.mapKeys(action.payload, "bugId")};
        case CREATE_BUG:
            return { ...state, [action.payload.id]: action.payload};
        case UPDATE_BUG:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_BUG:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
};