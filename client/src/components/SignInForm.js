import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import "../styles/SignInStyles.css";


const validate = values => {
    const errors = {};
    const requiredFields = [
        'email',
        'password'
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

const renderTextContentField = ({
    input,
    label,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        id="standard-multiline-flexible"
        multiline
        rowsMax="6"
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

const ProjectForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(props.initialValues);

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="SignInForm">
            <div>
                <Field 
                    name="email"
                    component={renderTextField}
                    label="Email"
                />
            </div>
            <div>
                <Field 
                    name="password"
                    component={renderTextContentField}
                    label="Password"
                    multiline
                    rowsMax="6"
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
            <Link to='/projects' style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                    Cancel
                </Button>
            </Link>
        </form>
    )
}

export default reduxForm({
    form: 'projectForm',
    validate: validate
})(ProjectForm);
