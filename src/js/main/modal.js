import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Motion, spring} from 'react-motion';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  getRenderStyle() {
    const {show} = this.props;
    if(show) {
      return {
        opacity: spring(1),
        content_y: spring(0),
      }
    }else {
      return {
        opacity: spring(0),
        content_y: spring(100),
      }
    }
  }

  getDefaultStyle() {
    return {
      opacity: 0,
      content_y: 100,
    }
  }

  getRestStyle() {
    const {show} = this.props;
  }
  onOtherClick(e) {
    const {outsideClick} = this.props;
    if(e.target.className == 'modal'){
      outsideClick();
    }
  }

  render() {
    const {show} = this.props;
    return (
      <Motion defaultStyle={::this.getDefaultStyle()} 
        style={::this.getRenderStyle()}
        onRest={::this.getRestStyle}>
        {(style) => {
          return (
        <div className="modal"
          onClick={::this.onOtherClick}
          style={{opacity: style.opacity, 
            top:style.content_y+'%'}}>
          <div className="inner-wrapper">
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>)}}
      </Motion>
      );
  }
}

export default connect()(Modal);
