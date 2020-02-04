import _ from 'lodash';
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

    render() {
        let bug = this.props.bug;
        if (!bug) {
            return (
                <div className="ShowSkeletonContainer">
                    <div>
                        <Skeleton variant="text" height={240} />
                        <Skeleton variant="rect" height={640} /> 
                    </div>
                </div>
            )
        }
        let items = _.pick(bug, 'title', 'content');
        console.log(items);
        return (
        <div>
            <h3 className="FormTitle">Edit your bug</h3>
            <BugForm 
                initialValues={items}
                onSubmit={this.onSubmit} 
            />
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        bug: state.bug[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps, 
    { fetchBug, updateBug }
)(BugUpdate);