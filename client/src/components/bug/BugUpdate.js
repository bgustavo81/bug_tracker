import React from 'react';
import { connect } from 'react-redux';
import { fetchBug, updateBug } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import BugForm from './BugForm';
import "../../styles/FormStyles.css";

class BugUpdate extends React.Component {
    componentDidMount() {
        this.props.fetchBug(this.props.match.params.bugId);
    }

    onSubmit = (formValues) => {
        this.props.updateBug(this.props.match.params.bugId, formValues);
    }

    renderForm(bug) {
        if (bug) {
            return (
                <div>
                    <h3 className="FormTitle">Edit your bug</h3>
                    <BugForm 
                        initialValues={bug}
                        onSubmit={this.onSubmit} 
                        projId={bug.project_id}
                        match={this.props.match.path}
                    />
                </div>
            )
        } else {
            return (
            <div className="ShowSkeletonContainer">
                <div>
                    <Skeleton variant="text" height={240} />
                    <Skeleton variant="rect" height={640} /> 
                </div>
            </div>
            );
        }
    }

    render() {
        let bug = this.props.bug;
        return (
            <div>
                {this.renderForm(bug)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        bug: state.bug.bug,
    };
};

export default connect(
    mapStateToProps, 
    { fetchBug, updateBug }
)(BugUpdate);