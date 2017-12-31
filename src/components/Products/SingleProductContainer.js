import React, { Component } from 'react';
import SingleProduct from './SingleProduct';
import Footer from '../global/Footer';
import CartHeader from '../Cart/CartHeader';
import ProductHeader from './ProductHeader';
import { connect } from 'react-redux';
import Loading from '../global/Loading';
import MobileNav from '../global/Mobile/MobileNav';

import HomeHeader from '../Home/HomeHeader';
import HomeIntro from '../Home/HomeIntro';
var api = require('../../utils/moltin.js');

function mapStateToProps(state) {
  return state
}

class Product extends Component {

  // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidMount() {

    // check if we already have a moltin products in the store
    if(this.props.products.fetched === false) {

      // dispatch an action to our redux reducers
      this.props.dispatch((dispatch) => {

          // this action will set a fetching field to true
          dispatch({type: "Fetch_Products_Start"})

          // get the moltin products from the API
          api.GetProducts()

          .then((products) => {
            /* now that we have the products, this action will set fetching to false and fetched to true,
            as well as add the moltin products to the store */
            dispatch({type: "Fetch_Products_End", payload: products})
          })
      })
    }
  }

  render() {

    if(this.props.products.products) {
      return (
        <div>
          <HomeHeader />
          <HomeIntro />
        <div className="main">
          <div className="section-courses">
            <div className="shell">
          <SingleProduct />
          </div>
          </div>
          </div>
          </div>
      )
    }

    else {
      return null
    }

  };
};

export default connect(mapStateToProps)(Product);
