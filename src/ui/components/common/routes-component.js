import React, {Component,Suspense} from 'react';
import {
    Route,
    Switch
} from "react-router-dom";
import * as ROUTES from "../../../config/constants/route-paths";
import Header from "../../layout/header";
import Home from "../../pages/home";
import About from '../../pages/about';

class RoutesComponent extends Component {
    render() {
        return (
            <section>

                <Switch>
                    <Route component={Header}/>
                </Switch>

                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route path={ROUTES.ABOUT} component={About} />
                </Switch>

            </section>
        );
    }
}

export default RoutesComponent;
