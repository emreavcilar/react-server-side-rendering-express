import * as actionTypes from "../config/constants/action-types";

export const aboutData = (data) => ({
    type: actionTypes.GET_ABOUT_DATA,
    payload: data
});