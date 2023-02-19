import React, {Component} from 'react';
import Moment from 'react-moment';
import "moment-timezone";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchBugs} from "../../actions/index";
import Skeleton from "@material-ui/lab/Skeleton";
import "../../styles/ProjectShowStyles.css";
import {Button} from '@material-ui/core';

class BugList extends Component {
    componentDidMount() {
        this.props.fetchBugs();
    }

    
    renderImage(bug) {
        if (bug.image) {
            return (
                <div className="ImageShowContainer">
                    <Link to={`/bug/${bug.bug_id}`}>
                        <img className="ImageShow" src={"https://my-foto-bucket-123.s3.us-east-2.amazonaws.com/"+ bug.image} alt="image of issue"/>
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
        const auth = this.props.auth;
        switch(auth) {
            case null: 
                return;
            case false:
                return (
                    <div className="ShowSkeletonContainer">
                        <div>
                            <Skeleton variant="text" height={240} />
                            <Skeleton variant="rect" height={640} /> 
                        </div>
                    </div>                
                )
            default:
                bugs.filter(bug => bug.dev_email === auth.user.email);
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
                            <div>
                                { bug.author === auth.user.user_id ? (
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
                            </div>
                        </div>
                    )
                })
        }
    }



    render() {
        return (
            <div className="ProjectShowContainer">
                <div className="ListContainer">
                    <h2 className="ShowTitle">Bugs To Do</h2>
                    <div className="ShowContainer">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        bug: state.bug.bugs,
        auth: state.auth
    }
}

export default connect (
    mapStateToProps,
    {fetchBugs}
)(BugList);