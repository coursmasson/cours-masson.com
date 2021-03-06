import React, { Component } from 'react';
import HeaderNav from '../global/HeaderNav';
import * as Header from '../../assets/img/headers/header.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

var HeaderStyle = {
  "backgroundImage": `url(${Header})`,
  "backgroundRepeat": "no-repeat",
  "backgroundAttachment": "scroll",
  "backgroundPosition": "center",
  "backgroundSize": "cover",
  "backgroundOrigin": "border-box"
};

function mapStateToProps(state) {
  return (state)
}

class HomeHeader extends Component {

  render() {

    var toProducts = () => {
      this.props.dispatch((dispatch) => {
        dispatch(push('/products'))
      })
    }

    return (
      <HeaderNav />
    )
  }
};

export default connect(mapStateToProps)(HomeHeader);
