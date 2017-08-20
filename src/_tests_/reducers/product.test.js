import product from '../../reducers/product.js';
import { updateQuantity } from '../../actions/actions.js';

describe('product reducer', () => {
  
  it('has a default state', () => {
    expect(product(undefined, { type: 'unexpected' })).toEqual({
      quantity: 1
    })
    
  });
  
  it('can handle Update_Quantity', () => {
    expect(product(undefined, updateQuantity(3)
    )).toEqual({
      quantity: 3
    })
    
  });
  
});