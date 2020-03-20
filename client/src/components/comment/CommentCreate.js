import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
import CommentForm from './CommentForm';
import '../../styles/FormStyles.css';

class CommentCreate extends Component {
    onSubmit = (formValues) => {
        let bugId = this.props.match.params.bugId;
        bugId = parseInt(bugId);
        this.props.createComment(formValues, bugId);
    }
    
    render() {
        let bugId = this.props.match.params.bugId;
        return (
            <div>
                <h3 className="FormTitle">Write a comment</h3>
                <CommentForm 
                    onSubmit={this.onSubmit}
                    comm={bugId}
                />
            </div>
        );
    };
};

export default connect(
    null,
    { createComment }
)(CommentCreate);