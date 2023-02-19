import React, { Fragment, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

import Navbar from "./Navbar";
import Landing from "./Landing";

import setAuthToken from "../utils/setAuthToken";  //sets the authentication token
import Routes from "./routing/Routes";


import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    return (
      <Router history={history} forceRefresh={true}>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
  );
  }
}

export default connect(
  null,
  actions
)(App);

// import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

// import BugShow from './bug/BugShow';
// import BugList from './bug/BugList';
// import BugCreate from './bug/BugCreate';
// import BugUpdate from './bug/BugUpdate';
// import BugDelete from './bug/BugDelete';
// import CommentShow from './comment/CommentShow';
// import CommentList from './comment/CommentList';
// import CommentCreate from './comment/CommentCreate';
// import CommentUpdate from './comment/CommentUpdate';
// import CommentDelete from './comment/CommentDelete';
// import UserShow from './user/UserShow';
// import UserList from './user/UserList';
// import UserCreate from './user/UserCreate';
// import UserUpdate from './user/UserUpdate';
// import UserDelete from './user/UserDelete';
// import ProjectShow from './project/ProjectShow';
// import ProjectList from './project/ProjectList';
// import ProjectCreate from './project/ProjectCreate';
// import ProjectUpdate from './project/ProjectUpdate';
// import ProjectDelete from './project/ProjectDelete';
// import Header from './Header';
// import Landing from './Landing';
// import SignIn from './SignIn';
// import SignUp from './SignUp';
// import Footer from './Footer';
// import history from '../history';
// import "../styles/App.css";


// class App extends Component {
//     componentDidMount() {
//         this.props.fetchCurrentUser();
//     }

//     render() {
//         return (
//             <div>
//             <Router history={history}>
//                 <div className="MainContainer">
//                     <Header />
//                     <Switch>
//                         <Route path='/' exact component={Landing} />
//                         <Route path='/login' exact component={SignIn} />
//                         <Route path='/register' exact component={SignUp} />
                        
//                         <Route path='/bug/new/:projId' exact component={BugCreate} />
//                         <Route path='/bug/update/:bugId' exact component={BugUpdate} />
//                         <Route path='/bug/delete/:bugId' exact component={BugDelete} />
//                         <Route path='/bugs' exact component={BugList} />
//                         <Route path='/bug/:bugId' exact component={BugShow} />

//                         <Route path='/comment/new/:bugId' exact component={CommentCreate} />
//                         <Route path='/comment/update/:commentId' exact component={CommentUpdate} />
//                         <Route path='/comment/delete/:commentId' exact component={CommentDelete} />  
//                         <Route path='/comments' exact component={CommentList} />
//                         <Route path='/comment/:commentId' exact component={CommentShow} />

//                         <Route path='/project/new' exact component={ProjectCreate} />
//                         <Route path='/project/update/:projId' exact component={ProjectUpdate} />
//                         <Route path='/project/delete/:projId' exact component={ProjectDelete} />
//                         <Route path='/projects' export component={ProjectList} />
//                         <Route path='/project/:projId' exact component={ProjectShow} />

//                         <Route path='/user/new' exact component={UserCreate} />
//                         <Route path='/user/update/:userId' exact component={UserUpdate} />
//                         <Route path='/user/delete/:userId' exact component={UserDelete} />
//                         <Route path='/users' exact component={UserList} />
//                         <Route path='/user/:userId' exact component={UserShow} />
//                     </Switch>
//                     <Footer />
//                 </div>
//             </Router>
//         </div>
//         )
//     }
// }

// export default connect(
//     null, 
//     actions
// )(App)