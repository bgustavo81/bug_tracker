import React from 'react';
import {Link} from 'react-router-dom';
import { loginUser } from '../actions';
import Button from "@material-ui/core/Button";
// import SignInForm from './SignInForm'; // debug passport 
import "../styles/SignInStyles.css";
import { connect } from 'react-redux';


class SignIn extends React.Component {
    onSubmit = (formValues) => {
        this.props.loginUser(formValues);
    }

    render() {
        return (
            <div className="SignInWrapper">
                <h3 className="SignInTitle">Sign In</h3>
                <div className="SignInContainer">
                    <div className="SignInButtonContainer">
                        <p><a href="/auth/google"><Button variant="outlined" color="secondary">SignIn with Google</Button></a></p>
                        <p><a href="/auth/facebook"><Button variant="outlined" color="primary">SignIn with Facebook</Button></a></p>
                        <p><a href="/auth/github"><Button variant="outlined">SignIn with Github</Button></a></p>

                    </div>
                    {/* <SignInForm onSubmit={this.onSubmit} /> */}
                </div>
                {/* <p className="SignUpLink"><Link to="/register" style={{textDecoration: "none", color: "#197EAB"}}>Don't have an account?</Link></p> */}
            </div>
        );
    }
}


export default connect(
    null,
    {loginUser}
)(SignIn);