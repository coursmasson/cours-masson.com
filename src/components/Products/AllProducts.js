import React, { Component } from 'react';
import { connect } from 'react-redux';
import MailingList from '../global/MailingList';
import * as moment from 'moment';

function mapStateToProps(state) {
  return (state)
}

class AllProducts extends Component {

  render() {

    if (this.props.css !== null && this.props.products.products && this.props.products.products.data.length > 0) {

      var products = this.props.products.products;
      var stages = this.props.stages.stages;
      return (
        <div className="courses">
          {products.data.map(function (product) {
            console.log(product.background_colour);
            let stage = stages ? stages.list[product.sku] : {};
            let background;
            if (product.background_colour) {
              background = product.background_colour
            } else {
              background = '#d9d9d9';
            }
            
            return (

              <div className="course">
                <a href={"/product/" + product.id} key={product.id}>
                  <div className="course__image">
                    <img src="images/temp/math.jpg" alt="" />

                    <span className="course__image-label">{stage.period !== undefined ? stage.period.duration : 0} heures</span>
                  </div>

                  <div className="course__content">
                    <h4>-</h4>

                    <h3>{product.name}</h3>

                    <p>{stage.description || '--'}</p>

                    <h4>{stage.levelName}</h4>

                    <div className="course__foot">
                      <div className="course__foot-inner">
                        <p className="course__date">
                          <i className="ico-calendar"></i>
                          {
                            stage.period.sessionType === 'continue' ?
                              <span>Du {stage.period.continueDates ? moment(stage.period.continueDates[0]).format('DD/MM/YYYY') : '-'} au {stage.period.continueDates ? moment(stage.period.continueDates[stage.period.continueDates.length - 1]).format('DD/MM/YYYY') : '-'}
                              </span>
                              :
                              <span>Du {stage.period.startDate ? moment(stage.period.startDate).format('DD/MM/YYYY') : '-'} au {stage.period.endDate ? moment(stage.period.endDate).format('DD/MM/YYYY') : '-'}
                              </span>
                          }
                        </p>

                        <p className="course__location">
                          <i className="ico-location"></i>

                          {stage.period.address}
                        </p>
                      </div>

                      <span className="course__price">
                        {product.meta.display_price.with_tax.amount / 100} €
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
