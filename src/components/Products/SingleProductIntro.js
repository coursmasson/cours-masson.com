import React, { Component } from "react";

export class SingleProductIntro extends Component {
  render() {
    // stage is product details gotten from firebase
    let currentStage = this.props.currentStage
    return (
      <div
        className="intro intro--lessgutter"
        style={{ backgroundImage: "url(images/temp/calculus.jpg)" }}
      >
        <div className="shell">
          <div className="intro__content">
            <h3 className="intro__title">Niveau - {currentStage.levelName}</h3>
            <h2>{currentStage.title}</h2>
            {/**TODO: ask what is this */}
            <h3 className="intro__subtitle">60 heures de cours</h3>
            <p>
             {currentStage.description}
            </p>
            <h4>du20/10/2017 au 25/10/2017</h4>
            <h4>35 avenue Ste Foy, 92200 Neuilly sur Seine</h4>
          </div>
          {/* /.intro__content */}
        </div>
        {/* /.shell */}
      </div>
    );
  }
}
