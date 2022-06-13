import {BASE_URL, getApi, postApi, putApi} from '../../utils/apiHelpers';
import {
  ADD_ALERT,
  GET_ALL_ALERTS,
  GET_ALL_ALERTS_SENDED_SUCCESS,
  GET_ALL_ALERTS_SUCCESS,
} from '../actionTypes';
import Toast from 'react-native-toast-message';
const addAlert = () => {
  return {
    type: ADD_ALERT,
  };
};

export const getAllAlerts = () => {
  return {
    type: GET_ALL_ALERTS,
  };
};
export const getAllAlertsSuccess = data => {
  return {
    type: GET_ALL_ALERTS_SUCCESS,
    payload: data,
  };
};
export const getAllAlertsSendedSuccess = data => {
  return {
    type: GET_ALL_ALERTS_SENDED_SUCCESS,
    payload: data,
  };
};
export const getAlertsBySenderApi = id => async dispatch => {
  try {
    dispatch(getAllAlerts());
    let result = await getApi('alerts/sender/' + id);
    // console.log('Result', result);
    if (result.success) {
      dispatch(getAllAlertsSendedSuccess(result.result));
    }
  } catch (error) {
    console.log('Error', error.message);
  }
};
export const getAlertsByReceiverApi = id => async dispatch => {
  try {
    //console.log('RECEIVER', id);
    dispatch(getAllAlerts());
    let result = await getApi('alerts/receiver/' + id);
    //console.log('Result', result);
    if (result.success) {
      dispatch(getAllAlertsSuccess(result.result));
    }
  } catch (error) {
    console.log('Error', error.message);
  }
};
export const addAlertApi = (data, selected, toast) => async dispatch => {
  try {
    console.log('SELECTED', selected);
    console.log('Add Data', data);
    dispatch(addAlert());

    let response = await fetch(`${BASE_URL}/alerts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    // let result = await postApi('alerts/add', data, config);
    let result = await response.json();
    console.log('ADD RESULT', result);

    if (result && result.success) {
      toast.show('Alert ajouter avec a success', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      dispatch(getAlertsBySenderApi(result.result.sender_mat));
      dispatch(getAlertsByReceiverApi(result.result.sender_mat));
    } else {
      toast.show(result.result, {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  } catch (error) {}
};

export const fixAlert =
  (alertId, selected, body, receiverId, senderId, toast) => async dispatch => {
    try {
      let result = await putApi('alerts/fix/' + alertId, body);
      console.log('FIXED RESULT', result);
      toast.show('Votre réponse à été envoyer', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
      if (result) {
        if (result) {
          if (selected) {
            dispatch(getAlertsBySenderApi(senderId));
          } else {
            dispatch(getAlertsByReceiverApi(receiverId));
          }
        }
      }
    } catch (error) {}
  };
