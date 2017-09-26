export const FETCH_BUS_INFO = 'FETCH_BUS_INFO';
export const CHANGE_NAV_LOADING = 'CHANGE_NAV_LOADING';
export const CHANGE_FETCH_LOADING = 'CHANGE_FETCH_LOADING';
export const CHANGE_NOTICE_STATE = 'CHANGE_NOTICE_STATE';
export const FETCH_NOTICE = 'FETCH_NOTICE';
export const START_SWIPE = 'START_SWIPE';
export const CHANGE_SWIPE_WIDTH = 'CHANGE_SWIPE_WIDTH';
export const CHANGE_SIDE_BAR_STATE = 'CHANGE_SIDE_BAR_STATE';

export function fetchBusInfo(info) {
  return {
    type: FETCH_BUS_INFO,
    info,
  }
}

export function changeFetchLoading(state) {
  return {
    type: CHANGE_FETCH_LOADING,
    state,
  }
}

export function changeNavLoading(state) {
  return {
    type: CHANGE_NAV_LOADING,
    state,
  }
}

export function changeNoticeState(state) {
  return {
    type: CHANGE_NOTICE_STATE,
    state,
  }
}

export function fetchNotice(notices){
  return {
    type: FETCH_NOTICE,
    notices
  }
}

export function startSwipe(state) {
  return {
    type: START_SWIPE,
    state,
  }
}

export function changeSwipeWidth(width) {
  return {
    type: CHANGE_SWIPE_WIDTH,
    width,
  }
}

export function changeSideBarState(state) {
  return {
    type: CHANGE_SIDE_BAR_STATE,
    state,
  }
}
