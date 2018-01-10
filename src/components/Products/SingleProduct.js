import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import AllProducts from "../Products/AllProducts";
import CategoriesContainer from "../Categories/CategoriesContainer";
import MailingList from "../global/MailingList";
import * as api from "../../utils/moltin";
import * as moment from 'moment';
import DateRangePickerWrapper from '../calendar/airbnb-calendar.jsx';
import isSameDay from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { push } from 'react-router-redux';



const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
]

const checkDate = (dates)=> (day1) => dates.some(day2 => moment(day1).isSame(day2, 'day'))
class SingleProduct extends Component {



  render() {

    moment.locale('fr'); // Polish
    var renderDate = () => {

      let stage = this.props.currentStage;
      return  (stage.period.sessionType === 'continue' ?
          <span>Du {stage.period.continueDates ? moment(stage.period.continueDates[0]).format('DD/MM/YYYY') : '-'} au {stage.period.continueDates ? moment(stage.period.continueDates[stage.period.continueDates.length - 1]).format('DD/MM/YYYY') : '-'}
          </span>
          :
          <span>Du {stage.period.startDate ? moment(stage.period.startDate).format('DD/MM/YYYY') : '-'} au {stage.period.endDate ? moment(stage.period.endDate).format('DD/MM/YYYY') : '-'}
          </span>)
    }
    // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/

      var ID = window.location.pathname.slice(9, 100);
      console.log('this props is ', this.props);
      if(this.props.product) {
        console.log('productArray2 is ', productArray);
        var productArray = [this.props.product];
        let product = productArray[0];
        product.quantity = product.quantity ? product.quantity : 0;

        var updateQuantity = (quantity) => {
            this.props.dispatch((dispatch) => {
                                dispatch({type: "Update_Quantity", payload: quantity});
                                product.quantity = quantity;
                                })
        }

        var addToCart = (id) => {
              console.log('this.props2 =>', this.props);
              api.AddCart(id, product.quantity)
              .then((cart) => {
                    console.log('cart is ', cart)
                    //dispatch({type: "Cart_Updated", gotNew: false})
                    })
              .then(()=> {
                    if(window['confirm']("Est-ce pour vous-même?")) { // "is the course for yourself?"
                      this.props.dispatch((dispatch) => {
                        dispatch(push('/cart'));
                        window.location.href = "/cart";
                      })
                    } else {
                      let name = prompt("What's the name of the attendee?");
                      let email = prompt("What's the email of the attendee?");
                      let attendee = {
                      productId: id,
                      email: email,
                      name: name
                    };
                    api.AddCustomProductToCart({
                       "type": "custom_item",
                       "name": "course_attendee",
                       "sku": "attendee-" + email,
                       "description": JSON.stringify(attendee),
                       "quantity": 1,
                       "price": {
                       "amount": 0
                       }
                     }).then(()=> {
                         window.location.href = "/cart";
                     });
                    }
              })
              .catch((e) => {
                     console.log(e)
                     })

        }


      console.log('product is ', product);
      let currentStage = this.props.currentStage;

      let price = product.price[0];
      let amount = price.amount / 100;
      let currency = price.currency;

      if (product) {
        return (
          <div className="main">

            <div className="section-course">
              <div className="shell-secondary">
                <div className="section__inner">
                  <div className="section__content">
                    <div className="checklist">
                      <h4>Que vais-je apprendre ?</h4>
                      <ul className="list-checks">
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                        <li>
                          <i className="ico-check" />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </li>
                      </ul>
                      {/* /.list-checks */}
                      <a href="#" className="hidden-xs">
                        Voir la description
                      </a>
                    </div>
                    {/* /.checklist */}
                    <article className="article">
                      <h3>Description du stage</h3>
                          <p>
                            {product.description}
                            </p>
                      <div className="article__actions">
                        <a href="#" className="btn">
                          Télécharger Doc 1
                        </a>
                        <a href="#" className="btn">
                          Télécharger Doc 2
                        </a>
                      </div>
                      {/* /.article__actions */}
                    </article>
                    {/* /.article */}
                    <article className="article">
                      <header className="article__head">

                        <h3>Date de ce stage</h3>
                        {
                            //this.renderDate()
                            }
                      </header>
                      {/* /.article__head */}
                      <div className="calendars">
                        <DateRangePickerWrapper
                      isDayHighlighted={checkDate(currentStage.period.sessionType === 'continue' ? currentStage.period.continueDates : [currentStage.period.startDate])}
                      autoFocus={false}
                      
                          />
                        {/* /.calendar */}
                          {/* /.calendar */}
                      </div>
                      {/* /.calendars */}
                    </article>

                    <article className="article-professor">
                      <h3>Présentation du prof</h3>
                      <div className="article__body">
                        <div className="article__image">
                          <img src="images/temp/professor.png" alt />
                        </div>
                        {/* /.article__image */}
                        <div className="article__content">
                          <h4>Nom du professeur</h4>
                          <h4>Statut &amp; diplome</h4>
                          <h4>Enseigne à Nom de l’établisssment</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.Lorem ipsum dolor sit amet,
                            consectetur adipiscing
                          </p>
                        </div>
                        {/* /.article__content */}
                      </div>
                    </article>

                    {/* /.article */}
                    <article className="article">
                      <header className="article__head">
                        <h3>Lieu du stage</h3>
                        <p>21 avenue charles de gaule, 75008</p>
                      </header>
                      {/* /.article__head */}
                      <div className="article__map">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1560.0954583568189!2d2.2786033928900014!3d48.881901984553856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a41740596dec7c0!2sInstitution+Notre+Dame+De+Sainte+Croix!5e0!3m2!1sen!2sbg!4v1513672664387"
                          width="100%"
                          height={470}
                          frameBorder={0}
                          style={{ border: 0 }}
                          allowFullScreen
                        />
                      </div>
                      {/* /.article__map */}
                    </article>
                    {/* /.article */}
                    <article className="article article--alt">
                      <h3>Remarque</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </article>
                    {/* /.article */}
                  </div>
                  {/* /.section__content */}
                  <aside className="section__aside">
                    <div className="widget">
                      <div className="widget__head">
                        <h3 className="widget__title">{amount} {currency}</h3>
                        {/* /.widget__title */}
                      </div>
                      {/* /.widget__head */}
                      <div className="widget__body">
                        <div className="widget__actions">
                          <a href="#" className="widget__btn btn-danger">
                            S’inscrire À Ce Stage
                          </a>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="widget__btn widget__btn--info btn"
                          >
                            Ajouter Au Panier
                          </button>
                        </div>
                        {/* /.widget__actions */}
                        <div className="widget__content">
                          <h4>Date du Stage</h4>
                          <p>
                            <span>
                              <i className="ico-calendar-red" />
                            </span>
                            { /*this.renderDate() */}
                          </p>
                          <h4>Adresse du stage</h4>
                          <p>
                            <span>
                              <i className="ico-location-red" />
                            </span>
                            {currentStage.period.address}
                          </p>
                          <h4>Durée du stage</h4>
                          <p>60 heures de cours</p>
                        </div>
                        {/* /.widget__content */}
                      </div>
                      {/* /.widget__body */}
                    </div>
                    {/* /.widget */}
                  </aside>
                  {/* /.section__aside */}
                </div>
                {/* /.section__inner */}
              </div>
              {/* /.shell-secondary */}
            </div>
            {/* /.section-course */}
            <div className="section-suggestions">
              <div className="shell-large">
                <h3>Stages Du Même Niveau</h3>
                <div className="courses courses--alt">
                  <div className="course course--alt">
                    <a href="#">
                      <div className="course__image">
                        <img src="images/temp/microscope.jpg" alt />
                      </div>
                      {/* /.course__image */}
                      <div className="course__content">
                        <h4>Mathématiques</h4>
                        <h3>Nom Du Stage Sur 2 Lignes Maximum</h3>
                        <h4>Niveau</h4>
                        <div className="course__foot">
                          <div className="course__foot-inner">
                            <p className="course__date">
                              <i className="ico-calendar" />
                              Du 15/10:2017 au 20/10/2017
                            </p>
                            {/* /.course__date */}
                            <p className="course__location">
                              <i className="ico-location" />
                              Paris, 75008
                            </p>
                            {/* /.course__location */}
                          </div>
                          {/* /.course__foot-inner */}
                          <span className="course__price">1500 €</span>
                        </div>
                        {/* /.course__foot */}
                      </div>
                      {/* /.course__content */}
                    </a>
                  </div>
                  {/* /.course */}
                  <div className="course course--alt">
                    <a href="#">
                      <div className="course__image">
                        <img src="images/temp/microscope.jpg" alt />
                      </div>
                      {/* /.course__image */}
                      <div className="course__content">
                        <h4>Mathématiques</h4>
                        <h3>Nom Du Stage Sur 2 Lignes Maximum</h3>
                        <h4>Niveau</h4>
                        <div className="course__foot">
                          <div className="course__foot-inner">
                            <p className="course__date">
                              <i className="ico-calendar" />
                              Du 15/10:2017 au 20/10/2017
                            </p>
                            {/* /.course__date */}
                            <p className="course__location">
                              <i className="ico-location" />
                              Paris, 75008
                            </p>
                            {/* /.course__location */}
                          </div>
                          {/* /.course__foot-inner */}
                          <span className="course__price">1500 €</span>
                        </div>
                        {/* /.course__foot */}
                      </div>
                      {/* /.course__content */}
                    </a>
                  </div>
                  {/* /.course */}
                  <div className="course course--alt">
                    <a href="#">
                      <div className="course__image">
                        <img src="images/temp/microscope.jpg" alt />
                      </div>
                      {/* /.course__image */}
                      <div className="course__content">
                        <h4>Mathématiques</h4>
                        <h3>Nom Du Stage Sur 2 Lignes Maximum</h3>
                        <h4>Niveau</h4>
                        <div className="course__foot">
                          <div className="course__foot-inner">
                            <p className="course__date">
                              <i className="ico-calendar" />
                              Du 15/10:2017 au 20/10/2017
                            </p>
                            {/* /.course__date */}
                            <p className="course__location">
                              <i className="ico-location" />
                              Paris, 75008
                            </p>
                            {/* /.course__location */}
                          </div>
                          {/* /.course__foot-inner */}
                          <span className="course__price">1500 €</span>
                        </div>
                        {/* /.course__foot */}
                      </div>
                      {/* /.course__content */}
                    </a>
                  </div>
                  {/* /.course */}
                  <div className="course course--alt">
                    <a href="#">
                      <div className="course__image">
                        <img src="images/temp/microscope.jpg" alt />
                      </div>
                      {/* /.course__image */}
                      <div className="course__content">
                        <h4>Mathématiques</h4>
                        <h3>Nom Du Stage Sur 2 Lignes Maximum</h3>
                        <h4>Niveau</h4>
                        <div className="course__foot">
                          <div className="course__foot-inner">
                            <p className="course__date">
                              <i className="ico-calendar" />
                              Du 15/10:2017 au 20/10/2017
                            </p>
                            {/* /.course__date */}
                            <p className="course__location">
                              <i className="ico-location" />
                              Paris, 75008
                            </p>
                            {/* /.course__location */}
                          </div>
                          {/* /.course__foot-inner */}
                          <span className="course__price">1500 €</span>
                        </div>
                        {/* /.course__foot */}
                      </div>
                      {/* /.course__content */}
                    </a>
                  </div>
                  {/* /.course */}
                </div>
                {/* /.courses */}
              </div>
              {/* /.shell */}
            </div>
            {/* /.section-suggestions */}
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
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab2" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab3" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab4" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab5" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab6" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                          <div className="slider__slide">
                            <a href="#tab7" className="slider__slide-image">
                              <img src="images/temp/circle.png" alt />
                            </a>
                            {/* /.slider__slide-image */}
                          </div>
                          {/* /.slider__slide */}
                        </div>
                        {/* /.slider__slides */}
                      </div>
                      {/* /.slider__clip */}
                    </div>
                    {/* /.slider */}
                  </div>
                  {/* /.tabs__head */}
                  <div className="tabs__body">
                    <div className="tab current" id="tab1">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab2">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab3">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab4">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab5">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab6">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                    <div className="tab" id="tab7">
                      <h4 className="tab__title">Prénom Nom</h4>
                      <h4 className="tab__subtitle">Niveau</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    {/* /.tab */}
                  </div>
                  {/* /.tabs__body */}
                </div>
                {/* /.tabs */}
              </div>
              {/* /.shell-secondary */}
            </div>
            {/* /.section-testimonials */}
          </div>
        );
      } else {
        return null;
      }
} else {
  return null
}

  }
}
export default SingleProduct
