import {
  ADD_ALERT,
  GET_ALL_ALERTS,
  GET_ALL_ALERTS_SENDED_SUCCESS,
  GET_ALL_ALERTS_SUCCESS,
} from '../actionTypes';

const alertInitState = {
  loading: false,
  receivedList: [],
  sendedList: [],
};
const alertReducer = (state = alertInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case ADD_ALERT:
      return {...state, loading: true};
    case GET_ALL_ALERTS:
      return {...state, loading: true};
    case GET_ALL_ALERTS_SUCCESS:
      return {...state, loading: false, receivedList: payload};
    case GET_ALL_ALERTS_SENDED_SUCCESS:
      return {...state, loading: false, sendedList: payload};

    default:
      return state;
  }
};

export default alertReducer;
