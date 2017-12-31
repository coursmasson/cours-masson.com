import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div>
      <main role="main" id="container" className="main-container push">
      <section>
        <div className="content">
            <div className="loading">
                    <p className="loading-text">Chargement...</p>
            </div>
        </div>
      </section>
      </main>
      </div>
    )
  };
};

export default Loading;
