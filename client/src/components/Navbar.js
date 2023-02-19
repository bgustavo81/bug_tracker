import React, { Fragment } from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { logout } from "../actions/index";

import '../styles/HeaderStyles.css';
import IconButton from '@material-ui/core/IconButton';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import Payments from './Payments';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  let user_id = user;
  const authLinks = (

      <div className="dropdown">
          <Link to={`/user`} className="dropBtn" style={{ textDecoration: "none", color: "white" }}>
              <AccountCircleIcon fontSize="large" />
          </Link>
          <div className="dropdownContent">
              <Payments />
              <Link to='/bugs' style={{ textDecoration: "none", color: "white" }}>My Bugs</Link>
              {
                user_id ? <Link to={`/user/${user_id.user_id}`} style={{ textDecoration: "none", color: "white" }}>Account</Link> : <></>

              }
              <a onClick={logout} style={{ textDecoration: "none", color: "white" }}>Logout</a>
          </div>
      </div>
      
  );

  const notLoggedInLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-tracker"></i> Tracker
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated && !loading ? authLinks : notLoggedInLinks}</Fragment>
      )}
    </nav>
  );
}


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);


// class Navbar extends Component {
//   renderContent() {
//     switch(this.props.auth.auth) {
//       case null:
//         return;
//       case false:
//         return (
//           <React.Fragment>
//             <div style={{ width: "120px"}}></div>
//             <div className="link trackerly">
//             <Link to='/' className='link parkly'>Bug Trackerly</Link>              
//             </div>              
//             <Link to='/login'><Button variant="contained" color="secondary">Login</Button></Link>
//           </React.Fragment>
//         )
//       default: 
//       const auth = this.props.auth.auth[0].user_id;
//       // const auth = 123456;

//       return (
//           <React.Fragment>
//             <IconButton edge="start">
//               <Link to='/projects' className='link icon'><BugReportIcon fontSize="large" /></Link>
//             </IconButton>

//           </React.Fragment>
//         );
//     }
//   }

//   render() {
//     return (
//       <div className="nav">
//         {this.renderContent()}
//       </div>
//     )
//   }
// }

// function mapStateToProps(auth) {
//   return {
//     auth: auth
//   };
// }

// export default connect(mapStateToProps)(Navbar);
