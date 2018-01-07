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

    console.log('this.props is ', this.props);
    var items = this.props.cart.cart.data;

    var products = this.props.products.products;

    return (
      <div>
        {items.map(function(item) {
          console.log('item is ', item);

          var productArray = products.data.filter(function(product) {
              return product.id === item.product_id;
            });

          var product = productArray[0];

          var background = product.background_colour;

          var TotalPriceHidden = "hidden"

          if(item.quantity > 1) {
            TotalPriceHidden = ""
          };

          return (


            <div className="cart-item" key={item.id}>
              <div className="cart__cols">
                  <div className="cart__col cart__col--size-1">
                      <div className="cart__col-inner">
                          <div className="cart__item">
                              <h4>Niveau - Matière</h4>

                              <h3>{item.name}</h3>

                              <p><span>60</span> heures de cours</p>

                              <p>
                                  <span>
              <i className="ico-calendar-red"></i>
              </span> du 17/05/2017 au 19/05/2017
                              </p>

                              <p>
                                  <span>
              <i className="ico-location-red"></i>
              </span> 54 rue de Ponthieu, Paris 75008
                              </p>
                          </div>
                      </div>
                  </div>

                  <div className="cart__col cart__col--size-3">
                      <div className="cart__col-inner">
                          <div className="cart__info">
                              <h4 className="cart__title">Quantité</h4>

                              <div className="select-quantity">
                                  <button type="button" className="increment number-button" onClick={() => {cart_increment(item.id, item.quantity)}}><span className="hide-content">-</span><span aria-hidden="true">+</span></button>
                                  <input className="quantity" name="number" type="number" min="1" max="10"  size="2" defaultValue={item.quantity} onBlur={(event) => {cart_edit(item.id, event.target.value);console.log(event.target.value)}}/>
                                  <button type="button" className="decrement number-button" onClick={() => {cart_decrement(item.id, item.quantity)}} ><span className="hide-content">+</span><span aria-hidden="true">-</span></button>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="cart__col cart__col--size-3">
                      <div className="cart__col-inner">
                          <div className="cart__info cart__info--alt">
                              <h4 className="cart__title">TVA 20%</h4>

                              <p>-</p>

                              <span>Non applicable</span>
                          </div>
                      </div>
                  </div>

                  <div className="cart__col cart__col--size-2">
                      <div className="cart__col-inner">
                          <div className="cart__info">
                              <h4 className="cart__title">Prix TTC</h4>

                              <p className="price">{item.value.amount/100} €</p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  };
};

export default connect(mapStateToProps)(CartItems);
