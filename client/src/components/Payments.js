import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {

        return (
            <StripeCheckout 
                name="Bug Trackerly"
                description="$5 for 5 bugs"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.stripePublishableKey}
            >
                <Button variant="contained" color="secondary">Buy Bugs</Button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);