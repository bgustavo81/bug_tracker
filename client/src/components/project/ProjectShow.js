import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, fetchBugs } from '../../actions/index';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/ProjectShowStyles.css';
import { Button } from '@material-ui/core';
import SkeletonBlock from '../Skeleton';

class ProjectShow extends Component {
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.projId);
        this.props.fetchBugs();
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
                if (bug.author === auth[0].user_id)
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

    renderList() {
        let bug = this.props.bug.flat();
        let projId = this.props.match.params.projId;
        projId = parseInt(projId);
        bug = bug.filter(bug => bug.project_id === projId);
        console.log(bug);
        return bug.map(bug => {
            return (
                <div key={bug.bug_id} className="ListCard">
                    <div>
                        <h4 className="ListCardTitle">
                            <Link to={`post/${bug.bug_id}`} style={{ textDecoration: 'none', color: "black" }}>
                                {bug.bug_title}
                            </Link>
                        </h4>
                            <p><b>Image:</b> image</p>
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
        if (this.props.auth) {
            return (
                <div className="ListCreateButton">
                <Link to={`/bug/new/${projId}`} style={{ textDecoration: 'none'}}>
                    <Button variant="outlined" color="primary">Create Bug</Button>
                </Link>
            </div>
            )
        }
    }

    renderProject(proj) {
        return (
            <div className="ShowContainer">
                { proj ? (
                <React.Fragment>
                    <div className="ShowInfo">
                    
                    <h2 className="ShowTitle">{proj.title}</h2>
                        <div className="ShowContent">
                            <p><b>Description:</b> {proj.content}</p>
                            <p><b>Deadline:</b> {proj.deadline}</p>
                            <p><b>Created:</b> <Moment date={proj.created} format="LLL"/></p>

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
        const [ proj ] = this.props.proj;
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
    console.log(state)
    return {
        proj: Object.values(state.proj),
        bug: Object.values(state.bug),
        auth: state.auth
    }
}

export default connect (
    mapStateToProps,
    {fetchProject, fetchBugs}
)(ProjectShow);