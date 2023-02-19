import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteProjectModal from '../DeleteProjectModal';
import Button from '@material-ui/core/Button';
import history from '../../history';
import { fetchProject, deleteProject }  from '../../actions';
import "../../styles/DeleteModalStyles.css";

class ProjectDelete extends React.Component {
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.projId);
    }

    renderActions() {
        const projId = this.props.match.params.projId;
        return (
            <div className="DeleteButtons">
                <Button 
                    onClick={() => this.props.deleteProject(projId)}
                    size="large"
                    variant="outlined"
                    color="secondary"
                >
                    Delete
                </Button>
                <Link to='/projects' style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="large">
                        Cancel
                    </Button>
                </Link>
            </div>
        );
    }

    renderContent() {
        if (!this.props.proj) {
            return `Are you sure you want to delete this project?`
        }

        return `Are you sure you want to delete the project with title "${this.props.proj.title}"`
    }

    render() {
        return (
            <DeleteProjectModal
                title="Delete project"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/projects')}
            />
        );  
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        proj: state.projects
    }
}

export default connect(
    mapStateToProps,
    { fetchProject, deleteProject }
)(ProjectDelete);