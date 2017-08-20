import React, { Component } from 'react';
import AllProducts from './AllProducts';
import Footer from '../global/Footer';
import ProductsHeader from './ProductsHeader';
import MobileNav from '../global/Mobile/MobileNav';
import { connect } from 'react-redux';
import Loading from '../global/Loading';
import { GetProducts } from '../../actions/actions.js';

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

class ProductsContainer extends Component {
  
  componentWillMount() {
       const script = document.createElement("script");

       script.src = "../../js/production.min.js";
       script.async = false;

       document.body.appendChild(script);
   }
  

  // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidMount() {

    const boundGetProducts = () => {
      this.props.dispatch((dispatch) => {
          dispatch(GetProducts())
      })
    }
    
    
    // check if we already have a moltin products in the store
    if(this.props.products.fetched === false) {
      boundGetProducts()
    }
  }

  render() {

    if(this.props.products.products) {

      return (
            <div>
              <MobileNav />
              <ProductsHeader />
              <AllProducts/>
              <Footer />
            </div>
        )
    } else {
      return (
        <div>
          <MobileNav />
          <ProductsHeader />
          <Loading />
          <Footer />
        </div>

      )
    }
  }
}

export default connect(mapStateToProps)(ProductsContainer);
