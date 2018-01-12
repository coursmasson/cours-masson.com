import React, { Component } from 'react';
import MailingList from '../global/MailingList';
import CheckoutSummary from './CheckoutSummary';
import { Field, reduxForm } from 'redux-form';
import api from '../../utils/moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {push: state.push}
};

var CheckoutTemplate = {
  customer: {
  name: 'John Doe',
  email: 'john@doe.co'
  },
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  },
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  }
}
var PaymentTemplate = {
    "gateway": "stripe",
    "method": "purchase",
    "first_name": "John",
    "last_name": "Doe",
    "number": "4242424242424242",
    "month": "08",
    "year": "2020",
    "verification_value": "123"
}

class CheckoutForm extends Component {

  handleKeyDown = function (e) {
  if (e.key === 'Enter' && e.shiftKey === false) {
    e.preventDefault();
  }
};

  mySubmit = (values) => {
      CheckoutTemplate.customer.name = values.name;
      CheckoutTemplate.customer.email = values.email;

      CheckoutTemplate.billing_address.first_name = values.billing_firstname;
      CheckoutTemplate.billing_address.last_name = values.billing_lastname;
      CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
      CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
      CheckoutTemplate.billing_address.city = values.billing_state;
      CheckoutTemplate.billing_address.county = values.billing_postcode;
      CheckoutTemplate.billing_address.country = values.billing_country;

      CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
      CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
      CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
      CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
      CheckoutTemplate.shipping_address.city = values.shipping_state;
      CheckoutTemplate.shipping_address.county = values.shipping_postcode;
      CheckoutTemplate.shipping_address.country = values.shipping_country;

    this.props.dispatch((dispatch) => {
      dispatch({type: "Submit_Payment"})
    })

    api.Checkout(CheckoutTemplate)

    .then((order) => {
      api.OrderPay(order.data.id, PaymentTemplate)
      api.DeleteCart()
    })

    .then(() => {
      this.props.dispatch((dispatch) => {
        dispatch({type: "Payment_Complete"})
        dispatch(push('/order-confirmation'))
      })
    })

    .catch((e) => {
      console.log(e)
    })

    .catch((e) => {
      console.log(e)
    })

    .catch((e) => {
      console.log(e)
    })
  }

  render() {

    return (
      <main role="main" id="container" className="main-container push">
      <section className="checkout">
          <div className="content">
              <CheckoutSummary />
              <form className="checkout-form"  noValidate onSubmit={this.props.handleSubmit(this.mySubmit)} onKeyDown={(e) => { this.handleKeyDown(e); }}>
                  <fieldset className="details">
                      <div className="form-header">
                          <h2>Your details</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="input-wrap name required">
                                <span className="hide-content">Name</span>
                                  <Field component="input" className="name" required="required" placeholder="Name" name="name" type="text" aria-label="Name"/>
                              </label>
                              <label className="input-wrap email required">
                                  <span className="hide-content">Email address</span>
                                  <Field component="input" className="email" required="required" placeholder="Email address" name="email" type="email" aria-label="Email"/>
                              </label>
                          </div>
                          <button type="button" className="continue">Continue</button>
                      </div>
                  </fieldset>
                  <fieldset className="payment collapsed">
                      <div className="form-header inactive">
                          <h2>Paiement</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="input-wrap name">
                                  <span className="hide-content">Name on card</span>
                                  <Field component="input" required="required" placeholder="Name on card" name="card_name" type="text" aria-label="Name on card"/>
                              </label>
                              <label className="input-wrap card required">
                                  <span className="hide-content">Card number</span>
                                  <Field component="input" required="required" placeholder="Card number" name="card-number" maxLength="23" type="tel" aria-label="Card number"/>
                              </label>
                              <div className="input-wrap expiry-month">
                                <label className="select-fallback required">
                                  <span className="hide-content">Card expiry month</span>
                                  <select id="expiry-month" required="required" name="expiry-month">
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                  </select>
                                </label>
                              </div>
                              <div className="input-wrap expiry-year">
                                <label className="select-fallback required">
                                  <span className="hide-content">Card expiry year</span>
                                  <select id="expiry-year" required="required" name="expiry-year">
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                  </select>
                                </label>
                              </div>
                              <label className="input-wrap cvc required">
                                  <span className="hide-content">CVC code</span>
                                  <Field component="input" required="required" placeholder="CVC" maxLength="4" name="card_cvc" type="tel" aria-label="CVC"/>
                              </label>
                          </div>
                          <button type="submit" className="pay" aria-live="polite">
                            <div className="loading-icon">
                                <span className="hide-content">Processing</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.7 46.9" aria-hidden="true">
                                    <path fill="currentColor" d="M47.8,15.9c0,2.8-1,5.6-3.2,7.6L26.4,41.7L8.1,23.5c-4.3-4.3-4.3-11.1,0-15.4c2.1-2.1,4.9-3.2,7.7-3.2c2.8,0,5.6,1,7.6,3.2
                            l2.9,2.9l2.9-2.9c4.3-4.3,11.1-4.3,15.4,0C46.7,10.3,47.8,13.1,47.8,15.9z"/>
                                </svg>
                            </div>
                            <span className="copy">Pay</span>
                        </button>
                      </div>
                  </fieldset>
              </form>
          </div>
      </section>
      <MailingList />
  </main>
    )
  };
};

CheckoutForm = reduxForm({
  form: 'CheckoutForm'
})(CheckoutForm);

export default connect(mapStateToProps)(CheckoutForm);
