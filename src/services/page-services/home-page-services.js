import async from "async";
import * as Api from '../api';
import * as Actions from '../../actions/home';

export const getHomeDataInit = (dispatch) => {
    return new Promise((resolve,failure)=>{
        async.series([
            (cb) => {
                Api.getHomeData()
                    .then((res) => {
                        if (res.data) {
                            cb(null,res.data);
                        }
                    })
                    .catch((err) => {
                        //handle errors in here
                    })
            }
        ],(err,result)=>{
            dispatch(Actions.homeData(result[0]));
            resolve(result);
        });
    });


};