import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import Skeleton from '@material-ui/lab/Skeleton';
import UserForm from './UserForm';
import "../../styles/FormStyles.css";

class UserUpdate extends React.Component {
    onSubmit = (formValues) => {
        this.props.updateUser(this.props.match.params.userId, formValues);
    }

    render() {
        let auth = this.props.auth;
        let user = this.props.user;
        if (!auth || !user) {
            return (
                <div className="ShowSkeletonContainer">
                    <div>
                        <Skeleton variant="text" height={240} />
                        <Skeleton variant="rect" height={640} /> 
                    </div>
                </div>
            )
        } else {
                return (
                    <div>
                        <h3 className="FormTitle">Edit your project</h3>
                        <UserForm 
                            initialValues={user}
                            onSubmit={this.onSubmit} 
                        />
                    </div>
                );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    {updateUser}
)(UserUpdate)