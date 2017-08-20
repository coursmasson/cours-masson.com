import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChangeStyle } from '../../actions/actions.js';

function mapStateToProps(state) {
    return(state)
}

class StylesMenu extends Component {
  render() {
    
    const boundChangeStyle = (name) => {
      this.props.dispatch((dispatch) => {
          dispatch(ChangeStyle(name))
      })
    }

    return (
      <div className="style-links-container">

      {this.props.categories.categories.data.map(function(category) {
        return (
            <a name={category.name} className="style-link" key={category.id} onClick={(e) => {boundChangeStyle(e.target.name);e.preventDefault()}}><span className="hide-content">Display </span>{category.name}<span className="hide-content"> styles</span></a>
        )
      })}
      </div>
    )

  }
}

export default connect(mapStateToProps)(StylesMenu);
