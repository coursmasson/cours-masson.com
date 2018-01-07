import React, {Component} from 'react';
import { push } from 'react-router-redux';
import CartCounter from './CartCounter';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return state
};

class CartHeader extends Component {
  render() {

    var toProducts = () => {
      this.props.dispatch((dispatch) => {
        dispatch(push('/products'))
      })
    }

    var toStyles = () => {
      this.props.dispatch((dispatch) => {
        dispatch(push('/styles'))
      })
    }

    var toHome = () => {
      this.props.dispatch((dispatch) => {
        dispatch(push('/'))
      })
    }

    let headerText;

    if(this.props.router.location.pathname.includes("cart")) {
      headerText = "Shopping Cart";
    }

    else if(this.props.router.location.pathname.includes("checkout")) {
      headerText = "Checkout";
    }

    else if(this.props.router.location.pathname.includes("order-confirmation")) {
      headerText = "Order Confirmation";
    }


    return (
      <header className="header header--alt header--relative">
        <div className="shell">
          <div className="header__inner">
            <a href="#" className="nav-trigger">
              <span />
              <span />
              <span />
            </a>
            <a href="#" className="logo">
              <img className="white" src="images/logo.png" alt />
              <img className="black" src="images/logo-black.png" alt />
              <img className="logo-mobile" src="images/logo-mobile.png" alt />
            </a>
            <nav className="nav-select">
              <ul>
                <li>
                  <a href="#">Niveau</a>
                </li>
                <li>
                  <a href="#">Matière</a>
                </li>
              </ul>
            </nav>{/* /.nav-select */}
            <nav className="nav-secondary">
              <ul>
                <li className="featured">
                  <a href="#">Stages</a>
                </li>
                <li>
                  <a href="#">Cours Particuliers</a>
                </li>
              </ul>
            </nav>{/* /.nav-secondary */}
            <nav className="nav nav--wide">
              <ul>
                <li className="signup">
                  <a href="#">Devenir Enseignant</a>
                </li>
                <li>
                  <a href="#">Qui sommes nous</a>
                </li>
                <li>
                  <a href="#">Aide</a>
                </li>
                <li>
                  <a href="#">Panier</a>
                </li>
                <li>
                  <a href="#">Connexion</a>
                </li>
              </ul>
            </nav>{/* /.nav */}
            <a href="#" className="nav-close">Fermer Le Menu</a>
          </div>{/* /.header__inner */}
        </div>{/* /.shell */}
      </header>
    )
  };
};

export default connect(mapStateToProps)(CartHeader);
