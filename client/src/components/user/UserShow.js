import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/UserShowStyles.css';
import { Button } from '@material-ui/core';

class UserShow extends React.Component {

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    renderAdmin(auth) {
        console.log(auth);
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
                                    {/* <Link to={`/user/update/${auth.user_id}`} style={{ textDecoration: 'none' }}>
                                        <Button color="primary">
                                            Edit
                                        </Button>
                                    </Link> */}
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
        return (
            <div className="UserShowWrapper">
                <div className="UserShowContainer">
                    <h3>View your account {auth.name}</h3>
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
        auth: state.auth.user
    }
}

export default connect(
    mapStateToProps,
    {fetchUser}
)(UserShow);