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




    var cart_edit = (ID, quantity,callback) => {

      this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Cart_Start"})

        api.UpdateCart(ID, quantity)

        .then((cart) => {
          console.log("cart quantity updated")
        dispatch({type: "Fetch_Cart_End", payload: cart})
        if(callback) callback()
        })

        .catch((e) => {
          console.log(e)
        })
      })
    }

    console.log('this.props is ', this.props);
    var items = this.props.cart.cart.data;
    let coursesItems = [];
    let attendeesItems = [];
    items.forEach((item)=> {
      if(item.type === 'custom_item') {
        attendeesItems.push(item);
        coursesItems.push(item);
      } else {
        coursesItems.push(item);
      }
    })

    var products = this.props.products.products;

    var cart_delete = (ID) =>{
      console.log('Called function cart_delete')
      cart_edit(ID,0,(()=>{
        attendeesItems.forEach((attendeesItem)=> {
            let attendeeInfo = JSON.parse(attendeesItem.description);
            console.log('attendeeInfo is ', attendeeInfo);
            if(attendeeInfo.productId === ID) {
              console.log('Called ')
              cart_edit(attendeesItem.id,0)
            }
          })
      }))
    }

    return (
      <div>
        {coursesItems.map(function(item) {
          console.log('item is ', item);

          var productArray = products.data.filter(function(product) {
              return product.id === item.product_id;
            });

          var product = productArray[0];



          var background = product ? product.background_colour : '';

          var TotalPriceHidden = "hidden"

          if(item.quantity > 1) {
            TotalPriceHidden = ""
          };
          let attendeeName;
          let attendeeEmail;

          attendeesItems.forEach((attendeesItem)=> {
            let attendeeInfo = JSON.parse(attendeesItem.description);
            console.log('attendeeInfo is ', attendeeInfo);
            if(product && attendeeInfo.productId === product.id) {
              attendeeName = attendeeInfo.name;
              attendeeEmail = attendeeInfo.email;
            }
          })



          return (


            <div className="cart-item" key={item.id}>
              <div className="cart__cols">
                  <div className="cart__col cart__col--size-1">
                      <div className="cart__col-inner">
                          <div className="cart__item">
                              <h4>Niveau - Matière</h4>

                              <h3>{item.name}</h3>

                              <p><span>60</span> heures de cours</p>
                              <p>Èlève: {attendeeName} ({attendeeEmail})</p>
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
                                  <button type="button" className="delete number-button" onClick={() => {cart_delete(item.id)}}><span className="hide-content">-</span><span aria-hidden="true">+</span></button>
                                  
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
