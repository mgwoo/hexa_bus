import React, {Component} from 'react';
import {connect} from 'react-redux';

import Nav from '../nav';
import InfoLine from './infoLine';
import {changeSwipeWidth, startSwipe, changeSideBarState} from './redux/action';
import {SWIPE_THRESHOLD} from './config';

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

  onTouchStart(type, e) {
    const {dispatch, isSidebarOpen} = this.props;
    const xCoordinate = type != 'touch' ? e.clientX : e.touches[0].pageX;

    if(xCoordinate < 20 && !isSidebarOpen) {
      dispatch(startSwipe(true));

      dispatch(changeSwipeWidth(xCoordinate));
    }
    if(xCoordinate > 250 
      && xCoordinate < 300
      && isSidebarOpen) {
        dispatch(startSwipe(true));
        dispatch(changeSwipeWidth(xCoordinate));
    }
  }
  
  onTouchMove(type, e) {
    const xCoordinate = type != 'touch' ? e.clientX : e.touches[0].pageX;
    const {isSwipeStart, dispatch} = this.props;
    if(isSwipeStart) {
      if(xCoordinate > 300) {
        dispatch(changeSwipeWidth(300));
      }else{
        dispatch(changeSwipeWidth(xCoordinate));
      }
    }
  }

  onTouchEnd(type, e) {
    const xCoordinate = type != 'touch' ? e.clientX : e.changedTouches[0].pageX;
    const {isSwipeStart, dispatch} = this.props;
    if(isSwipeStart) {
      if(xCoordinate > 300 * (100 - SWIPE_THRESHOLD)/100) {
        dispatch(changeSideBarState(true));
        dispatch(changeSwipeWidth(300));
      }else{
        dispatch(changeSideBarState(false));
        dispatch(changeSwipeWidth(0));
      }
      dispatch(startSwipe(false));
    }
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
      <div id="content-root" className="main"
        onMouseDown={::this.onTouchStart.bind(this, 'mouse')}
        onMouseMove={::this.onTouchMove.bind(this, 'mouse')}
        onMouseUp={::this.onTouchEnd.bind(this, 'mouse')}
        onTouchStart={::this.onTouchStart.bind(this, 'touch')}
        onTouchMove={::this.onTouchMove.bind(this, 'touch')}
        onTouchEnd={::this.onTouchEnd.bind(this, 'touch')}>
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
    isSwipeStart: state.basicStore.isSwipeStart,
    isSidebarOpen: state.basicStore.isSidebarOpen,
  };
}

export default connect(mapPropsToState)(App);
