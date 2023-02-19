import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBug, fetchCommentsByBug } from '../../actions/index';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from '@material-ui/core';
import SkeletonBlock from '../Skeleton';
import '../../styles/ProjectShowStyles.css';


class BugShow extends Component {
    componentDidMount() {
        this.props.fetchBug(this.props.match.params.bugId);
        this.props.fetchCommentsByBug(this.props.match.params.bugId);
    }

    renderAdmin(comm) {
        const auth = this.props.auth;
        switch(auth) {
            case null:
                return;
            case false:
                return (
                    <React.Fragment />
                )
            default: 
                if (comm.user_id === auth.user.user_id) {
                    return (
                        <div>
                            { auth ? (
                                <React.Fragment>
                                    <Link to={`/comment/update/${comm.comment_id}`} style={{ textDecoration: 'none' }}>
                                        <Button color="primary">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link to={`/comment/delete/${comm.comment_id}`} style={{ textDecoration: 'none' }}>
                                        <Button color="secondary">
                                            Delete
                                        </Button>
                                    </Link>                 
                                </React.Fragment>
                            ) : <React.Fragment /> }
                        </div>
                    )
                }
        }
    }




    renderList() {
        let comments = this.props.comm;
        let bugId = this.props.match.params.bugId;
        bugId = parseInt(bugId);
        return comments.map(comm => {
            return (
                <div key={comm.comment_id} className="ListCard">
                <div>
                    <h4 className="ListCardTitle">
                    </h4>
                    <div className="ProjectListCardContent">
                        <p><b>Update:</b> {comm.content}</p>
                        <p><b>Created:</b> <Moment date={comm.created} format="LLL"/></p>
                        <p><b>Author:</b> {comm.author_email}</p>
                    </div>
                </div>
                <div className="ListButtons">
                    {this.renderAdmin(comm)}
                </div>
            </div>
            )
        })
    }

    renderCreate() {
        const bugId = this.props.match.params.bugId;
        if (this.props.auth) {
            return (
                <div className="ListCreateButton">
                    <Link to={`/comment/new/${bugId}`} style={{ textDecoration: 'none'}}>
                        <Button variant="outlined" color="primary">Comment</Button>
                    </Link>
                </div>
            )
        }
    }

    renderImage(bug) {
        if (bug.image) {
            return (
                <div className="ImageShowContainer">
                    <img className="ImageShow" src={"https://my-foto-bucket-123.s3.us-east-2.amazonaws.com/"+ bug.image} />
                </div>
            );
        }
    }

    renderBug(bug) {
        return (
            <div className="BugShowContainer">
            { bug ? (
            <React.Fragment>
                <div className="ShowInfo">
                    <h2 className="ShowTitle">{bug.bug_title}</h2>
                        {this.renderImage(bug)}
                    <div className="ShowContent">
                        <p><b>Priority:</b> {bug.priority}</p>
                        <p><b>Status:</b> {bug.status}</p>
                        <p><b>Description:</b> {bug.bug_desc}</p>
                        <p><b>Deadline:</b> {bug.deadline}</p>
                        <p><b>Created:</b> <Moment date={bug.created} format="LLL"/></p>
                        <p><b>Author:</b> {bug.dev_email}</p>
                    </div>

                <div className="CommentShowLink">
                    <Link to={`/project/${bug.project_id}`} style={{ textDecoration: 'none'}} >
                    <Button variant="outlined" color="primary">Back</Button>
                    </Link>
                </div>
            </div>
            </React.Fragment>
            ) : (
            <div className="ShowSkeletonContainer">
                <div>
                    <Skeleton variant="text" height={240} />
                    <Skeleton variant="rect" height={640} /> 
                </div>
            </div>
            )}
        </div>
        )
    }

    render() {
        const bug = this.props.bug;
        return (
            <div className="ListContainer">
                <div className="ShowContainer">
                    {this.renderBug(bug)}
                </div>
                { this.props.comm ? (
                    <React.Fragment>
                        <div className="ListArticles">{this.renderList()}</div>
                        <div className="ListCreateButton">
                            {this.renderCreate()}
                        </div>                    
                    </React.Fragment>
                ) : (
                    <SkeletonBlock />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comm: state.comment.comments,
        bug: state.bug.bug,
        auth: state.auth
    }
}

export default connect (
    mapStateToProps,
    { fetchBug, fetchCommentsByBug }
)(BugShow)