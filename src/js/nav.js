import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBusInfo, changeNavLoading, changeSideBarState,
  changeFetchLoading, changeNoticeState, fetchNotice,} from './main/redux/action';
import {stopMenu} from './main/config';
import {getFetch} from './main/async_get';
import Modal from './main/modal';

class Hamburger extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    const {isActive, onClick} = this.props;
    return (
      <div className={"hamburger" + (isActive ? ' active': '')}
        onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

export class HeXASVG extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" 
        className="logo-svg" width="150" height="50">
        <text textAnchor="middle" x="80" y="42"> HeXA Bus</text>
        <text textAnchor="middle" className="animate" x="80" y="42">HeXA Bus</text>
      </svg>
    );
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrollTop: true,
    };
  }

  gotoTop() {
    window.scrollTo(0, 0);
  }
  toggleNoticeModal() {
    const {dispatch, noticeModalState} = this.props;
    dispatch(changeNoticeState(!noticeModalState));
  }

  renderNotice() {
    const {notices} = this.props;
    return notices.map((notice) => {
      const {date, content} = notice; 
      return (
        <div className="notice">
          <h5 className="date">
            {date}
          </h5>
          <p className="n-content">
            {content}
          </p>
        </div>
      );
    });
  }
  fetchBusInfo(mode) {
    const {loadingFetch} = this.props;
    const {dispatch} = this.props;
    const url = 'http://hexa.hexa.pro/~lmte/bus.hexa/bus/get_ajax_inf_ohj.php?mode='+mode;
    /* Deprecated
    if(loadingFetch) {
      alert('이미 로딩중입니다.');
      return false;
    } */
    dispatch(changeSideBarState(false));
    dispatch(changeFetchLoading(true));
    dispatch(changeNavLoading(true));
    const callback = (response) => {
      dispatch(fetchBusInfo(response.data));
      dispatch(changeFetchLoading(false));
      dispatch(changeNavLoading(false));
    };
    getFetch(url, callback);

  }
  handleScroll(event) {
    const scrollTop = window.pageYOffset;
    if(scrollTop != 0) {
      this.setState({isScrollTop: false});
    }else{
      this.setState({isScrollTop: true});
    }
  }

  onHamburgerClick() {
    const {dispatch, isSidebarOpen} = this.props;
    
    dispatch(changeSideBarState(!isSidebarOpen));
  }

  renderMenu() {
    return stopMenu.map((each) => {
      const {type, name, param} = each;
      switch(type) {
        case 0:
          return (
            <div className="button" onClick={this.fetchBusInfo.bind(this, param)}>
              {name}
            </div>
          );
        case 1:
          return (
            <div className="group">
              {name}
            </div>
          );
      }
    });
  }

  onModalOutsideClick() {
    ::this.toggleNoticeModal();
  }

  shareKaKaoTalk() {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'HeXA Bus',
        description: '편하게 보는 유니스트 버스정보.',
        imageUrl: 'http://i4.mirror.co.uk/incoming/article10829534.ece/ALTERNATES/s615b/SWNS_SPIDER_STOP_1.jpg',
        link: {
          webUrl: 'http://bus.hexa.pro',
          mobileWebUrl: 'http://bus.hexa.pro',
        },
      },
    });
  }

  render() {
    const {isScrollTop} = this.state;
    const {swipeWidth, isSwipeStart, 
      isLoading, noticeModalState, isSidebarOpen} = this.props;
    
    const sideBarOffsetX = isSwipeStart ? swipeWidth : 0;
    const sideBarLeft = -300 + sideBarOffsetX;
    let sideBarStyle = {};
    if(isSwipeStart) {
      sideBarStyle['left'] = sideBarLeft + 'px';
    }
    return (
      <div className={"navigation"+(isScrollTop ? '' : ' active') }>
        <Modal show={noticeModalState} outsideClick={::this.onModalOutsideClick}>
          <div className="header">
            <h5>
              공지사항
            </h5>
            <div className="close" onClick={::this.onModalOutsideClick}>
              <span/>
              <span/>
            </div>
          </div>

          <div className="notices">
            {::this.renderNotice()}
          </div>
        </Modal>
        <section className="left-align">
          <div className="item">
            <Hamburger isActive={isSidebarOpen} 
              onClick={::this.onHamburgerClick}/>
          </div>
        </section>
        <section className="center-align">
          <div className="item">
            <HeXASVG/>
          </div>
        </section>
        <div style={sideBarStyle} 
          className={"side-menu"+(isSidebarOpen ? ' active' : '') + (isSwipeStart? ' swipe' : '')}>
          <div className="button" onClick={::this.toggleNoticeModal}>
            Notice
          </div>
          {::this.renderMenu()}
        </div>
        <div className={"loading" + (isLoading ? ' active' : '')}>
          <div className="indicator">
          </div>
        </div>
        <div className="kakao-share" onClick={::this.shareKaKaoTalk}>
          <img src="kakao.png"/>
        </div>
        <div className="goto-top" onClick={::this.gotoTop}>
        </div>
      </div>);
  }
  
  componentDidMount() {
    Kakao.init('3b2fbd685845f6a067bebc7095aa69f5');

    window.addEventListener('scroll', ::this.handleScroll);
    const {isNoticeFetched, dispatch} = this.props;
    if(!isNoticeFetched) {
      const url = 'http://hexa.hexa.pro/~lmte/bus.hexa/bus/get_ajax_inf_ohj.php?mode=notice';
      const callback = (response) => {
        dispatch(fetchNotice(response.data));
        console.log(response.data);
      }
      getFetch(url, callback);
    }
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', ::this.handleScroll);
  }
}

function mapPropsToState(state) {
  return {
    isLoading: state.basicStore.navLoading,
    loadingFetch: state.basicStore.loadingFetch,
    noticeModalState: state.basicStore.noticeModalState,
    isNoticeFetched: state.basicStore.isNoticeFetched,
    notices: state.basicStore.notices,
    isSwipeStart: state.basicStore.isSwipeStart,
    swipeWidth: state.basicStore.swipeWidth,
    isSidebarOpen: state.basicStore.isSidebarOpen
  }
}

export default connect(mapPropsToState)(Navigation);
