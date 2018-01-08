import * as firebase from "firebase";
import stages from "../reducers/stages";

// import the moltin api utility
var api = require("../utils/moltin.js");

//import { createAction } from 'redux-actions';

let cartTotal = 0;

export const IncrementCart = cart => {
  return {
    type: "INCREMENT_CART",
    cartTotal: cartTotal++
  };
};

//const checkoutAction = createAction('INCREMENT', amount => amount++);

export const FETCH_PRODUCTS_START = "Fetch_Products_Start";
export const FETCH_PRODUCTS_END = "Fetch_Products_End";

export const FETCH_STAGES_START = "Fetch_Stages_Start";
export const FETCH_STAGES_END = "Fetch_Stages_End";

export const FETCH_CART_START = "Fetch_Products_Start"
export const FETCH_CART_END = "Fetch_Cart_End"

const fetchStagesStart = () => ({
  type: FETCH_STAGES_START
});
const fetchStagesEnd = payload => ({
  type: FETCH_STAGES_END,
  payload: payload
});

const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START
});

const fetchProductsEnd = payload => ({
  type: FETCH_PRODUCTS_END,
  payload: payload
});


// fetch both Products and stages
export const fetchProductsAndStages = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    dispatch(fetchStagesStart());

    api
      .GetProducts()
      .then(productsData => {
        console.log({ productsData: productsData });
        return firebase
          .database()
          .ref()
          .child("stages")
          .once("value")
          .then(snap => { 
            const stages = snap.val()
            dispatch(fetchProductsEnd(productsData))
            dispatch(fetchStagesEnd(stages))
           })
      })
      .catch(error => {
        console.log(error);
      });
  };
};


const fetchCartStart = () => ({type: FETCH_CART_START })
const fetchCartEnd = (payload) => ({
  type: FETCH_CART_END,
  payload: payload
})
export const fetchCart = () => {

  return (dispatch) => {

    dispatch(fetchCartStart())
      api
        .GetCartItems()
        .then(cart => {
          dispatch(fetchCartEnd(cart))
        })
  }
  
}
export default IncrementCart;
