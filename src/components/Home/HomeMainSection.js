import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllProducts from '../Products/AllProducts';
import TopPicksContainer from './TopPicksContainer';
import CategoriesContainer from '../Categories/CategoriesContainer';
import MailingList from '../global/MailingList';
var api = require('../../utils/moltin.js');


const mapStateToProps = state => {
  return {
    stages: state.stages,
    products: state.products
  }
}

class HomeMainSection extends Component {
  componentWillMount() {
       const script = document.createElement("script");

       script.src = "../../js/production.min.js";
       script.async = false;

       document.body.appendChild(script);
   }

    // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
    componentDidMount() {

      // check if we already have a moltin products in the store
      if(this.props.products.fetched === false) {

        // dispatch an action to our redux reducers
        this.props.dispatch((dispatch) => {

            // this action will set a fetching field to true
            dispatch({type: "Fetch_Products_Start"})

            // get the moltin products from the API
            api.GetProducts()

            .then((products) => {
              /* now that we have the products, this action will set fetching to false and fetched to true,
              as well as add the moltin products to the store */
              dispatch({type: "Fetch_Products_End", payload: products})
            })
        })
      }
    }
  render() {
    return (
      <div className="main">
        <div className="section-courses">
          <div className="shell">
            <div className="select-sort">
              <label htmlFor="sort">Trier par</label>

              <select name="sort" id="sort">
                <option value="1">Tarif</option>
                <option value="2">Tarif</option>
                <option value="3">Tarif</option>
              </select>
            </div>


            <AllProducts/>

            <div className="paging">
              <ul>
                <li className="current">
                  <a href="#">1</a>
                </li>

                <li>
                  <a href="#">2</a>
                </li>

                <li>
                  <a href="#">3</a>
                </li>

                <li>
                  <a href="#">4</a>
                </li>

                <li>
                  <a href="#">Suite</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section-testimonials">
          <div className="shell-secondary">
            <h3>Ils Parlent Du Cours Masson</h3>

            <div className="tabs-testimonials">
              <div className="tabs__head">
                <div className="slider-testimonials">
                  <div className="slider__clip">
                    <div className="slider__slides">
                      <div className="slider__slide">
                        <a href="#tab1" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab2" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab3" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab4" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab5" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab6" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>

                      <div className="slider__slide">
                        <a href="#tab7" className="slider__slide-image">
                          <img src="images/temp/circle.png" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tabs__body">
                <div className="tab current" id="tab1">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab2">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab3">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab4">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab5">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab6">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="tab" id="tab7">
                  <h4 className="tab__title">Prénom Nom</h4>

                  <h4 className="tab__subtitle">Niveau</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomeMainSection);
