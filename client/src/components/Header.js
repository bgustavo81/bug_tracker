import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/HeaderStyles.css';
import IconButton from '@material-ui/core/IconButton';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch(this.props.auth.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <div style={{ width: "120px"}}></div>
            <div className="link trackerly">
            <Link to='/' className='link parkly'>Bug Trackerly</Link>              
            </div>              
            <Link to='/login'><Button variant="contained" color="secondary">Login</Button></Link>
          </React.Fragment>
        )
      default: 
      const auth = this.props.auth.auth[0].user_id;
        return (
          <React.Fragment>
            <IconButton edge="start">
              <Link to='/projects' className='link icon'><BugReportIcon fontSize="large" /></Link>
            </IconButton>
            <div className="link trackerly">
              <Link to='/' className='link parkly'>Bug Trackerly</Link>              
            </div>
            <div className="dropdown">
                <Link to={`/user/${auth}`} className="dropBtn" style={{ textDecoration: "none", color: "white" }}>
                    <AccountCircleIcon fontSize="large" />
                </Link>
                <div className="dropdownContent">
                    <Payments />
                    <Link to='/bugs' style={{ textDecoration: "none", color: "white" }}>My Bugs</Link>
                    <Link to={`/user/${auth}`} style={{ textDecoration: "none", color: "white" }}>Account</Link>
                    <a href="/auth/logout" style={{ textDecoration: "none", color: "white" }}>Logout</a>
                </div>
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className="nav">
        {this.renderContent()}
      </div>
    )
  }
}

function mapStateToProps(auth) {
  return {
    auth: auth
  };
}

export default connect(mapStateToProps)(Header);
