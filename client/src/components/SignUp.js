import React from 'react';
import { createUser } from '../actions';
import SignUpForm from './SignUpForm';
import "../styles/SignInStyles.css";
import { connect } from 'react-redux';


class SignUp extends React.Component {
    onSubmit = (formValues) => {
        this.props.createUser(formValues);
    }

    render() {
        return (
            <div className="SignUpWrapper">
                <h3 className="SignInTitle">Register</h3>
                <div className="SignInContainer">
                    <SignUpForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}


export default connect(
    null, 
    { createUser }
)(SignUp);