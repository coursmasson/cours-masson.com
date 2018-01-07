import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import HomeIntro from './HomeIntro';
import HomeMainSection from './HomeMainSection';
import Footer from '../global/Footer';
import MobileNav from '../global/Mobile/MobileNav';
import Loading from '../global/Loading';
import { connect } from 'react-redux';

import { fetchProductsAndStages } from '../../actions'
import firebase from '../../utils/firebase';

// import the moltin api utility
var api = require('../../utils/moltin.js');

function mapStateToProps(state) {
  return (state)
}

class Home extends Component {

  componentWillMount() {
    const script = document.createElement("script");

    script.src = "../../js/production.min.js";
    script.async = false;

    // document.body.appendChild(script);
  }


  // a react lifecycle event, read more at http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidMount() {

    // check if we already have a moltin stages in the store
    if (this.props.stages.fetched === false) {

      this.props.dispatch(fetchProductsAndStages())

    } 
  }

  render() {
    if (this.props.stages.stages !== null) {
      return (
        <div>
          <HomeHeader />
          <HomeIntro />
          <HomeMainSection />
        </div>
      );
    }
    else {
      return (
        <div>
          <HomeHeader />
          <HomeIntro />
          <Loading />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(Home);
