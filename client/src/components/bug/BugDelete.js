import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteBugModal from '../DeleteBugModal';
import Button from '@material-ui/core/Button';
import history from '../../history';
import { fetchBug, deleteBug }  from '../../actions';
import "../../styles/DeleteModalStyles.css";

class BugDelete extends React.Component {
    componentDidMount() {
        this.props.fetchBug(this.props.match.params.bugId);
    }

    renderActions(bug) {
        const bugId = this.props.match.params.bugId;
        return (
            <div className="DeleteButtons">
                <Button 
                    onClick={() => this.props.deleteBug(bugId)}
                    size="large"
                    variant="outlined"
                    color="secondary"
                >
                    Delete
                </Button>
                <Link to={`/project/${bug.project_id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="large">
                        Cancel
                    </Button>
                </Link>
            </div>
        );
    }

    renderContent(bug) {
        return `Are you sure you want to delete the Bug with title "${bug.bug_title}"`
    }

    render() {
        let bug = this.props.bug;
        if (!bug) {
            return <div className="DeleteModalContainer"></div>
        }
        return (
            <DeleteBugModal
                title="Delete bug"
                content={this.renderContent(bug)}
                actions={this.renderActions(bug)}
                onDismiss={() => history.push(`/project/${bug.project_id}`)}
            />
        );  
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        bug: state.bug.bug
    }
}

export default connect(
    mapStateToProps,
    { fetchBug, deleteBug }
)(BugDelete);