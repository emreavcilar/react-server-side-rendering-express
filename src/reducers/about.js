import {
    GET_ABOUT_DATA,
} from '../config/constants/action-types'

const initialState = {success:null};

const aboutReducer = (state = initialState,action) => {
    switch (action.type){
        case GET_ABOUT_DATA:
            return {
                ...state,
                success:{...action.payload}
            };
        default:
            return state;
    }
};

export default aboutReducer;