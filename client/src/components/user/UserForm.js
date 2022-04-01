import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import "../../styles/FormStyles.css";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'first_name',
        'last_name',
        'email'
    ]
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = "Required"
        }
    })
    return errors;
}

const renderTextField = ({
    input,
    label, 
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField 
        id="standard-basic"
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)


const UserForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="Form">
            <div>
                <Field 
                    name="first_name"
                    component={renderTextField}
                    label="First Name"
                />
            </div>
            <div>
                <Field 
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                />
            </div>
            <div>
                <Field 
                    name="email"
                    component={renderTextField}
                    label="Email"
                />
            </div>
            <Button
                variant="outlined"
                size="large" 
                color="primary" 
                type="submit" 
                disabled={pristine || submitting}
                >
                Submit
            </Button>
            <Button 
                variant="outlined"
                size="large" 
                disabled={pristine || submitting} 
                onClick={reset}>
                Reset
            </Button>
            <Link to='/projects' style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                    Cancel
                </Button>
            </Link>
        </form>
    )
}

export default reduxForm({
    form: 'userForm',
    validate: validate
})(UserForm);
