import React, { useContext } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useLazyQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { Context } from "../../shared/Context";

const LOGOUT = gql`
    query {
        logout
    }
`;

const Header = (props: any) => {
    const context = useContext(Context);
    const [logout] = useLazyQuery(LOGOUT, { onCompleted: () => {
        context.setIsLoggedIn(false);
        context.dismissLoading();
    } });

    const handleLogout = () => {
        context.presentLoading();
        logout();
    };

    return (
        <header className="Header">
            <nav>
                <ul>
                    <li onClick={handleLogout}>
                        <NavLink to="/login" activeClassName="active" className="NavLink">
                            Cerrar Sesión
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
