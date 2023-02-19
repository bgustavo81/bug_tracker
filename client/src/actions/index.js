import history from '../history';
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import uuid from "uuid";

import {
    GET_PROFILE,
    CLEAR_PROFILE,
    GET_PROFILES,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    ACCOUNT_DELETED,

    SET_ALERT, 
    REMOVE_ALERT,

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


// Alert actions

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
    });
  
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

//Get profile by ID
export const getProfileById = userId => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/profile/user/${userId}`);
  
    dispatch({ type: GET_PROFILE, payload: response.data });
  };

//Get all user's profiles
export const getProfiles = () => async dispatch => {
    //Clear what ever is in the current user's profile
    dispatch({ type: CLEAR_PROFILE });
  
    const response = await axios.get("https://bug-tracker-slac.onrender.com/api/profile");
    
    dispatch({ type: GET_PROFILES, payload: response.data });
  };

//Logout user and clear the profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  history.push("/");
};


//Load User

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }


  const response = await axios.get("https://bug-tracker-slac.onrender.com/api/auth");


  dispatch({ type: USER_LOADED, payload: response.data });
}

  
//Registers the user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ name, email, password });
  
    const response = await axios.post("https://bug-tracker-slac.onrender.com/api/users", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
  }

// Auth actions 

//Login the user
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    const response = await axios.post("https://bug-tracker-slac.onrender.com/api/auth", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  }
  

// action to get current User

export const fetchCurrentUser = () => async dispatch => {
    const response = await axios.get("https://bug-tracker-slac.onrender.com/api/auth/current_user");

    dispatch({ type: FETCH_CURRENT_USER, payload: response.data.rows });
};

// action to handle Token

export const handleToken = token => async dispatch => {
    const response = await axios.post("https://bug-tracker-slac.onrender.com/api/billing", token);

    dispatch({ type: USER_LOADED, payload: response.data });
}

//Delete the account and profile

//Delete a user's experience
export const deleteAccount = () => async dispatch => {
    if (
      window.confirm(
        "Are you sure you want to delete your account?"
      )
    ) {
      await axios.delete(`https://bug-tracker-slac.onrender.com/api/profile/`);
  
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED});
  
      dispatch(setAlert("Account has been removed.", "danger"));
    }
  }
  

// actions for User

export const fetchUser = (userId) => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/users/${userId}`);

    dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUsers = () => async dispatch => {
    const response = await axios.get("https://bug-tracker-slac.onrender.com/api/users");

    dispatch({ type: FETCH_USERS, payload: response.data });
};



export const createUser = (formValues) => async (dispatch) => {
    // getState for auth object
    const response = await axios.post("https://bug-tracker-slac.onrender.com/api/auth/register", { ...formValues});

    dispatch({ type: CREATE_USER, payload: response.data});
    history.push('/login');
}

// not in use
export const loginUser = (formValues) => async (dispatch) => {
    // getState for auth object
    const response = await axios.post('https://bug-tracker-slac.onrender.com/api/auth/login', { ...formValues});

    dispatch({ type: CREATE_USER, payload: response.data});
    // history.push('/projects');
}

export const updateUser = (userId, formValues) => async dispatch => {
 
    const response = await axios.patch(`https://bug-tracker-slac.onrender.com/api/users/${userId}`, formValues, userId);

    dispatch({ type: UPDATE_USER, payload: response.data });
    history.push(`/user/${userId}`);
}

export const deleteUser = (userId) => async dispatch => {
    await axios.delete(`https://bug-tracker-slac.onrender.com/api/users/${userId}`);

    dispatch({ type: DELETE_USER, payload: userId });
    history.push('/users');
}

// actions for Projects

