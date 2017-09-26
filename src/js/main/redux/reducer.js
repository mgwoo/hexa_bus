import 'babel-polyfill';
import {combineReducers} from 'redux';
import {FETCH_BUS_INFO, CHANGE_FETCH_LOADING, 
  CHANGE_NAV_LOADING, CHANGE_NOTICE_STATE, FETCH_NOTICE,
  START_SWIPE, CHANGE_SWIPE_WIDTH, CHANGE_SIDE_BAR_STATE} from './action';

const initialState = {
  navLoading: true,
  loadingFetch: true, 
  noticeModalState: false,
  isNoticeFetched: false,
  notices: [],
  isSwipeStart: false,
  swipeWidth: 0,
  isSidebarOpen: false,
};

function basicStore(state = initialState, action) {
  let newVal = {};
  switch(action.type){
    case CHANGE_FETCH_LOADING:
      newVal['loadingFetch'] = action.state;
      return Object.assign({}, state, newVal);
    case CHANGE_NAV_LOADING:
      newVal['navLoading'] = action.state;
      return Object.assign({}, state, newVal);
    case CHANGE_NOTICE_STATE:
      newVal['noticeModalState'] = action.state;
      return Object.assign({}, state, newVal);
    case FETCH_NOTICE:
      newVal['notices'] = action.notices;
      newVal['isNoticeFetched'] = true;
      return Object.assign({}, state, newVal);
    case START_SWIPE:
      newVal['isSwipeStart'] = action.state;
      return Object.assign({}, state, newVal);
    case CHANGE_SWIPE_WIDTH:
      newVal['swipeWidth'] = action.width;
      return Object.assign({}, state, newVal);
    case CHANGE_SIDE_BAR_STATE:
      newVal['isSidebarOpen'] = action.state;
      return Object.assign({}, state, newVal);
    default:
      return state;
  }
}

const busState = {
  mainTitle: '',
  info: [
  {
    title: '',
    subTitle: '',
    buses: [],
  }],
};

function busStore(state = busState, action) {
  let newVal = {};
  switch(action.type) {
    case FETCH_BUS_INFO:
      newVal['mainTitle'] = action.info.mainTitle;
      newVal['info'] = action.info.group;
      return Object.assign({}, state, newVal);
    default:
      return state;
  }
}

const store = combineReducers({
  basicStore, busStore
});

console.log(store);
export default store;

