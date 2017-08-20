import React, { Component } from 'react';
import MailingList from '../global/MailingList';
import StylesHeader from './StylesHeader';
import Footer from '../global/Footer';
import StylesMenu from './StylesMenu';
import StylesHeading from './StylesHeading';
import StyleProducts from './StyleProducts';
import Loading from '../global/Loading';
import { connect } from 'react-redux';
import MobileNav from '../global/Mobile/MobileNav';
import { GetProducts } from '../../actions/actions.js';
import { GetCategories } from '../../actions/actions.js';
import { InitialStyle } from '../../actions/actions.js';

function mapStateToProps(state) {
    return(state)
}

class StylesContainer extends Component {
  
  componentWillMount() {
       const script = document.createElement("script");

       script.src = "../../js/production.min.js";
       script.async = false;

       document.body.appendChild(script);
   }
  

  // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidMount() {

    const boundInitialStyle = () => {
      this.props.dispatch((dispatch) => {
          dispatch(InitialStyle(this.props.categories.categories.data[0].name))
    })
  }

    
    const boundGetCategoriesAndInitialStyle = () => {
      this.props.dispatch((dispatch) => {
          dispatch(GetCategories())
          .then(() => {
            boundInitialStyle()
          })
      })
    }


    const boundGetProducts = () => {
      this.props.dispatch((dispatch) => {
          dispatch(GetProducts())
      })
    }
    
    // check if we already have a moltin products in the store
    if(this.props.products.fetched === false) {
      boundGetProducts()
    }
    
    // check if we already have a moltin products in the store
    if(this.props.categories.fetched === false) {
      boundGetCategoriesAndInitialStyle();  
  
    }

  }

  render() {

    if(this.props.categories.categories && this.props.products.products) {
      
        if(this.props.categories.categories.data.length > 0) {
          
        return (
          <div>
          <MobileNav />
          <StylesHeader />
          <main role="main" id="container" className="main-container push">
            <section className="style-links">
              <div className="content">
                <StylesMenu />
              </div>
            </section>
            <section className="products">
                <div className="content">
                  <StyleProducts />
                </div>
            </section>
            <MailingList/>
          </main>
          <Footer />
          </div>
        )
      }
      else {
        return (
          <div>
          <MobileNav />
          <StylesHeader />
          <StylesHeading />
          <main role="main" id="container" className="main-container push">
              <section className="style-links">
                  <div className="content">
                      <StylesMenu />
                  </div>
              </section>
              <section className="products">
                <div className="content">
                  <p>You do not have any categories set up with products</p>
                </div>
              </section>
              <MailingList/>
          </main>
          <Footer />
          </div>
        )
      }
    }

    else {
      return (
        <div>
        <MobileNav />
        <StylesHeader/>
        <Loading />
        <Footer />
        </div>
      )
    }
  };
};

export default connect(mapStateToProps)(StylesContainer);
