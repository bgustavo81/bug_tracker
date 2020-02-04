import _ from 'lodash';
import React from 'react';
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
        if (!proj) {
            return (
                <div className="ShowSkeletonContainer">
                    <div>
                        <Skeleton variant="text" height={240} />
                        <Skeleton variant="rect" height={640} /> 
                    </div>
                </div>
            )
        }
        let items = _.pick(proj, 'title', 'content', 'deadline');
        console.log(items);
        return (
        <div>
            <h3 className="FormTitle">Edit your project</h3>
            <ProjectForm 
                initialValues={items}
                onSubmit={this.onSubmit} 
            />
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        proj: state.proj[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps, 
    { fetchProject, updateProject }
)(ProjectUpdate);