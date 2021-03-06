import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponet from './hoc/asyncComponent/asyncComponent'

// compoents && containers
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBulider/BurgerBulider'

import Logout from './containers/Auth/Logout/Logout'

import * as actions from './store/actions/index'

// lazy loading
const asyncCheckout = asyncComponet(() => {
    return import('./containers/Checkout/Checkout')
})

const asyncOrders= asyncComponet(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponet(() => {
  return import('./containers/Auth/Auth')
})
//

class App extends Component {
  // check authen for show menu
  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  //

  render() {

    // show menu from props.isAuthenticated)
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
        
      )
    }
    //

    return (
      <div>
          {/* render layout menu */}
          <Layout>
            {routes}
          </Layout>
          {/*  */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null // token from authen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
