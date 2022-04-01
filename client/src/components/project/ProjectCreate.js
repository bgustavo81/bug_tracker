import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../actions';
import ProjectForm from './ProjectForm';
import '../../styles/FormStyles.css';

class ProjectCreate extends Component {
    onSubmit = (formValues) => {
        this.props.createProject(formValues);
    }
    
    render() {
        return (
            <div>
                <h3 className="FormTitle"> Create a Project</h3>
                <ProjectForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

export default connect(
    null,
    { createProject }
)(ProjectCreate);