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

    renderActions() {
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
                <Link to='/project' style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="large">
                        Cancel
                    </Button>
                </Link>
            </div>
        );
    }

    renderContent() {
        let bug = this.props.bug;
        console.log(bug);
        if (!this.props.bug) {
            return `Are you sure you want to delete this bug?`
        }
        [bug] = bug;
        return `Are you sure you want to delete the Bug with title "${bug.bug_title}"`
    }

    render() {
        return (
            <DeleteBugModal
                title="Delete bug"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/projects')}
            />
        );  
    };
};

const mapStateToProps = (state, ownProps) => {
    console.log(state.bug[ownProps.match.params.id])
    return {
        bug: state.bug[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,
    { fetchBug, deleteBug }
)(BugDelete);