import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PageService from '../../services/page-services';
import * as ROUTES from "../../config/constants/route-paths";

class Home extends Component {
    pageService = null;

    componentDidMount() {
        this.pageService = new PageService(ROUTES.HOME);
        this.pageService.getData(this.props.dispatch);
    }

    render() {
        return (
            <Fragment>

                {this.props.homeData && this.props.homeData.title &&
                <div>
                    <h1>
                        {this.props.homeData.title}
                    </h1>
                    <p>
                        {this.props.homeData.opening_crawl}
                    </p>
                </div>
                }

            </Fragment>
        );
    }
}
const mapStateToProps = (state) =>({
    homeData:(state.homeReducer && state.homeReducer.success) ? state.homeReducer.success : {}
});
export default connect(mapStateToProps)(Home);
