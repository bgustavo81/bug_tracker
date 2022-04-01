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
    const response = await axios.get("/auth/current_user");

    dispatch({ type: FETCH_CURRENT_USER, payload: response.data.rows });
};

// action to handle Token

export const handleToken = token => async dispatch => {
    const response = await axios.post("/api/billing", token);

    dispatch({ type: FETCH_CURRENT_USER, payload: response.data });
}



// actions for User

export const fetchUser = (userId) => async dispatch => {
    const response = await axios.get(`/api/users/${userId}`);

    dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUsers = () => async dispatch => {
    const response = await axios.get("/api/users");

    dispatch({ type: FETCH_USERS, payload: response.data });
};



export const createUser = (formValues) => async (dispatch) => {
    // getState for auth object
    const response = await axios.post("/api/auth/register", { ...formValues});

    dispatch({ type: CREATE_USER, payload: response.data});
    history.push('/login');
}

// not in use
export const loginUser = (formValues) => async (dispatch) => {
    // getState for auth object
    const response = await axios.post('/api/auth/login', { ...formValues});

    dispatch({ type: CREATE_USER, payload: response.data});
    // history.push('/projects');
}

export const updateUser = (userId, formValues) => async dispatch => {
    console.log(formValues)
    const response = await axios.patch(`/api/users/${userId}`, formValues, userId);

    console.log(response.data)


    dispatch({ type: UPDATE_USER, payload: response.data });
    history.push(`/user/${userId}`);
}

export const deleteUser = (userId) => async dispatch => {
    await axios.delete(`/api/users/${userId}`);

    dispatch({ type: DELETE_USER, payload: userId });
    history.push('/users');
}

// actions for Projects

export const fetchProject = (projId) => async dispatch => {
    const response = await axios.get(`/api/projects/${projId}`);

    
    dispatch({ type: FETCH_PROJECT, payload: response.data });
}

export const fetchProjects = () => async dispatch => {
    const response = await axios.get('/api/projects');

    dispatch({ type: FETCH_PROJECTS, payload: response.data });
};

export const createProject = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    let userId = getState().auth[0].user_id;
    const response = await axios.post("/api/projects", {...formValues, userId});

    dispatch({ type: CREATE_PROJECT, payload: response.data });
    history.push('/projects')
};

export const updateProject = (projId, formValues) => async dispatch => {
    const response = await axios.patch(`/api/projects/${projId}`, formValues);


    dispatch({ type: UPDATE_PROJECT, payload: response.data });
    history.push(`/project/${projId}`);
}

export const deleteProject = (projId) => async dispatch => {
    await axios.delete(`/api/projects/${projId}`);

    dispatch({ type: DELETE_PROJECT, payload: projId });
    history.push('/projects');
}

// actions for Bugs

export const fetchBug = (bugId) => async dispatch => {
    console.log(bugId)
    const response = await axios.get(`/api/bugs/${bugId}`);
    console.log(response.data);

    dispatch({ type: FETCH_BUG, payload: response.data });
};

export const fetchBugs = () => async dispatch => {
    const response = await axios.get(`/api/bugs`);

    dispatch({ type: FETCH_BUGS, payload: response.data });
};

export const fetchBugsByProject = (projId) => async dispatch => {
    const response = await axios.get(`/api/bugs/project/${projId}`);

    dispatch({ type: FETCH_BUGS, payload: response.data });
};

export const createBug = (formValues, projId) => async (dispatch, getState) => {
    const uploadConfig = await axios.get('/api/upload');
    let file = formValues.image;

    await axios.put(uploadConfig.data.url, file, {
        headers: {
            'Content-Type': file.type
        }
    })

    // getState for auth object
    let author = getState().auth[0].user_id;

    const response = await axios.post('/api/bugs', { ...formValues, imageUrl: uploadConfig.data.key, author, projId });
    dispatch({ type: CREATE_BUG, payload: response.data });
    history.push(`/project/${projId}`);
};

export const updateBug = (bugId, formValues) => async (dispatch, getState) => {
    const response = await axios.patch(`/api/bugs/${bugId}`, formValues);
    let projId = getState().bug.bug.project_id;

    dispatch({ type: UPDATE_BUG, payload: response.data });
    history.push(`/project/${projId}`);
};

export const deleteBug = (bugId) => async dispatch => {
    await axios.delete(`/api/bugs/${bugId}`);

    dispatch({ type: DELETE_BUG, payload: bugId })
    history.push('/projects')
}

// actions for Comments

export const fetchComment = (commId) => async dispatch => {
    const response = await axios.get(`/api/comments/${commId}`);

    dispatch({ type: FETCH_COMMENT, payload: response.data });
};

export const fetchCommentsByBug = (commentId) => async dispatch => {
    console.log(commentId)
    const response = await axios.get(`/api/comments/bug/${commentId}`);
    console.log(response.data);
    dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const createComment = (formValues, bugId) => async (dispatch, getState) => {
    // getState for auth object
    let author = getState().auth[0].user_id;
    let authorEmail = getState().auth[0].email;
    const response = await axios.post('/api/comments', { ...formValues, author, authorEmail, bugId });

    dispatch({ type: CREATE_COMMENT, payload: response.data });
    history.push(`/bug/${bugId}`);
}

export const updateComment = (commentId, formValues) => async (dispatch, getState) => {
    const response = await axios.patch(`/api/comments/${commentId}`, formValues);
    let bugId = formValues.bug_id;


    dispatch({ type: UPDATE_COMMENT, payload: response.data });
    history.push(`/bug/${bugId}`);
};

export const deleteComment = (commentId) => async (dispatch, getState) => {
    let bugId = getState().comm.comment.bug_id;
    await axios.delete(`/api/comments/${commentId}`);


    dispatch({ type: DELETE_COMMENT, payload: commentId });
    history.push(`/bug/${bugId}`);
}