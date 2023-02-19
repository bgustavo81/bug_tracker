import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SkeletonBlock from '../Skeleton';
import Button from '@material-ui/core/Button';
import { fetchProjects } from '../../actions/index';
import "../../styles/ListStyles.css";

class ProjectList extends Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    renderAdmin(project) {
        const user_id = this.props.auth.user.user_id;
        const proj_user_id = project.user_id;
        switch(project) {
          case null:
            return;
          case false:
            return (
              <React.Fragment />
            )
          default: 
            if (proj_user_id === user_id) {
                return (
                    <div>
                        <Link to={`/project/update/${project.project_id}`} style={{ textDecoration: 'none' }}>
                            <Button color="primary">
                                Edit
                            </Button>
                        </Link>
                        <Link to={`/project/delete/${project.project_id}`} style={{ textDecoration: 'none' }}>
                            <Button color="secondary">
                                Delete
                            </Button>
                        </Link>
                    </div>
                )
            }
        }
      }


    

    renderList(projects) {
        return projects.map(project => {
            return (
                <div key={project.project_id} className="ListCard">
                    <div>
                        <h4 className="ListCardTitle">
                            <Link to={`project/${project.project_id}`} style={{ textDecoration: 'none', color: "black" }}>
                                {project.title}
                            </Link>
                        </h4>
                        <div className="PostListCardContent">
                            <p><b>Description:</b> {project.content}</p>
                            <p><b>Deadline:</b> {project.deadline}</p>
                            <p><b>Created:</b> <Moment date={project.created} format="LLL"/></p>
                        </div>
                    </div>
                    <div className="ListButtons">
                        <Link to={`/project/${project.project_id}`} style={{ textDecoration: 'none' }}>
                            <Button>View</Button>
                        </Link>
                        {this.renderAdmin(project)}
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        if (this.props.auth) {
            return (
                <div className="PostListCreateButton">
                    <Link to={`project/new`} style={{ textDecoration: 'none'}}>
                        <Button variant="outlined" color="primary">Create Project</Button>
                    </Link>
                </div>
            )
        }
    }

    render() {
        const projects = this.props.proj;
        return (
            <div className="ListContainer">
                { projects ? (
                    <React.Fragment>
                        <h2 className="ListTitle">Project Directory</h2>
                        <div className="ListCreateButton">
                            {this.renderCreate()}
                        </div>
                        <div className="ListArticles">{this.renderList(projects)}</div>              
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
        auth: state.auth,
        proj: state.project.projects
    }
}

export default connect(
    mapStateToProps,
    {fetchProjects}
)(ProjectList)