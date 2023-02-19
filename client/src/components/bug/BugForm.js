import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ImagePicker from './ImagePicker';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Button } from "@material-ui/core";
import "../../styles/FormStyles.css";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'bug_title',
        'priority',
        'status',
        'bug_desc',
        'image',
        'deadline',
        'dev_email'
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
        helperText={touched && error}
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
  
const renderSelectFieldPriority = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="status-native-simple">Priority</InputLabel>
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

  const renderSelectFieldStatus = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="status-native-simple">Status</InputLabel>
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


const BugForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes, projId, match } = props;
    return (
        <form onSubmit={handleSubmit} className="Form">
        <div>
            <Field
                name="bug_title"
                component={renderTextField}
                label="Title"
            />
        </div>
        <div>
            <Field 
                name="bug_desc"
                component={renderDescField}
                label="Description"
                multiline
                rowsMax="6"
            />
        </div>
        <div>
            <Field
            classes={classes}
            name="priority"
            component={renderSelectFieldPriority}
            label="Priority"
            >
            <option value="" />
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
            component={renderSelectFieldStatus}
            label="Status"
            >
            <option value="" />
            <option value={'Compeleted'}>Completed</option>
            <option value={'Almost Resolved'}>Almost Resolved</option>
            <option value={'Moderate Progess'}>Moderate Progess</option>
            <option value={'Untouched'}>Untouched</option>
            </Field>
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
                name="dev_email"
                component={renderTextField}
                label="Assigned Dev (e.i. example@gmail.com)"
            />
        </div>
        <div>
          { match ? <></> :
              <Field
                  name="image"
                  component={ImagePicker}
                  label="Select an Image"
              />
          }
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
            <Link to={`/project/${projId}`} style={{ textDecoration: "none" }}>
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
})(BugForm);




