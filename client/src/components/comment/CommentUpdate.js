import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchComment, updateComment } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import CommentForm from './CommentForm';
import "../../styles/FormStyles.css";

class CommentUpdate extends React.Component {
    componentDidMount() {
        this.props.fetchComment(this.props.match.params.commentId);
    }

    onSubmit = (formValues) => {
        console.log(this.props);
        this.props.updateComment(this.props.match.params.commentId, formValues);   
    }

    render() {
        let comm = this.props.comm;
        console.log(comm);
        if (!comm) {
            return (
                <div className="ShowSkeletonContainer">
                    <div>
                        <Skeleton variant="text" height={240} />
                        <Skeleton variant="rect" height={640} />
                    </div>
                </div>
            )
        }
        let items = _.pick(comm, 'content');
        console.log(items);
        return (
            <div>
                <h3 className="FormTitle">Edit comment</h3>
                <CommentForm 
                    initialValues={items}
                    onSubmit={this.onSubmit}
                    comm={comm}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comm: state.comm[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,
    {fetchComment, updateComment}
)(CommentUpdate);