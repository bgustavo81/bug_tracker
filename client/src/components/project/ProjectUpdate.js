import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchProject, updateProject } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import ProjectForm from './ProjectForm';
import "../../styles/FormStyles.css";

class ProjectUpdate extends React.Component {
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.projId);
    }

    onSubmit = (formValues) => {
        this.props.updateProject(this.props.match.params.projId, formValues);
    }

    render() {
        const proj = this.props.proj;
        if (proj) {
            return (
                <div>
                    <h3 className="FormTitle">Edit your project</h3>
                    <ProjectForm 
                        initialValues={proj[0]}
                        onSubmit={this.onSubmit} 
                    />
                </div>
            );
        } else {
                return (
                    <div className="ShowSkeletonContainer">
                        <div>
                            <Skeleton variant="text" height={240} />
                            <Skeleton variant="rect" height={640} /> 
                        </div>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        proj: state.project.projects,
    };
};

export default connect(
    mapStateToProps, 
    { fetchProject, updateProject }
)(ProjectUpdate);