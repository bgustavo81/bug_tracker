import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import "../../styles/FormStyles.css";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'content',
        'deadline'
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
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="Form">
            <div>
                <Field 
                    name="title"
                    component={renderTextField}
                    label="Title"
                />
            </div>
            <div>
                <Field 
                    name="content"
                    component={renderTextContentField}
                    label="Description"
                    multiline
                    rowsMax="6"
                />
            </div>
            <div>
                <Field 
                    name="deadline"
                    component={renderTextField}
                    label="Deadline (e.i. 02-10-2020)"
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
    form: 'projectForm',
    validate: validate
})(ProjectForm);
