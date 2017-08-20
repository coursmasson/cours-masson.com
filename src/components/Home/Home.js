import React, { Component } from 'react';
import '../../App.css';
import HomeHeader from './HomeHeader';
import HomeMainSection from './HomeMainSection';
import Footer from '../global/Footer';
import MobileNav from '../global/Mobile/MobileNav';
import Loading from '../global/Loading';
import { connect } from 'react-redux';
import { GetProducts, GetCollections, GetCategories } from '../../actions/actions.js';

function mapStateToProps(state) {
    return(state)
}

class Home extends Component {
  
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
    
    const boundGetCategories = () => {
      this.props.dispatch((dispatch) => {
          dispatch(GetCategories())
      })
    }
    
    const boundGetCollections = () => {
      this.props.dispatch((dispatch) => {
          dispatch(GetCollections())
      })
    }
  
    // check if we already have a moltin products in the store
    if(this.props.products.fetched === false) {
      boundGetProducts()
    }

    // now we do the same thing for categories
    if(this.props.categories.fetched === false) {
        boundGetCategories();  
      }

    // then collections
    if(this.props.collections.fetched === false) {
      boundGetCollections();
    }

  }

  render() {
    if(this.props.collections.collections !== null && this.props.products.products !== null && this.props.categories.categories !== null) {
      return (
        <div>
        <MobileNav />
        <HomeHeader />
        <HomeMainSection />
        <Footer />
      </div>
      );
    }
    else {
      return (
        <div>
        <MobileNav />
        <HomeHeader />
        <Loading />
        <Footer />
      </div>
      );
    }
  }
}

export default connect(mapStateToProps)(Home);
