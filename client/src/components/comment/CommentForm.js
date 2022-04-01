import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import "../../styles/FormStyles.css";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'content'
    ]
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = "Required"
        }
    })
    return errors;
}

const renderTextContentField = ({
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

const CommentForm = props => {
    const { handleSubmit, pristine, reset, submitting, comm } = props;
    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="Form">
            <div>
                <Field 
                    name="content"
                    component={renderTextContentField}
                    label="content"
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
            <Link to={`/bug/${comm.bug_id}`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                    Cancel
                </Button>
            </Link>
        </form>
    )
}


export default reduxForm({
    form: 'commentForm',
    validate: validate
})(CommentForm);
