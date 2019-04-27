import React from 'react';
import {Link} from 'react-router-dom'
import * as ROUTES from "../../config/constants/route-paths";

class Header extends React.Component {
    render() {
        return (
            <header>
                <ul>
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.ABOUT}>About</Link>
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header;