import {
    GET_HOME_DATA,
} from '../config/constants/action-types'

const initialState = {success:null};

const homeReducer = (state = initialState,action) => {
    switch (action.type){
        case GET_HOME_DATA:
            return {
                ...state,
                success:{...action.payload}
            };
        default:
            return state;
    }
};

export default homeReducer;