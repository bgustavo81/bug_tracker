import _ from 'lodash';
import { 
    FETCH_COMMENT,
    FETCH_COMMENTS, 
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../actions/type';

const initialState = {
    comments: [],
    comment: null
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCH_COMMENT:
            return { 
                ...state, 
                comment: payload
            };
        case FETCH_COMMENTS:
            return { 
                ...state, 
                comments: payload 
            };
        case CREATE_COMMENT:
            return { 
                ...state, 
                comments: [...state.comments, payload]
            };
        case UPDATE_COMMENT:
            return { 
                ...state, 
                comments: [...state.comments, payload]
            };
        case DELETE_COMMENT: 
            return  {
                comments: state.comments.filter(comment => comment.comment_id !== payload)
            }
        default: 
            return state;
    }
};

