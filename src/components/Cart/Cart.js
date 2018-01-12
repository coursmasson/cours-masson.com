import React, { Component } from "react";
import MobileNav from "../global/Mobile/MobileNav";
import MailingList from "../global/MailingList";
import Footer from "../global/Footer";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { CartIntro } from "./CartIntro";
import { fetchCart, fetchProductsAndStages } from "../../actions/index";
var api = require("../../utils/moltin.js");

function mapStateToProps(state) {
  return state;
}

class Cart extends Component {
  componentDidMount() {

    this.props.dispatch(fetchCart())

    if (this.props.products.fetched === false && this.props.stages.fetched === false) {
      this.props.dispatch(fetchProductsAndStages())
    }
  }

  render() {
    var toProducts = () => {
      this.props.dispatch(dispatch => {
        dispatch(push("/products"));
      });
    };


      var toHome = () => {
        this.props.dispatch(dispatch => {
          dispatch(push("/"));
        });
      };


    var toCheckout = () => {
      this.props.dispatch(dispatch => {
        dispatch(push("/checkout"));
      });
    };

    if (
      this.props.cart.fetched === true &&
      this.props.cart.fetching === false &&
      this.props.products.fetched === true &&
      this.props.stages.fetched === true
    ) {
      if (this.props.cart.cart.data[0]) {
        const price = this.props.cart.cart.meta.display_price.with_tax.formatted;
        let totalPrice = 0;
        let allCartItems = this.props.cart.cart.data;
        allCartItems.forEach((cartItem)=> {
          if(cartItem.type === 'cart_item') {
            allCartItems.forEach((customItem)=> { // look for matching custom items, which are students/course relationship
              if(customItem.type === 'custom_item') {
                console.log('found custom_item');
                if(JSON.parse(customItem.description).productId === cartItem.product_id) {// found student matching course
                  console.log('found student matching course!');
                  totalPrice += cartItem.unit_price.amount / 100;
                }
              }
            })
          }
        })
        var subtotal =
          totalPrice + "€" ;
        return (
          <div>
            <CartHeader />
            <CartIntro />
            <div className="main">
              <div className="section-cart">
                <div className="shell-secondary">
                  <header className="section__head">
                    <p>
                      Besoin d’aide pour passer commande ?{" "}
                      <a href="#">Contactez-nous</a> ou appelez-nous Au{" "}
                      <a href="tel:0143435456">01 43 43 54 56</a>
                    </p>
                  </header>
                  {/* /.section__head */}
                  <div className="cart">
                          <CartItems/>
                      {/* /.cart__col */}
                    {/* /.cart__cols */}
                    <div className="cart__total">
                      <div className="totals">
                        <div className="total">
                          <div className="total__inner">
                            <h4>Total TVA</h4>
                            <p>-</p>
                          </div>
                          {/* /.total__inner */}
                        </div>
                        <div className="total">
                          <div className="total__inner">
                            <h4>Total TTC</h4>
                            <p className="sum">{subtotal}</p>
                          </div>
                          {/* /.total__inner */}
                        </div>
                      </div>
                    </div>
                    {/* /.cart__total */}
                    <div className="cart__actions">
                      <a href="#" className="btn-info">
                        <span>Code promo</span>
                      </a>
                      <a href="#" className="btn-info">
                        <span>Coordonnée de facturation</span>
                      </a>
                      <a href="/checkout" className="btn-danger">
                        Valider
                      </a>
                    </div>
                    {/* /.cart__actions */}
                  </div>
                  {/* /.cart */}
                  <ul className="list-features">
                    <li>
                      <span>
                        <i className="ico-contract" />
                      </span>
                      <p>
                        Des stages donnés <br /> par des{" "}
                        <strong>professeurs agrégés</strong>
                      </p>
                    </li>
                    <li>
                      <span>
                        <i className="ico-people" />
                      </span>
                      <p>
                        Plus de de{" "}
                        <strong>
                          800 éléves <br />
                          déjà satisfaits
                        </strong>
                      </p>
                    </li>
                    <li>
                      <span>
                        <i className="ico-card" />
                      </span>
                      <p>
                        <strong>Paiement sécurisé</strong> par <br /> BNP
                        PARISBAS
                      </p>
                    </li>
                    <li>
                      <span>
                        <i className="ico-phone" />
                      </span>
                      <p>
                        Service Client par téléphone{" "}
                        <a className="phone-number">0 800 838 838</a>
                      </p>
                    </li>
                  </ul>
                  {/* /.list-features */}
                </div>
                {/* /.shell-secondary */}
              </div>
              {/* /.section-cart */}
            </div>
            {/* /.main */}
          </div>
        );
      } else {
        return (
          <div>
            <CartHeader />
            <main role="main" id="container" className="main-container push">
              <section className="cart">
                <div className="content">
                  <div className="cart-listing empty">
                    <p>Votre panier est vide
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </div>
        );
      }
    } else {
      return (
        <div>
          <CartHeader />
          <main role="main" id="container" className="main-container push">
            <section>
              <div className="content">
                <div className="loading">
                  <p className="loading-text">Chargement</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(Cart);
