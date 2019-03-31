import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    // componentWillMount(){
    //     this.props.onInitPurhchase()
    // }

    checkoutCancelledHandler = () => {
        // go back history
            this.props.history.goBack()
        //
    }

    checkoutContinuedHandler = () => {
        // go to history
            this.props.history.replace('/checkout/contact-data')
        //
    }
    render(){
        let summary = <Redirect to="/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, //get ings
        purchased: state.order.purchased, // get purchased
    }
}
export default connect(mapStateToProps)(Checkout)