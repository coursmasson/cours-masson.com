import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from '../Products/ProductImage';
var api = require('../../utils/moltin.js');

function mapStateToProps(state) {
    return(state)
}

class CartItems extends Component {




  render() {

    var cart_decrement = (ID, quantity) => {
      this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Cart_Start"})

        api.UpdateCartMinus(ID, quantity)

        .then((cart) => {
          console.log("cart quantity updated")
          dispatch({type: "Fetch_Cart_End", payload: cart, gotNew: true})
          })

          .catch((e) => {
            console.log(e)
          })

        })

      };

    var cart_increment = (ID, quantity) => {
      this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Cart_Start"})

        api.UpdateCartPlus(ID, quantity)

        .then((cart) => {
          console.log("cart quantity updated")

          dispatch({type: "Fetch_Cart_End", payload: cart, gotNew: true})
        })

        .catch((e) => {
          console.log(e)
        })

      })
    }

    var cart_edit = (ID, quantity) => {

      this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Cart_Start"})

        api.UpdateCart(ID, quantity)

        .then((cart) => {
          console.log("cart quantity updated")
        dispatch({type: "Fetch_Cart_End", payload: cart})
        })

        .catch((e) => {
          console.log(e)
        })
      })
    }
      
    var items = this.props.cart.cart.data;

    var products = this.props.products.products;
    return (<div>
        {items.map(cartItem  => {

              let currentStage = this.props.stages.stages.list[cartItem.sku]
                   return       (<div className="cart__item" key={cartItem.sku}>
                            <h4>Niveau - {currentStage.levelName}</h4>
                            <h3>{currentStage.title}</h3>
                            <p>
                              <span>60</span> heures de cours
                            </p>
                            <p>
                              <span>
                                <i className="ico-calendar-red" />
                              </span>
                              du 17/05/2017 au 19/05/2017
                            </p>
                            <p>
                              <span>
                                <i className="ico-location-red" />
                              </span>
                              {currentStage.period.address}
                            </p>
                          </div>)
        })}
      </div>)
  };
};

export default connect(mapStateToProps)(CartItems);
