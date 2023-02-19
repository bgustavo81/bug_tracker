import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
  } from "../actions/type";
  
//Create initial state
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };

    default:
      return state;
  }
}



// import _ from 'lodash';
// import { 
//     FETCH_USER,
//     FETCH_USERS,
//     CREATE_USER,
//     UPDATE_USER,
//     DELETE_USER
// } from '../actions/type';

// const initialState = {
//     users: [],
//     user: null
// }

// export default (state = initialState, action) => {
//     const {type, payload} = action;

//     switch (type) {
//         case FETCH_USER:
//             return { 
//                 ...state, 
//                 user: payload
//             };
//         case FETCH_USERS:
//             return { 
//                 ...state, 
//                 users: payload 
//             };
//         case CREATE_USER:
//             return { 
//                 ...state, 
//                 users: [...state.users, payload]
//             };
//         case UPDATE_USER:
//             return { 
//                 ...state, 
//                 users: [...state.users, payload]
//             };
//         case DELETE_USER: 
//             return  {
//                 users: state.users.filter(user => user.user_id !== payload)
//             }
//         default: 
//             return state;
//     }
// };
