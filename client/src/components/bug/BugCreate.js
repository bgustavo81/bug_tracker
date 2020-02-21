import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBug } from '../../actions';
import BugForm from './BugForm';
import "../../styles/FormStyles.css"

class BugCreate extends Component {
    onSubmit = (formValues) => {
        let projId = this.props.match.params.projId;
        projId = parseInt(projId);
        this.props.createBug(formValues, projId);
    }
    
    render() {
        let projId = this.props.match.params.projId;
        return (
            <div>
                <h3 className="FormTitle">Create Bug</h3>
                <BugForm 
                    onSubmit={this.onSubmit} 
                    projId={projId}
                />
            </div>
        )
    }
}



export default connect(
    null, 
    { createBug }
)(BugCreate);