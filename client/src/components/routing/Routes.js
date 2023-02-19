import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from "../routing/PrivateRoute";

import Alert from "../Alert";
import NotFound from "../NotFound";
import Register from "../auth/Register";
import BugShow from '../bug/BugShow';
import BugList from '../bug/BugList';
import BugCreate from '../bug/BugCreate';
import BugUpdate from '../bug/BugUpdate';
import BugDelete from '../bug/BugDelete';
import CommentShow from '../comment/CommentShow';
import CommentList from '../comment/CommentList';
import CommentCreate from '../comment/CommentCreate';
import CommentUpdate from '../comment/CommentUpdate';
import CommentDelete from '../comment/CommentDelete';
import UserShow from '../user/UserShow';
import UserList from '../user/UserList';
import UserCreate from '../user/UserCreate';
import UserUpdate from '../user/UserUpdate';
import UserDelete from '../user/UserDelete';
import ProjectShow from '../project/ProjectShow';
import ProjectList from '../project/ProjectList';
import ProjectCreate from '../project/ProjectCreate';
import ProjectUpdate from '../project/ProjectUpdate';
import ProjectDelete from '../project/ProjectDelete';
import Landing from '../Landing';
import Login from "../auth/Login";



export const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <PrivateRoute path='/' exact component={Landing} />
                <PrivateRoute path='/login' exact component={Login} />
                <PrivateRoute path='/register' exact component={Register} />
                
                <PrivateRoute path='/bug/new/:projId' exact component={BugCreate} />
                <PrivateRoute path='/bug/update/:bugId' exact component={BugUpdate} />
                <PrivateRoute path='/bug/delete/:bugId' exact component={BugDelete} />
                <PrivateRoute path='/bugs' exact component={BugList} />
                <PrivateRoute path='/bug/:bugId' exact component={BugShow} />

                <PrivateRoute path='/comment/new/:bugId' exact component={CommentCreate} />
                <PrivateRoute path='/comment/update/:commentId' exact component={CommentUpdate} />
                <PrivateRoute path='/comment/delete/:commentId' exact component={CommentDelete} />  
                <PrivateRoute path='/comments' exact component={CommentList} />
                <PrivateRoute path='/comment/:commentId' exact component={CommentShow} />

                <PrivateRoute path='/project/new' exact component={ProjectCreate} />
                <PrivateRoute path='/project/update/:projId' exact component={ProjectUpdate} />
                <PrivateRoute path='/project/delete/:projId' exact component={ProjectDelete} />
                <PrivateRoute path='/projects' export component={ProjectList} />
                <PrivateRoute path='/project/:projId' exact component={ProjectShow} />

                <PrivateRoute path='/user/new' exact component={UserCreate} />
                <PrivateRoute path='/user/update/:userId' exact component={UserUpdate} />
                <PrivateRoute path='/user/delete/:userId' exact component={UserDelete} />
                <PrivateRoute path='/users' exact component={UserList} />
                <PrivateRoute path='/user/:userId' exact component={UserShow} />
                <PrivateRoute component={NotFound} /> 
            </Switch>
        </section>
    );
};

export default Routes;


