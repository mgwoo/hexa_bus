import React, {Component} from 'react';
import {connect} from 'react-redux';

import Nav from '../nav';
import InfoLine from './infoLine';

const heroStyle = {
  backgroundImage: 'url(hero.jpg)',
}

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const codeFooter = (
      <section className="under-group">
        you can check detail code on <a href="#">here</a>
      </section>
    );
    return (
      <div className="footer">
        <section className="upper-group">
          <h4>UNIST HeXA Bus Information</h4>
          <p>Developed By 고건일(linoegg), 우민규(mgwoo), 오현준(dhguswns23)</p>
          <h5>Operated by HeXA</h5>
          <p>Copyright (C) 2017 HeXA all rights reserved.</p>
 
        </section>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
     const hero = (
       <div className="hero" style={heroStyle}>
          <div className="inner-wrapper">
            <section className="content">
              <h1>유니스트 버스정보</h1>
              <h5>좀 더 편하게 버스 시간을 알아할 권리 HeXA.Bus</h5>
            </section>
            <section className="credit">
              <p>
                Operated by HeXA
              </p>
            </section>
          </div>
        </div>
    );
    return (
      <div id="content-root" className="main">
        <Nav/>
        <section className="information">
          <InfoLine/>
        </section>
        <Footer/>
      </div>);
  }
}

function mapPropsToState(state) {
  return {
    
  };
}

export default connect(mapPropsToState)(App);
