import async from "async";
import * as Api from '../api';
import * as Actions from '../../actions/about';

export const getAboutDataInit = (dispatch) => {
    return new Promise((resolve,failure)=>{
        async.series([
            (cb) => {
                Api.getAboutData()
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
            dispatch(Actions.aboutData(result[0]));
            resolve(result);
        });
    });


};