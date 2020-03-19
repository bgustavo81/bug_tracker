import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchUser } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/UserShowStyles.css';
import { Button } from '@material-ui/core';

class UserShow extends React.Component {

    renderAdmin(auth) {
        switch(auth) {
            case null:
                return;
            case false:
                return (
                    <React.Fragment />
                )
            default: 
                if (auth) {
                    return (
                        <div>
                            { auth ? (
                                <div className="UserButtons">
                                    <Link to={`/user/update/${auth.user_id}`} style={{ textDecoration: 'none' }}>
                                        <Button color="primary">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link to={`/projects`} style={{ textDecoration: 'none' }}>
                                        <Button>
                                            Cancel
                                        </Button>
                                    </Link>                 
                                </div>
                            ) : <React.Fragment /> }
                        </div>
                    )
                }
        }
    }

    render() {
        let auth = this.props.auth;
        let user = this.props.user;
        if (!auth) {
            return (
                <div className="ShowSkeletonContainer">
                    <div>
                        <Skeleton variant="text" height={240} />
                        <Skeleton variant="rect" height={640} /> 
                    </div>
                </div>        
            )
        }
        [auth] = auth;
        [user] = user;
        return (
            <div className="UserShowWrapper">
                <div className="UserShowContainer">
                    <h3>Manage your account {auth.first_name}</h3>
                    <p>First Name: {auth.first_name}</p>
                    <p>Last Name: {auth.last_name}</p>
                    <p>Email: {auth.email}</p>
                    <p>Credits: {auth.credits}</p>
                {this.renderAdmin(auth)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: Object.values(state.user),
        auth: state.auth
    }
}

export default connect(
    mapStateToProps
    // {fetchUser}
)(UserShow);