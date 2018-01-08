import React, { Component } from "react";
import { connect } from "react-redux";
import ProductImage from "../Products/ProductImage";
import * as moment from "moment";
var api = require("../../utils/moltin.js");

function mapStateToProps(state) {
  return state;
}
class DateComponent extends React.Component {
  render() {
    let stage = this.props.stage;
    return stage.period.sessionType === "continue" ? (
      <span>
        Du{" "}
        {stage.period.continueDates
          ? moment(stage.period.continueDates[0]).format("DD/MM/YYYY")
          : "-"}{" "}
        au{" "}
        {stage.period.continueDates
          ? moment(
              stage.period.continueDates[stage.period.continueDates.length - 1]
            ).format("DD/MM/YYYY")
          : "-"}
      </span>
    ) : (
      <span>
        Du{" "}
        {stage.period.startDate
          ? moment(stage.period.startDate).format("DD/MM/YYYY")
          : "-"}{" "}
        au{" "}
        {stage.period.endDate
          ? moment(stage.period.endDate).format("DD/MM/YYYY")
          : "-"}
      </span>
    );
  }
}
class CartItems extends Component {
  renderDate = stage => {};

  render() {
    var cart_decrement = (ID, quantity) => {
      this.props.dispatch(dispatch => {
        dispatch({ type: "Fetch_Cart_Start" });

        api
          .UpdateCartMinus(ID, quantity)

          .then(cart => {
            console.log("cart quantity updated");
            dispatch({ type: "Fetch_Cart_End", payload: cart, gotNew: true });
          })

          .catch(e => {
            console.log(e);
          });
      });
    };

    var cart_increment = (ID, quantity) => {
      this.props.dispatch(dispatch => {
        dispatch({ type: "Fetch_Cart_Start" });

        api
          .UpdateCartPlus(ID, quantity)

          .then(cart => {
            console.log("cart quantity updated");

            dispatch({ type: "Fetch_Cart_End", payload: cart, gotNew: true });
          })

          .catch(e => {
            console.log(e);
          });
      });
    };

    var cart_edit = (ID, quantity) => {
      this.props.dispatch(dispatch => {
        dispatch({ type: "Fetch_Cart_Start" });

        api
          .UpdateCart(ID, quantity)

          .then(cart => {
            console.log("cart quantity updated");
            dispatch({ type: "Fetch_Cart_End", payload: cart });
          })

          .catch(e => {
            console.log(e);
          });
      });
    };

    var items = this.props.cart.cart.data;

    var products = this.props.products.products;
    return (
      <div>
        {items.map(cartItem => {
          let currentStage = this.props.stages.stages.list[cartItem.sku];
          return (
            <div className="cart__item" key={cartItem.sku}>
              <h4>Niveau - {currentStage.levelName}</h4>
              <h3>{currentStage.title}</h3>
              <p>
                <span>60</span> heures de cours
              </p>
              <p>
                <span>
                  <i className="ico-calendar-red" />
                </span>
                <DateComponent stage={currentStage} />
              </p>
              <p>
                <span>
                  <i className="ico-location-red" />
                </span>
                {currentStage.period.address}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartItems);
