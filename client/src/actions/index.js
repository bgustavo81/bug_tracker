import server from '../apis/server';
import history from '../history';
import axios from "axios";
import {
    FETCH_CURRENT_USER,
    FETCH_USER,
    FETCH_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    FETCH_PROJECT,
    FETCH_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    FETCH_BUG,
    FETCH_BUGS,
    CREATE_BUG,
    UPDATE_BUG,
    DELETE_BUG,
    FETCH_COMMENT,
    FETCH_COMMENTS,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from './type';

// action to get current User

export const fetchCurrentUser = () => async dispatch => {
    const response = await axios.get("/api/current_user");
    console.log(response.data.rows);

    dispatch({ type: FETCH_CURRENT_USER, payload: response.data.rows });
};

// action to handle Token

export const handleToken = token => async dispatch => {
    const response = await axios.post("/api/stripe", token);

    dispatch({ type: FETCH_CURRENT_USER, payload: response.data });
}

// actions for User

export const fetchUser = (userId) => async dispatch => {
    const response = await server.get(`/user/${userId}`);

    dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUsers = () => async dispatch => {
    const response = await server.get("/users");

    dispatch({ type: FETCH_USERS, payload: response.data });
};


export const createUser = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    const { userId } = getState.auth;
    const response = await server.post("/user", { ...formValues, userId});

    dispatch({ type: CREATE_USER, payload: response.data});
    history.push('/users')
}

export const updateUser = (userId, formValues) => async dispatch => {
    const response = await server.patch(`/posts/${userId}`, formValues);

    dispatch({ type: UPDATE_USER, payload: response.data });
    history.push('/users');
}

export const deleteUser = (userId) => async dispatch => {
    await server.delete(`/posts/${userId}`);

    dispatch({ type: DELETE_USER, payload: userId });
    history.push('/users');
}

// actions for Projects

export const fetchProject = (projId) => async dispatch => {
    const response = await server.get(`/project/${projId}`);
    
    dispatch({ type: FETCH_PROJECT, payload: response.data });
}

export const fetchProjects = () => async dispatch => {
    const response = await server.get('/projects');

    dispatch({ type: FETCH_PROJECTS, payload: response.data });
};

export const createProject = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    const { userId } = getState().auth;
    const response = await server.post("/project", {...formValues, userId});

    dispatch({ type: CREATE_PROJECT, payload: response.data });
    history.push('/projects')
};

export const updateProject = (projId, formValues) => async dispatch => {
    const response = await server.patch(`/project/${projId}`, formValues);

    dispatch({ type: UPDATE_PROJECT, payload: response.data });
    history.push('/projects');
}

export const deleteProject = (projId) => async dispatch => {
    await server.delete(`/project/${projId}`);

    dispatch({ type: DELETE_PROJECT, payload: projId });
    history.push('/projects');
}

// actions for Bugs

export const fetchBug = (bugId) => async dispatch => {
    const response = await server.get(`/bug/${bugId}`);

    dispatch({ type: FETCH_BUG, payload: response.data });
};

export const fetchBugs = () => async dispatch => {
    const response = await server.get("/bugs");

    dispatch({ type: FETCH_BUGS, payload: response.data });
};

export const createBug = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    const { userId } = getState().auth;
    const response = await server.post('/bug', { ...formValues, userId });

    dispatch({ type: CREATE_BUG, payload: response.data });
    history.push('/bugs');
};

export const updateBug = (bugId, formValues) => async dispatch => {
    const response = await server.patch(`/bug/${bugId}`, formValues);

    dispatch({ type: UPDATE_BUG, payload: response.data });
    history.push('/bugs');
};

export const deleteBug = (bugId) => async dispatch => {
    await server.delete(`/bug/${bugId}`);

    dispatch({ type: DELETE_BUG, payload: bugId })
}

// actions for Comments

export const fetchComment = (commId) => async dispatch => {
    const response = await server.get(`/comment/${commId}`);

    dispatch({ type: FETCH_COMMENT, payload: response.data });
};

export const fetchComments = () => async dispatch => {
    const response = await server.get('/comments');

    dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const createComment = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    const { userId } = getState().auth;
    const response = await server.post('/comment', { ...formValues, userId });

    dispatch({ type: CREATE_COMMENT, payload: response.data });
    history.push('/comments');
}

export const updateComment = (commId, formValues) => async dispatch => {
    const response = await server.patch(`/comment/${commId}`, formValues);

    dispatch({ type: UPDATE_COMMENT, payload: response.data });
    history.push('/comments');
};

export const deleteComments = (commId) => async dispatch => {
    await server.delete(`/comment/${commId}`);

    dispatch({ type: DELETE_COMMENT, payload: commId });
    history.push('/comments');
}