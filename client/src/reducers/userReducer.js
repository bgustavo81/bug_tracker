import _ from 'lodash';
import { 
    FETCH_USER,
    FETCH_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER
} from '../actions/type';

const initialState = {
    users: [],
    user: null
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_USER:
            return { 
                ...state, 
                user: payload
            };
        case FETCH_USERS:
            return { 
                ...state, 
                users: payload 
            };
        case CREATE_USER:
            return { 
                ...state, 
                users: [...state.users, payload]
            };
        case UPDATE_USER:
            return { 
                ...state, 
                users: [...state.users, payload]
            };
        case DELETE_USER: 
            return  {
                users: state.users.filter(user => user.user_id !== payload)
            }
        default: 
            return state;
    }
};
