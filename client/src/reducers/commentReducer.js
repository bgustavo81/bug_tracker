import _ from 'lodash';
import { 
    FETCH_COMMENT,
    FETCH_COMMENTS, 
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../actions/type';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_COMMENT:
            return { ...state, [action.payload.id]: action.payload};
        case FETCH_COMMENTS:
            return { ...state, ..._.mapKeys(action.payload, 'commId')};
        case CREATE_COMMENT:
            return { ...state, [action.payload.id]: action.payload};
        case UPDATE_COMMENT:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_COMMENT:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
};