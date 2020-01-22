import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Button } from "@material-ui/core";
import "../../styles/BugFormStyles.css";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'bugTitle',
        'priority',
        'status',
        'bugDesc',
        'image',
        'deadline',
        'devEmail'
    ];
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors;
};

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
        helpertext = {touched && error}
        {...input}
        {...custom}
    />
);

const renderDescField = ({
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

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  };
  
const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="status-native-simple">Age</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: 'status',
          id: 'status-native-simple'
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )


const CommentForm = props => {
    const { handleSubmit, pristine, reset, submitting, classes } = props;
    return (
        <form onSubmit={handleSubmit} className="BugForm">
        <div>
        <div>
            <Field
                name="bugTitle"
                component={renderTextField}
                label="Bug Title"
            />
        </div>
        <div>
            <Field 
                name="bugDesc"
                component={renderDescField}
                label="Bug Description"
                multiline
                rowsMax="6"
            />
        </div>
            <Field
            classes={classes}
            name="priority"
            component={renderSelectField}
            label="Priority"
            >
            <option value="" />
            <option value={'Emergency'}>Emergency</option>
            <option value={'High Priority'}>High Priority</option>
            <option value={'Moderate Priority'}>Moderate Priority</option>
            <option value={'Low Priority'}>Low Priority</option>
            <option value={'Very Low Priority'}>Very Low Priority</option>
            </Field>
        </div>
        <div>
            <Field
            classes={classes}
            name="status"
            component={renderSelectField}
            label="Status"
            >
            <option value="" />
            <option value={'Compeleted'}>Compeleted</option>
            <option value={'Almost Resolved'}>Almost Resolved</option>
            <option value={'Moderate Progess'}>Moderate Progess</option>
            <option value={'Untouched'}>Untouched</option>
            </Field>
        </div>
        <div>
            <Field
                name="image"
                component={renderTextField}
                label="Image"
            />
        </div>
        <div>
            <Field
                name="deadline"
                component={renderTextField}
                label="Deadline"
            />
        </div>
        <div>
            <Field
                name="devEmail"
                component={renderTextField}
                label="Title"
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
            <Link to='/bugs' style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                    Cancel
                </Button>
            </Link>
        </form>
    )
}

export default reduxForm({
    form: "bugForm",
    validate: validate
})(PostForm);




