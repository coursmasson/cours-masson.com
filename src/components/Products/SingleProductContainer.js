import React, { Component } from "react";
import SingleProduct from "./SingleProduct";
import ProductHeader from "./ProductHeader";
import { connect } from "react-redux";
import Loading from "../global/Loading";

import { SingleProductIntro } from './SingleProductIntro'
import HomeHeader from "../Home/HomeHeader";
import HomeIntro from "../Home/HomeIntro";

import { fetchProductsAndStages } from '../../actions/index'
var api = require("../../utils/moltin.js");



function mapStateToProps(state) {
  return state;
}

class Product extends Component {
  // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidMount() {
    // check if we already have a moltin products in the store
    if ((this.props.products.fetched === false) || (this.props.stages.fetched === false)) {
      // dispatch an action to our redux reducers
      this.props.dispatch(fetchProductsAndStages());
    }
  }

   addToCart = id => {
        this.props.dispatch(dispatch => {
          api
            .AddCart(id, this.props.product.quantity)
  
            .then(cart => {
              console.log(cart);
              dispatch({ type: "Cart_Updated", gotNew: false });
            })
  
            .then(() => {
              dispatch({ type: "Fetch_Cart_Start", gotNew: false });
  
              api
                .GetCartItems()
  
                .then(cart => {
                  dispatch({
                    type: "Fetch_Cart_End",
                    payload: cart,
                    gotNew: true
                  });

                });
            })
            .catch(e => {
              console.log(e);
            });
        });
      };
  render() {
    if (this.props.products.products && this.props.stages.stages ) {
      var products = this.props.products.products;

      var ID = window.location.pathname.slice(9, 100);
  
      var productArray = this.props.products.products.data
        .filter(product => product.id === ID);
  
      console.log("productArray is ", productArray);
      var product = productArray[0];
      product.quantity = 0;
      let currentStage = this.props.stages.stages.list[product.slug]
  
      console.log({currentStage: currentStage})
  
      var updateQuantity = quantity => {
        this.props.dispatch(dispatch => {
          dispatch({ type: "Update_Quantity", payload: quantity });
        });
      };
  
  
      var background = product.background_colour;
      return (
        <div>
          <ProductHeader currentStage={currentStage} product={product} />
          <SingleProductIntro currentStage={currentStage} />
          <div className="main">
            <div className="section-courses">
              <div className="shell">
                <SingleProduct currentStage={currentStage} product={product} addToCart={this.addToCart}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps)(Product);
