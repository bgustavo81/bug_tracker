import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, fetchBugsByProject } from '../../actions/index';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/ProjectShowStyles.css';
import { Button } from '@material-ui/core';
import SkeletonBlock from '../Skeleton';
import Payments from '../Payments';

class ProjectShow extends Component {
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.projId);
        this.props.fetchBugsByProject(this.props.match.params.projId);
    }

    renderAdmin(bug) {
        const auth = this.props.auth;
        switch(auth) {
            case null: 
                return;
            case false:
                return (
                    <React.Fragment />
                )
            default:
                return (
                    <div>
                        { auth ? (
                            <React.Fragment>
                                <Link to={`/bug/update/${bug.bug_id}`} style={{ textDecoration: 'none' }}>
                                    <Button color="primary">
                                        Edit
                                    </Button>
                                </Link>
                                <Link to={`/bug/delete/${bug.bug_id}`} style={{ textDecoration: 'none' }}>
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

    renderImage(bug) {
        if (bug.image) {
            return (
                <div className="ImageShowContainer">
                    <Link to={`/bug/${bug.bug_id}`}>
                        <img className="ImageShow" src={'https://my-foto-bucket-123.s3.us-east-2.amazonaws.com/'+ bug.image} />
                    </Link>
                </div>
            );
        } else {
            return (
                <>
                </>
            )
        }
    }

    renderList() {
        let bugs = this.props.bug;
        let projId = this.props.match.params.projId;
        projId = parseInt(projId);
        return bugs.map(bug => {
            return (
                <div key={bug.bug_id} className="ListCard">
                    <div>
                        <h4 className="ListCardTitle">
                            <Link to={`/bug/${bug.bug_id}`} style={{ textDecoration: 'none', color: "black" }}>
                                {bug.bug_title}
                            </Link>
                        </h4>
                        {this.renderImage(bug)}
                        <div className="ProjectListCardContent">
                            <p><b>Priority:</b> {bug.priority}</p>
                            <p><b>Status:</b> {bug.status}</p>
                            <p><b>Description:</b> {bug.bug_desc}</p>
                            <p><b>Deadline:</b> {bug.deadline}</p>
                            <p><b>Created:</b> <Moment date={bug.created} format="LLL"/></p>
                            <p><b>Author:</b> {bug.dev_email}</p>
                        </div>
                    </div>
                    <div className="ListButtons">
                        <Link to={`/bug/${bug.bug_id}`} style={{ textDecoration: 'none' }}>
                            <Button>View</Button>
                        </Link>
                        {this.renderAdmin(bug)}
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        const projId = this.props.match.params.projId;
        let auth = this.props.auth;
        if (!auth) {
            return (
            <div className="ListCreateButton">
            </div>
            )
        } else if (auth.credits > 0)  {
            return (
            <div className="ListCreateButton">
                <Link to={`/bug/new/${projId}`} style={{ textDecoration: 'none'}}>
                    <Button variant="outlined" color="primary">Create Bug</Button>
                </Link>
            </div>
            )
        } else {
            return (
                <Payments />
            )
        }
    }

    renderProject(proj) {
        return (
            <div className="ProjectShowContainer">
                { proj ? (
                <React.Fragment>
                    <div className="ShowInfo">
                    
                    <h2 className="ShowTitle">{proj.title}</h2>
                        <div className="ShowContent">
                            <p><b>Description:</b> {proj.content}</p>
                            <p><b>Deadline:</b> {proj.deadline}</p>
                            <p><b>Created:</b> <Moment date={proj.created_at} format="LLL"/></p>

                        </div>

                    <div className="ShowLink">
                        <Link to="/projects" style={{ textDecoration: 'none'}} >
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
        const proj = this.props.proj;
        return (
            <div className="ListContainer">
                <div className="ShowContainer">
                    {this.renderProject(proj)}
                </div>
                { this.props.bug ? (
                    <React.Fragment>
                        <div className="ListCreateButton">
                            {this.renderCreate()}
                        </div>
                        <div className="ListArticles">{this.renderList()}</div>                
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
        proj: state.project.project,
        bug: state.bug.bugs,
        auth: state.auth.user
    }
}

export default connect (
    mapStateToProps,
    {fetchProject, fetchBugsByProject}
)(ProjectShow);