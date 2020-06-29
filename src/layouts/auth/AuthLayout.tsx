import React from "react";
import "./AuthLayout.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";

const AuthLayout = (props: any) => {
    return (
        <div className="AuthLayout">
            <Switch>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Redirect to="/login" />
            </Switch>
        </div>
    );
};

export default AuthLayout;
