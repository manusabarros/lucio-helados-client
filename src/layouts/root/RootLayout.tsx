import React from "react";
import "./RootLayout.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../components/header/Header";
import HomePage from "../../pages/home/HomePage";
import UsersPage from "../../pages/users/UsersPage";

const RootLayout = () => {
    return (
        <div className="RootLayout">
            <Header />
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/users" exact>
                    <UsersPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        </div>
    );
};

export default RootLayout;
