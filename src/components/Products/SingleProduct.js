import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllProducts from '../Products/AllProducts';
import CategoriesContainer from '../Categories/CategoriesContainer';
import MailingList from '../global/MailingList';
import * as api from '../../utils/moltin';


const mapStateToProps = state => {
  return {
    products: state.products
  }
}

class SingleProduct extends Component {
  componentWillMount() {
       const script = document.createElement("script");

       script.src = "../../js/production.min.js";
       script.async = false;

       document.body.appendChild(script);
   }

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

          var products = this.props.products.products;

          var ID = window.location.pathname.slice(9, 100)

          var productArray = this.props.products.products.data.filter(function(product) {
            return product.id === ID;
          })
console.log('productArray is ', productArray);
          var product = productArray[0];

          product.quantity = product.quantity ? product.quantity : 0;

          var updateQuantity = (quantity) => {
            this.props.dispatch((dispatch) => {
                dispatch({type: "Update_Quantity", payload: quantity});
                product.quantity = quantity;
            })
          }

          var addToCart = (id) => {
            this.props.dispatch((dispatch) => {
              console.log('this.props =>', this.props);
              api.AddCart(id, product.quantity)

              .then((cart) => {
                console.log(cart)
                dispatch({type: "Cart_Updated", gotNew: false})
              })

              .then(() => {
                  dispatch({type: "Fetch_Cart_Start", gotNew: false})

                  api.GetCartItems()

                  .then((cart) => {
                    dispatch({type: "Fetch_Cart_End", payload: cart, gotNew: true})
                  })
              })
              .catch((e) => {
                console.log(e)
              })
            })
          }

          var background = product.background_colour;
          if(product) {
    return (
      <div className="main">
        <div className="section-courses">
          <div className="shell">
            <div className="select-sort">
              <label htmlFor="sort">Trier par</label>

              <select name="sort" id="sort">
                <option value="1">Tarif</option>
                <option value="2">Tarif</option>
                <option value="3">Tarif</option>
              </select>
            </div>

                <h2>{product.name}</h2>
                <p className="price"><span className="hide-content">Prix </span>{'$' + product.meta.display_price.with_tax.amount/100}</p>
                <div className="description">
                    <p className="hide-content">Product details:</p>
                    <p>{product.description}</p>

            <form className="product" noValidate>
                <div className="quantity-input">
                    <p className="hide-content">Product quantity.</p>
                    <p className="hide-content">Change the quantity by using the buttons, or alter the input directly.</p>
                    <button type="button" className="decrement number-button" onClick={() => {updateQuantity(product.quantity - 1)}} ><span className="hide-content">Decrement quantity</span><span aria-hidden="true">-</span></button>
                    <input className="quantity" name="number" type="number" min="1" max="10"  value={product.quantity} size="2" onChange={(event) => {updateQuantity(event.target.value)}}/>
                    <button type="button" className="increment number-button" onClick={() => {updateQuantity(product.quantity + 1);}} ><span className="hide-content" >Increment quantity</span><span aria-hidden="true">+</span></button>
                </div>
                <button type="submit" className="submit" onClick={(e) => {addToCart(product.id);console.log(product.quantity); e.preventDefault()}}>Add to cart</button>
            </form>


            <div className="paging">
              <ul>
                <li className="current">
                  <a href="#">1</a>
                </li>

                <li>
                  <a href="#">2</a>
                </li>

                <li>
                  <a href="#">3</a>
                </li>

                <li>
                  <a href="#">4</a>
                </li>

                <li>
                  <a href="#">Suite</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section-testimonials">
          <div className="shell-secondary">
            <h3>Ils Parlent Du Cours Masson</h3>

            <div className="tabs-testimonials">
              <div className="tabs__head">
                <div className="slider-testimonials">
                  <div className="slider__clip">
                    <div className="slider__slides">
                      <div className="slider__slide">
                        <a href="#tab1" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab2" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab3" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab4" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab5" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab6" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab7" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tabs__body">
                <div className="tab current" id="tab1">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab2">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab3">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab4">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab5">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab6">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab7">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    ) } else {
      return null
    }
  }
}
export default connect(mapStateToProps)(SingleProduct);
