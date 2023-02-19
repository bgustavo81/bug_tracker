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
        this.props.updateComment(this.props.match.params.commentId, formValues);   
    }

    renderForm(comm) {
        if (comm) {
            return(
                <div>
                    <h3 className="FormTitle">Edit comment</h3>
                    <CommentForm 
                        initialValues={comm}
                        onSubmit={this.onSubmit}
                        comm={comm}
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
        let comm = this.props.comm;
        return (
            <div>
                {this.renderForm(comm)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comm: state.comment.comment
    }
}

export default connect(
    mapStateToProps,
    {fetchComment, updateComment}
)(CommentUpdate);
