import React, {Component, Fragment} from 'react';
import PageService from "../../services/page-services";
import * as ROUTES from "../../config/constants/route-paths";
import {connect} from "react-redux";

class About extends Component {
    pageService = null;

    componentDidMount() {
        this.pageService = new PageService(ROUTES.ABOUT);
        this.pageService.getData(this.props.dispatch);
    }

    render() {
        return (
            <div>
                {this.props.aboutData &&
                <Fragment>
                    <h2>
                        About
                    </h2>
                    {Object.keys(this.props.aboutData).map((data, inx) =>
                        <p key={inx}>
                            <span>{data.replace('_', ' ').toUpperCase()}</span>
                            <span>{this.props.aboutData[data]}</span>

                        </p>
                    )}
                </Fragment>
                }
            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    aboutData: (state.aboutReducer && state.aboutReducer.success) ? state.aboutReducer.success : {}
});
export default connect(mapStateToProps)(About);