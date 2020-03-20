import _ from 'lodash';
import { 
    FETCH_PROJECT,
    FETCH_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from '../actions/type';

const initialState = {
    projects: [],
    project: null
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_PROJECT:
            return { 
                ...state, 
                project: payload
            };
        case FETCH_PROJECTS:
            return { 
                ...state, 
                projects: payload 
            };
        case CREATE_PROJECT:
            return { 
                ...state, 
                projects: [...state.projects, payload]
            };
        case UPDATE_PROJECT:
            return { 
                ...state, 
                projects: [...state.projects, payload]
            };
        case DELETE_PROJECT: 
            return  {
                projects: state.projects.filter(project => project.project_id !== payload)
            }
        default: 
            return state;
    }
};