export const fetchProject = (projId) => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/projects/${projId}`);

    
    dispatch({ type: FETCH_PROJECT, payload: response.data });
}

export const fetchProjects = () => async dispatch => {
    const response = await axios.get('https://bug-tracker-slac.onrender.com/api/projects');

    dispatch({ type: FETCH_PROJECTS, payload: response.data });
};

export const createProject = (formValues) => async (dispatch, getState) => {
    // getState for auth object
    let userId = getState().auth.user.user_id;
    const response = await axios.post("https://bug-tracker-slac.onrender.com/api/projects", {...formValues, userId});

    dispatch({ type: CREATE_PROJECT, payload: response.data });
    history.push('/projects')
};

export const updateProject = (projId, formValues) => async dispatch => {
    const response = await axios.patch(`https://bug-tracker-slac.onrender.com/api/projects/${projId}`, formValues);


    dispatch({ type: UPDATE_PROJECT, payload: response.data });
    history.push(`/project/${projId}`);
}

export const deleteProject = (projId) => async dispatch => {
    await axios.delete(`https://bug-tracker-slac.onrender.com/api/projects/${projId}`);

    dispatch({ type: DELETE_PROJECT, payload: projId });
    history.push('/projects');
}

// actions for Bugs

export const fetchBug = (bugId) => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/bugs/${bugId}`);

    dispatch({ type: FETCH_BUG, payload: response.data });
};

export const fetchBugs = () => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/bugs`);

    dispatch({ type: FETCH_BUGS, payload: response.data });
};

export const fetchBugsByProject = (projId) => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/bugs/project/${projId}`);

    dispatch({ type: FETCH_BUGS, payload: response.data });
};

export const createBug = (formValues, projId) => async (dispatch, getState) => {
    const uploadConfig = await axios.get('https://bug-tracker-slac.onrender.com/api/upload');
    let file = formValues.image;


    await axios.put(uploadConfig.data.url, file, {
        headers: {
            'Content-Type': file.type
        }
    })

    // getState for auth object
    let author = getState().auth.user.user_id;

    const response = await axios.post('https://bug-tracker-slac.onrender.com/api/bugs', { ...formValues, imageUrl: uploadConfig.data.key, author, projId });
    dispatch({ type: CREATE_BUG, payload: response.data });
    history.push(`/project/${projId}`);
};

export const updateBug = (bugId, formValues) => async (dispatch, getState) => {
    const response = await axios.patch(`https://bug-tracker-slac.onrender.com/api/bugs/${bugId}`, formValues);
    let projId = getState().bug.bug.project_id;

    dispatch({ type: UPDATE_BUG, payload: response.data });
    history.push(`/project/${projId}`);
};

export const deleteBug = (bugId) => async (dispatch, getState) => {
    await axios.delete(`https://bug-tracker-slac.onrender.com/api/bugs/${bugId}`);
    let projId = getState().bug.bug.project_id;


    dispatch({ type: DELETE_BUG, payload: bugId })
    history.push(`/project/${projId}`)
}

// actions for Comments

export const fetchComment = (commId) => async dispatch => {
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/comments/${commId}`);

    dispatch({ type: FETCH_COMMENT, payload: response.data });
};

export const fetchCommentsByBug = (commentId) => async dispatch => {
    
    const response = await axios.get(`https://bug-tracker-slac.onrender.com/api/comments/bug/${commentId}`);
    
    dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const createComment = (formValues, bugId) => async (dispatch, getState) => {
    // getState for auth object
    let author = getState().auth.user.user_id;
    let authorEmail = getState().auth.user.email;
    const response = await axios.post('https://bug-tracker-slac.onrender.com/api/comments', { ...formValues, author, authorEmail, bugId });

    dispatch({ type: CREATE_COMMENT, payload: response.data });
    history.push(`/bug/${bugId}`);
}

export const updateComment = (commentId, formValues) => async (dispatch, getState) => {
    const response = await axios.patch(`https://bug-tracker-slac.onrender.com/api/comments/${commentId}`, formValues);
    let bugId = formValues.bug_id;
   

    dispatch({ type: UPDATE_COMMENT, payload: response.data });
    history.push(`/bug/${bugId}`);
};

export const deleteComment = (commentId) => async (dispatch, getState) => {
    let bugId = getState().comment.comment.bug_id;
    await axios.delete(`https://bug-tracker-slac.onrender.com/api/comments/${commentId}`);


    dispatch({ type: DELETE_COMMENT, payload: commentId });
    history.push(`/bug/${bugId}`);
}