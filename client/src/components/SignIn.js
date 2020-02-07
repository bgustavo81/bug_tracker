import React from 'react';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import SignInForm from './SignInForm';
import "../styles/SignInStyles.css";


const SignIn = () => {
    return (
        <div className="SignInWrapper">
            <h3 className="SignInTitle">Sign In</h3>
            <div className="SignInContainer">
                <div className="SignInButtonContainer">
                    <p><a href="/auth/google"><Button variant="outlined" color="secondary">SignIn with Google</Button></a></p>
                    <p><a href="#"><Button variant="outlined" color="primary">SignIn with Facebook</Button></a></p>
                    <p><a href="#"><Button variant="outlined">SignIn with Twitter</Button></a></p>
                </div>
                <SignInForm />
            </div>
            <p className="SignUpLink"><Link to="/signup" style={{textDecoration: "none", color: "#197EAB"}}>Don't have an account?</Link></p>
        </div>
    );
};


export default SignIn;