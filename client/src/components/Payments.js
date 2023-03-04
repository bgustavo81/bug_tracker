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
                stripeKey="pk_test_gG5b0dBHoou9aCC9EfQVv7FV"
                token={token => this.props.handleToken(token)}
            >
                <Button variant="contained" color="secondary">Buy Bugs</Button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);