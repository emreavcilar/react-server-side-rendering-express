import * as ROUTES from '../config/constants/route-paths';
import {
    getHomeDataInit
} from './page-services/home-page-services';
import {
    getAboutDataInit
} from './page-services/about-page-services'


export default class PageService {
    currentPage = ROUTES.HOME;

    constructor(url){
        this.currentPage = url;
    }

    getData = (dispatch) =>{
        return new Promise((resolve,reject)=>{
            switch (this.currentPage) {
                case ROUTES.HOME:
                    getHomeDataInit(dispatch)
                        .then((res)=>{
                            resolve(res);
                        });
                    break;
                case ROUTES.ABOUT:
                    getAboutDataInit(dispatch)
                        .then((res)=>{
                            resolve(res);
                        });
                    break;
                default:
                    return null;

            }
        });
    }
}