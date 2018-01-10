import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from '../Products/ProductImage';
var api = require('../../utils/moltin.js');

function mapStateToProps(state) {
    return(state)
}

class CartItems extends Component {
/*
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

*/



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

    var cart_edit = (ID, quantity, productId) => {

      return new Promise((resolve, reject)=>{
let id = ID;
      this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Cart_Start"})



        api.UpdateCart(ID, quantity)

        .then((cart) => {
          console.log("cart quantity updated")
          dispatch({type: "Fetch_Cart_End", payload: cart})

          resolve({
            cart,
            id: ID,
            productId
          })
        })
        .catch((e) => {
          console.log(e)
          reject(e)
        })
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
        //coursesItems.push(item);
      } else {
        coursesItems.push(item);
      }
    })

    var products = this.props.products.products;

    var cart_delete = (ID, productId) =>{
      console.log('Called function cart_delete')
      cart_edit(ID,0, productId).then((resp)=>{
        //debugger;
        attendeesItems.forEach((attendeesItem)=> {
            let attendeeInfo = JSON.parse(attendeesItem.description);
            console.log('attendeeInfo is ', attendeeInfo, resp.id);
            if(attendeeInfo.productId === resp.productId) {
              console.log('Called ')
              cart_edit(attendeesItem.id,0, resp.productId)
            }
          })
      })
    }



          var TotalPriceHidden = "hidden"



              return (
                <div>
                  {coursesItems.map(function(cartItem) {
                              var productArray = products.data.filter(function(product) {
                                  return product.id === cartItem.product_id;
                                });

                              var product = productArray[0];

                              var background = product ? product.background_colour : '';

                              var TotalPriceHidden = "hidden"

                              if(cartItem.quantity > 1) {
                                TotalPriceHidden = ""
                              };

                              let attendees = [];

                              attendeesItems.forEach((attendeesItem)=> {
                                let attendeeInfo = JSON.parse(attendeesItem.description);
                                console.log('attendeeInfo is ', attendeeInfo);
                                if(product && attendeeInfo.productId === product.id) {
                                  attendees.push({
                                    name: attendeeInfo.name,
                                    email: attendeeInfo.email
                                  });
                                }
                              })

                    return(


            <div className="cart-item" key={cartItem.id}>
              <div className="cart__cols">
                  <div className="cart__col cart__col--size-6">
                      <div className="cart__col-inner">
                          <div className="cart__item">
                              <h4>Niveau - Matière</h4>

                              <h3>{cartItem.name}</h3>

                              <p><span>60</span> heures de cours</p>
                              Attendees:
                              <ul>
                              {attendees.map(function (attendee) {
                                return(
                                  <li>{attendee.name} ({attendee.email})</li>
                                )
                              })}
                              </ul>
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
                                  <button type="button" className="delete " onClick={() => {cart_delete(cartItem.id, cartItem.product_id)}}><span className="hide-content">-</span><span aria-hidden="true">Supprimer</span></button>

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

                              <p className="price">{cartItem.value.amount/100} €</p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          )
          })}
        </div>
      ) /* return () */
}}
export default connect(mapStateToProps)(CartItems);
