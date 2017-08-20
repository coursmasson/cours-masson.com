export const Update_Quantity = 'Update_Quantity';
export const Fetch_Products_Start = 'Fetch_Products_Start';
export const Fetch_Products_End = 'Fetch_Products_End';
var api = require('../utils/moltin.js');

export function updateQuantity(quantity) {
  return {
    type: Update_Quantity,
    payload: quantity
  }
};

export function FetchProductsStart() {
  return {
    type: Fetch_Products_Start
  }
};

export function FetchProductsEnd(data) {
  return {
    type: Fetch_Products_End,
    payload: data
  }
};

export function GetProducts() {
  return function (dispatch) {
      
      dispatch(FetchProductsStart())

      return api.GetProducts()
      
        .then((products) => {
          dispatch(FetchProductsEnd(products))
        }) 
    }
};