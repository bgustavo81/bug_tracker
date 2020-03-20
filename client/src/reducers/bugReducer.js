import _ from 'lodash';
import { 
    FETCH_BUG, 
    FETCH_BUGS,
    CREATE_BUG,
    UPDATE_BUG,
    DELETE_BUG
} from '../actions/type';

const initialState = {
    bugs: [],
    bug: null
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_BUG:
            return { 
                ...state, 
                bug: payload
            };
        case FETCH_BUGS:
            return { 
                ...state, 
                bugs: payload 
            };
        case CREATE_BUG:
            return { 
                ...state, 
                bugs: [...state.bugs, payload]
            };
        case UPDATE_BUG:
            return { 
                ...state, 
                bugs: [...state.bugs, payload]
            };
        case DELETE_BUG: 
            return  {
                bugs: state.bugs.filter(bug => bug.bug_id !== payload)
            }
        default: 
            return state;
    }
};
