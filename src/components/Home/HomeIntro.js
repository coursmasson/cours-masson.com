import React, { Component } from 'react';

class HomeIntro extends Component {

     showLevels() {
       const { levelIsVisible } = this.state;
       this.setState({
         // toggle value of `opened`
         levelIsVisible: !levelIsVisible,
       });

     }
     constructor(props) {
       super(props);
       this.state = {
         levelIsVisible : false
       }
       this.showLevels = this.showLevels.bind(this);
     }
  render() {
    return (
      <div className="intro" style={{ 'backgroundImage': 'url(images/temp/intro.jpg)' }}>
        <div className="shell">
          <div className="intro__content">
            <h1>Cours Masson</h1>

            <h3>Trouvez un stage pour intégrer puis réussir dans les fillières sélectives</h3>



              <div className="intro__actions">
                        <div className="select-level">
                          <label htmlFor="level" className="hidden" >Choisissez votre niveau</label>

                          <div className="selectric-wrapper"><div className="selectric-hide-select">
                          <select name="level" id="level" tabindex="-1">
                            <option className="option" value="1" selected="" disabled="">Choisissez votre niveau</option>

                            <option className="option" value="0">Niveau</option>

                            <option className="option" value="2">Choisissez votre niveau</option>

                            <option className="option" value="3">Choisissez votre niveau</option>
                          </select>
                          </div><div className="selectric"><span onClick={this.showLevels} className="label">Choisissez votre niveau</span><b className="button">▾</b></div>

                          {this.state.levelIsVisible && (
                            <div style={{display:'block', zIndex:'1', marginTop:'-1px', width:'100%'}} className="selectric-items" tabindex="-1"><div className="selectric-scroll"><ul><li data-index="0" className="option disabled selected">Choisissez votre niveau</li><li data-index="1" className="option">Niveau</li><li data-index="2" className="option">Choisissez votre niveau</li><li data-index="3" className="option last">Choisissez votre niveau</li></ul></div></div>
                          )}
                            <input className="selectric-input" tabindex="0" />
                          </div>
                        </div>

                        <div className="select-course">
                          <label htmlFor="level" className="hidden">Choisissez votre matière</label>

                          <div className="selectric-wrapper"><div className="selectric-hide-select"><select name="level" id="field-1#" tabindex="-1">
                            <option value="1" selected="" disabled="">Choisissez votre matière</option>

                            <option value="0">Matière</option>

                            <option value="2">Choisissez votre matière</option>

                            <option value="3">Choisissez votre matière</option>
                          </select></div><div className="selectric"><span className="label">Choisissez votre matière</span><b className="button">▾</b></div><div className="selectric-items" tabindex="-1"><div className="selectric-scroll"><ul><li data-index="0" className="disabled selected">Choisissez votre matière</li><li data-index="1" className="">Matière</li><li data-index="2" className="">Choisissez votre matière</li><li data-index="3" className="last">Choisissez votre matière</li></ul></div></div><input className="selectric-input" tabindex="0" /></div>
                        </div>
                      </div>
                </div>
        </div>
      </div>
    )
  }
}

export default HomeIntro;
