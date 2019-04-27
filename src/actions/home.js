import * as actionTypes from "../config/constants/action-types"

export const homeData = (data) => ({
    type: actionTypes.GET_HOME_DATA,
    payload: data
});