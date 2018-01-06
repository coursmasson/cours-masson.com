import React, { Component } from "react";

export class SingleProductIntro extends Component {
  render() {
    return (
      <div
        className="intro intro--lessgutter"
        style={{ backgroundImage: "url(images/temp/calculus.jpg)" }}
      >
        <div className="shell">
          <div className="intro__content">
            <h3 className="intro__title">Niveau - Matière</h3>
            <h2>Titre du STAGE sur 2 lignes maximum</h2>
            <h3 className="intro__subtitle">60 heures de cours</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
