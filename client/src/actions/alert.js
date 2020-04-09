import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';


// Can dispatch via Thunk middleware
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
};