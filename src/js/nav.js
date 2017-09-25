import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBusInfo, changeNavLoading, 
  changeFetchLoading, changeNoticeState, fetchNotice} from './main/redux/action';
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

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrollTop: true,
      isBurgerActive: false,
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

    if(loadingFetch) {
      alert('이미 로딩중입니다.');
      return false;
    }
    this.setState({
      isBurgerActive: false,
    });
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
    const {isBurgerActive} = this.state;
    this.setState({isBurgerActive: !isBurgerActive});
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
  render() {
    const {isScrollTop, isBurgerActive} = this.state;
    const {isLoading, noticeModalState} = this.props;
    
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
            <Hamburger isActive={isBurgerActive} 
              onClick={::this.onHamburgerClick}/>
          </div>
        </section>
        <section className="center-align">
          <div className="item">
            HeXA.Bus
          </div>
        </section>
        <div className={"side-menu"+(isBurgerActive ? ' active' : '')}>
          <div className="button" onClick={::this.toggleNoticeModal}>
            Notice
          </div>
          {::this.renderMenu()}
        </div>
        <div className={"loading" + (isLoading ? ' active' : '')}>
          <div className="indicator">
          </div>
        </div>
        <div className="goto-top" onClick={::this.gotoTop}>
        </div>
      </div>);
  }
  
  componentDidMount() {
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
  }
}

export default connect(mapPropsToState)(Navigation);
