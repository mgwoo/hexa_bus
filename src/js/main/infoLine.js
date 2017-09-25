import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBusInfo, changeFetchLoading, changeNavLoading} from './redux/action';
import {zeroFill} from '../helper';
import {getFetch} from './async_get';

const titleStyle = {
  backgroundImage: 'url(bus.jpg)',
};

class LiveClock extends Component {
  constructor(props) {
    super(props);

    let clock = new Date();
    this.state = {
      year: clock.getFullYear(),
      month: clock.getMonth(),
      date: clock.getDate(),
      time: clock.getTime(),
      hour: clock.getHours(),
      minute: clock.getMinutes(),
      second: clock.getSeconds(),
      day: '',
    };
  }
 
  updateDate() {
    let clock = new Date();
    let day = '오전';
    let hour = clock.getHours();
    if (clock.getHours() > 11){
      hour = hour - 12;
      day = '오후';
    }
    
    this.setState({
      year: clock.getFullYear(),
      month: clock.getMonth(),
      date: clock.getDate(),
      time: clock.getTime(),
      hour: zeroFill(hour, 2),
      minute: zeroFill(clock.getMinutes(), 2),
      second: zeroFill(clock.getSeconds(), 2),
      day: day,
    });
  }

  render() {
    const {year, month, date, time, day,
      hour, minute, second} = this.state;
    return (
      <div className="live-clock">
        <div className="time-group">
          <p>{hour}:{minute}:{second}</p>
        </div>
        <div className="day">
          {day}
        </div>
      </div>
    );
  }
  componentDidMount() {
    setInterval(() => {
      ::this.updateDate();
    },1000);
  }
}

class LoadingIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  animate() {
    const {path} = this;
    const totalLength = path.getTotalLength();
    let backward = false;

    let iterate = (i) => {
      this.setState({
        totalLength: 80,
        offset: totalLength - (totalLength * i/100),
      });
      //path.style.strokeDashOffset = totalLength - (totalLength * i/100);
      if(i == 100 || i == 0) {
        backward = !backward;
      }
      setTimeout(() => {
        if(backward) {
          iterate(i-1);
        }else if(!backward) {
          iterate(i+1);
        }
      }, 7);
    }
    iterate(1);
  }

  render() {
    const refF = (instance) => {this.path = instance};
    const {offset} = this.state;
    
    const animatedStyle = {
      strokeDasharray: '80 80',
      strokeDashoffset: offset,
      strokeMiterlimit: 0,
    };
    return (
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"> 
        <path ref={refF} style={animatedStyle} className="loading-icon" d="M10 10 L10 30 M10 30 C13 45, 37 45, 40 30 M40 30 L40 10" stroke="#6facd5" fill="transparent" stroke-width="2"/>
      </svg>
    );
  }
  componentDidMount() {
    ::this.animate();
  }
}

class InfoLine extends Component {
  constructor(props) {
    super(props);
  }

	renderBusInfo() {
		const {busInfo} = this.props; 
    return busInfo.map((group) => {
      const {title, subTitle} = group;
      const content = group.buses.map((bus) => {
        const {busNum, busCnt, busStop, busTime, befTime, 
          befStopCnt, befStopName, nxtStat, nxtTime, nxtStopName,
          nxtStopCnt} = bus;
        const thisInfo = (
        <div className="this">
                    <div>
                      현재 버스 [{befTime}]
                    </div>
                      {befStopName === null ? 
                      (<p>기점출발예정</p>):
                      (
                      <p>
                        <span>{befStopName}</span>
                         ({befStopCnt} 정거장 전)
                      </p>)
                      }
                  </div>
        );
        const nextInfo = typeof (nxtStat) !== null &&
          typeof(nxtStat) != 'undefined' ? (
        <div className="next">
          <div>
            다음 버스 [{nxtTime}]
          </div>
          {nxtStopName === null ? 
          (<p>기점출발예정</p>):
            (<p>
              <span>{nxtStopName}</span>
              ({nxtStopCnt} 정거장 전)
            </p>)
          }
          </div>) :
          (<div className="next"> 
            <div>
            </div>
            <p>운행정보없음</p>
          </div>)
          ;
        if (busCnt != 0) {
          return (
          <div className="each">
                <div className="num">
                  <div className="bus">
                    <h5>{busNum}</h5>
                    <p>{title}</p>
                  </div>
                  <div className="stop">
                    {busStop}
                  </div>
                </div>
                <div className="bus-info">
                  {thisInfo}
                  {nextInfo}
                </div>
              </div>);
        }
        else {
          return (
          <div className="each">
                <div className="num">
                  <div className="bus">
                    <h5>{busNum}</h5>
                    <p>{title}</p>
                  </div>
                  <div className="stop">
                    {busStop}
                  </div>
                </div>
                <div className="bus-info">
                  <div className="this">
                    <div>
                    </div>
                      <p>
                        <span>운행종료</span>
                      </p>
                  </div>
                </div>
              </div>
          );
        }
      });

      return (
        <div className="groups">
          <section className="title">
            <div className="inner-wrapper">
              <div className="name">
                <h1>{title}</h1>
                <p></p>
              </div>
              <div className="num">
                <h5>{subTitle}</h5>
                <p>사연 환승</p>
              </div>
            </div>
          </section>
          <section className="content">
            {content}
          </section>
        </div>
      );
    });
	}

  fetchBusInfo() {
    const {dispatch} = this.props;
    const url = 'http://hexa.hexa.pro/~lmte/bus.hexa/bus/get_ajax_inf_ohj.php?mode=unist';
    dispatch(changeFetchLoading(true));
    dispatch(changeNavLoading(true));
    const callback = (response) => {
      dispatch(fetchBusInfo(response.data));
      dispatch(changeFetchLoading(false));
      dispatch(changeNavLoading(false));
    };
    getFetch(url, callback);

  }

  render() {
    const {loadingFetch} = this.props;

    return (
      <div className="container">
        <section className="filter-group">
          <div className="box">
            <LiveClock/>
          </div>
        </section>
        <div className={"loading" + (loadingFetch ? ' active' : '')}>
          <div className="inner-wrapper">
            <div className="content">
              <LoadingIcon/>
              <p> 로딩중 </p>
            </div>
          </div>
        </div>
        <section className={"direction-group" + (loadingFetch ? '' : ' active')}>
          {::this.renderBusInfo()}
        </section>
        
      </div>
    );
  }
  componentDidMount() {
    ::this.fetchBusInfo();
  }
}

function mapPropsToState(state){
  return {
    loadingFetch: state.basicStore.loadingFetch,
    mainTitle: state.busStore.mainTitle,
    busInfo: state.busStore.info,
  }
}

export default connect(mapPropsToState)(InfoLine);
