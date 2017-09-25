export const FETCH_BUS_INFO = 'FETCH_BUS_INFO';
export const CHANGE_NAV_LOADING = 'CHANGE_NAV_LOADING';
export const CHANGE_FETCH_LOADING = 'CHANGE_FETCH_LOADING';
export const CHANGE_NOTICE_STATE = 'CHANGE_NOTICE_STATE';
export const FETCH_NOTICE = 'FETCH_NOTICE';

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
