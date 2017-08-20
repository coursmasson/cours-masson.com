export const Update_Quantity = 'Update_Quantity'

export function updateQuantity(quantity) {
  return {
    type: Update_Quantity,
    payload: quantity
  }
};

