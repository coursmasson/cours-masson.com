import React, {Component} from 'react';
import { connect } from 'react-redux';
import MailingList from '../global/MailingList';

function mapStateToProps(state) {
    return(state)
}

class AllProducts extends Component {

  render() {

    if(this.props.css !== null && this.props.products.products && this.props.products.products.data.length > 0) {

      var products = this.props.products.products;

      return (
        <div className="courses">
                {products.data.map(function(product) {
                  console.log(product.background_colour);

                  let background;
                  if(product.background_colour) {
                    background = product.background_colour
                  } else {
                    background = '#d9d9d9';
                  }

                  return (

                      <div className="course">
                        <a href={"/product/" + product.id} key={product.id}>
                          <div className="course__image">
                            <img src="images/temp/math.jpg" alt="" />

                            <span className="course__image-label">60 heures</span>
                          </div>

                          <div className="course__content">
                            <h4>-</h4>

                            <h3>{product.name}</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>

                            <h4>Niveau</h4>

                            <div className="course__foot">
                              <div className="course__foot-inner">
                                <p className="course__date">
                                  <i className="ico-calendar"></i>

                                  Du 15/10:2017 au 20/10/2017
                            </p>

                                <p className="course__location">
                                  <i className="ico-location"></i>

                                  Paris, 75008
                            </p>
                              </div>

                              <span className="course__price">
                                {product.meta.display_price.with_tax.amount/100} €
                          </span>
                            </div>
                          </div>
                        </a>
                      </div>
                  )
                })}
        </div>
      )

    }

    return (
      <main role="main" id="container" className="main-container push">
      <section className="products">
        <div className="content">
          <p>You do not have any products</p>
        </div>
      </section>
      <MailingList />
    </main>
    )


  }
}


export default connect(mapStateToProps)(AllProducts);
