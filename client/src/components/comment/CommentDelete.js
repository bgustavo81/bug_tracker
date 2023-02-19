import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteCommentModal from '../DeleteCommentModal';
import Button from '@material-ui/core/Button';
import history from '../../history';
import { fetchComment, deleteComment } from '../../actions';
import "../../styles/DeleteModalStyles.css";

class CommentDelete extends React.Component {
    componentDidMount() {
        this.props.fetchComment(this.props.match.params.commentId);
    }

    renderActions(comm) {
        const commentId = this.props.match.params.commentId;
        return (
            <div className="DeleteButtons">
            <Button 
                onClick={() => this.props.deleteComment(commentId)}
                size="large"
                variant="outlined"
                color="secondary"
            >
                Delete
            </Button>
            <Link to={`/bug/${comm.bug_id}`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                    Cancel
                </Button>
            </Link>
        </div>
        )
    }

    renderContent(comm) {
        return `Are you sure you want to delete the comment "${comm.content}"?`
    }

    render() {
        let comm = this.props.comm;
        if (!comm) {
            return <div className="DeleteModalContainer"></div>
        }
        return (
            <DeleteCommentModal
                title="Delete Comment"
                content={this.renderContent(comm)}
                actions={this.renderActions(comm)}
                onDismiss={() => history.push(`/bug/${comm.bug_id}`)}
            />
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        comm: state.comment.comment
    };
};

export default connect(
    mapStateToProps,
    { fetchComment, deleteComment }
)(CommentDelete);