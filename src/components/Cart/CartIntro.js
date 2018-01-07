import React from 'react'

export class CartIntro extends React.Component {
  render () {
    return (	<div className="intro intro--cart" style={{backgroundImage: 'url(assets/images/temp/cart.jpg)'}}>
        <div className="shell">
          <div className="intro__content">
            <h2>Votre Panier</h2>
          </div>{/* /.intro__content */}
        </div>{/* /.shell */}
      </div>)
  }
}